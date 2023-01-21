import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '7hjRGRCtY5aV3ZrAyxFl',
  database: 'railway',
  host: process.env.DB_HOST || 'containers-us-west-140.railway.app',
  port: Number(process.env.DB_PORT) || 6488,
  dialect: 'postgres'
}

module.exports = config;
