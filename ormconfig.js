//if ormconfig.json
// {
//  "type": "sqlite",
//   "database": "db.sqlite",
//   "entities": ["dist/**/*.entity.js"],
//   "synchronize": false
// }
// const dbConfig = {};
var dbConfig = {
  synchronize: false,
};
switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['src/**/*.entity.ts'],
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'prod.sqlite',
      entities: ['dist/**/*.entity.js'],
    });
    break;
  default:
    throw new Error(
      'Unknown environment. Please set NODE_ENV to "development", "test", or "production".',
    );
}

module.exports = dbConfig;
