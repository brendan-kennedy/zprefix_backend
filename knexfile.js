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
      host: 'ec2-44-198-194-64.compute-1.amazonaws.com',
      user: "yxylthxmnrhxml",
      password: "37049d8b8e042806efffafa0dab4a740d040bac11a0ce089108e77714a2537c4",
      database: 'd52r5r7dj20vro',
      ssl: { rejectUnauthorized: false }
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