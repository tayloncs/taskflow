import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  autoLoadEntities: true,
} as TypeOrmModuleOptions;
