require('dotenv').config()

// const connection = { 
// connectionString: process.env.DATABASE_URL,
// ssl: {
//   rejectUnauthorized: false,
// },
// }

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL 
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL,
      user: "pg",
      password: "bacon",
      database: 'zprefix'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};