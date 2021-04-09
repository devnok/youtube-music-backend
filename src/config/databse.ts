import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const IS_OFFLINE = process.env.IS_OFFLINE;

const localDBConfig: DatabaseConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const remoteDBConfig: DatabaseConfig = {
  type: process.env.DB_DIALECT as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export default registerAs('database', () =>
  IS_OFFLINE !== 'false' ? localDBConfig : remoteDBConfig,
);
