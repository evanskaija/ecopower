// Vercel Preview/Production and any PostgreSQL URL use the serverless-safe
// PostgreSQL adapter. Local development remains on the SQLite application.
const usePostgres = ['preview', 'production'].includes(process.env.VERCEL_ENV)
  || String(process.env.DATABASE_URL || '').startsWith('postgres')
  || process.env.NODE_ENV === 'production';
module.exports = usePostgres
  ? require('../server-postgres').app
  : require('../server').app;
