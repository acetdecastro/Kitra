import { envConfig } from "../config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

// Define the base directory for entities
const entitiesBaseDir = __dirname + "/../";

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_NAME,
  synchronize: true,
  migrationsTableName: "migrations",
  logging: false,
  entities: [entitiesBaseDir + "**/*.entity.ts"],
  subscribers: [],
  migrations: [],
  seeds: ["src/database/seeds/**/*{.ts,.js}"],
  seedTracking: false,
};

export const AppDataSource = new DataSource(options);
