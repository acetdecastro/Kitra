import { DataSource } from "typeorm/data-source/DataSource.js";
import { envConfig } from "../config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_NAME,
  synchronize: true,
  migrationsTableName: "migrations",
  logging: false,
  entities: [],
  subscribers: [],
  migrations: [],
});
