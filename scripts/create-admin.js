require('dotenv').config();
const readline = require('node:readline/promises');
const crypto = require('node:crypto');
const bcrypt = require('bcryptjs');
const usingPostgres = /^postgres(ql)?:\/\//i.test(process.env.DATABASE_URL || '');
const localServer = usingPostgres ? null : require('../server');
const postgresServer = usingPostgres ? require('../server-postgres') : null;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (question) => rl.question(question);
function askHidden(question) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    const wasRaw = stdin.isRaw;
    let value = '';
    process.stdout.write(question);
    if (typeof stdin.setRawMode === 'function') stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    const onData = (chunk) => {
      for (const character of chunk) {
        if (character === '\u0003') {
          cleanup();
          reject(new Error('Password input cancelled.'));
          return;
        }
        if (character === '\r' || character === '\n') {
          cleanup();
          process.stdout.write('\n');
          resolve(value);
          return;
        }
        if (character === '\u007f' || character === '\b') {
          if (value) value = value.slice(0, -1);
          continue;
        }
        value += character;
      }
    };
    function cleanup() {
      stdin.removeListener('data', onData);
      if (typeof stdin.setRawMode === 'function') stdin.setRawMode(wasRaw);
      stdin.pause();
    }
    stdin.on('data', onData);
  });
}

(async () => {
  try {
    const email = (await ask('Administrator email: ')).trim().toLowerCase();
    rl.close();
    const password = await askHidden('Administrator password (12+ characters): ');
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.');
    if (password.length < 12) throw new Error('Password must be at least 12 characters.');
    const hash = await bcrypt.hash(password, 12);
    if (usingPostgres) {
      await postgresServer.ready;
      const existing = (await postgresServer.pool.query('SELECT id FROM admin_users WHERE email = $1', [email])).rows[0];
      if (existing) {
        await postgresServer.pool.query('UPDATE admin_users SET password_hash = $1, active = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [hash, existing.id]);
        console.log(`Updated administrator ${email} in PostgreSQL.`);
      } else {
        await postgresServer.pool.query('INSERT INTO admin_users (id, email, password_hash, role) VALUES ($1, $2, $3, $4)', [crypto.randomUUID(), email, hash, 'owner']);
        console.log(`Created owner administrator ${email} in PostgreSQL.`);
      }
      await postgresServer.pool.end();
    } else {
      const db = localServer.createDatabase();
      const existing = db.prepare('SELECT id FROM admin_users WHERE email = ?').get(email);
      if (existing) {
        db.prepare('UPDATE admin_users SET password_hash = ?, active = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(hash, existing.id);
        console.log(`Updated administrator ${email}.`);
      } else {
        db.prepare('INSERT INTO admin_users (id, email, password_hash, role) VALUES (?, ?, ?, ?)').run(crypto.randomUUID(), email, hash, 'owner');
        console.log(`Created owner administrator ${email}.`);
      }
      db.close();
    }
  } catch (error) {
    console.error(`Could not create administrator: ${error.message}`);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
})();
