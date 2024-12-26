import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import * as dotenv from 'dotenv';


dotenv.config();

const dbConfig: any = {
  synchronize: false,
  migrations: ['src/migrations/*.ts'],  
  cli: {
    migrationsDir: 'src/migrations',   
  },
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
      entities: ['**/*.entity.js'],  
      migrationsRun: true
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],  
    });
    break;
  default:
    throw new Error(
      'Unknown environment. Please set NODE_ENV to "development", "test", or "production".',
    );
}


export const AppDataSource = new DataSource({
  ...dbConfig,
  entities: [User, Report],  
  migrations: ['src/migrations/*.ts'],  
  synchronize: dbConfig.synchronize,  
});
