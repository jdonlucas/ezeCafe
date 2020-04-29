require('dotenv').config()
module.exports = {
  development: {
    use_env_variable:  "DEVELOPMENT_DATABASE_URL",
    dialect: 'mysql',
    define: {
      charset: 'latin1',
      collate: 'latin1_swedish_ci'
    }
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    dialectOptions: {
      useUTC: false,
      charset: 'latin1',
      collate: 'latin1_swedish_ci'
    },
    timezone: '-06:00',
    use_env_variable: 'DATABASE_URL'
  }
};
