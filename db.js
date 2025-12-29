const { Pool } =require('pg');

const pool = new Pool({
 host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
   ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false } //“This disables certificate validation but still encrypts the connection. It’s acceptable short-term or when the CA isn’t available.
    : false

    //ssl: { if i was to use a CA from AWS RDS
//   ca: fs.readFileSync('./rds-ca.pem').toString(),
//   rejectUnauthorized: true
// }
});


pool.on('connect', () => {
  console.log(`Postgres client connected in ${process.env.NODE_ENV} mode`);
});

pool.on('error', (err) => {
  console.error('Unexpected PG pool error', err);
  process.exit(1);
});

module.exports = pool;