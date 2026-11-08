require('dotenv').config();

if (!/^postgres(ql)?:\/\//i.test(process.env.DATABASE_URL || '')) {
  throw new Error('Set DATABASE_URL to the Neon PostgreSQL connection string before running db:migrate.');
}

const { ready, pool } = require('../server-postgres');

(async () => {
  try {
    await ready;
    console.log('PostgreSQL migrations and page seed completed.');
  } finally {
    await pool.end();
  }
})().catch((error) => {
  console.error(`PostgreSQL migration failed: ${error.message}`);
  process.exitCode = 1;
});
