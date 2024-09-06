import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const env = process.env.NODE_ENV;

const development = {
  port: process.env.PORT_DEV,
  dbUser: process.env.DB_USER_DEV,
  dbPassword: process.env.DB_PASSWORD_DEV,
  dbSid: process.env.DB_SID_DEV,
  dbHost: process.env.DB_HOST_DEV,
  dbPort: process.env.DB_PORT_DEV,
  oracleClient: process.env.ORACLE_CLIENT_DEV,
};

const production = {
  port: process.env.PORT_PROD,
  dbUser: process.env.DB_USER_PROD,
  dbPassword: process.env.DB_PASSWORD_PROD,
  dbSid: process.env.DB_SID_PROD,
  dbHost: process.env.DB_HOST_PROD,
  dbPort: process.env.DB_PORT_PROD,
  oracleClient: process.env.ORACLE_CLIENT_PROD,
};

export const config = {
  development,
  production,
};

export default config[env];
