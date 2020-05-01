require('dotenv').config()
module.exports = {
  development: {
    use_env_variable:  "DEVELOPMENT_DATABASE_URL",
    dialect: 'mysql',
    define: {
	charset: 'utf8',
	dialectOptions: {
		collate: 'utf8_general_ci'
	}
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
      charset: 'utf8',
      collate: 'utf8_general_ci'
    },
    timezone: '-06:00',
    use_env_variable: 'DATABASE_URL'
  }
};
