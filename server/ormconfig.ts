require('dotenv').config();

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['build/src/entity/**/*.js'],
  migrations: ['build/src/migration/**/*.js'],
  subscribers: ['build/src/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'build/src/entity',
    migrationsDir: 'build/src/migration',
    subscribersDir: 'build/src/subscriber',
  },
};
