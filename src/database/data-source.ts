import { envConfig } from '../config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from '../users/entities/user.entity';
import { Treasure } from '../treasures/entities/treasure.entity';
import { MoneyValue } from '../treasures/entities/money-value.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_NAME,
  synchronize: true,
  migrationsTableName: 'migrations',
  logging: false,
  entities: [__dirname + '/../**/*.entity.ts'],
  subscribers: [],
  migrations: [],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  seedTracking: false,
};

const AppDataSource = new DataSource(options);
const UserRepository = AppDataSource.getRepository(User);
const TreasureRepository = AppDataSource.getRepository(Treasure);
const MoneyValueRepository = AppDataSource.getRepository(MoneyValue);

export {
  AppDataSource,
  UserRepository,
  TreasureRepository,
  MoneyValueRepository,
};
