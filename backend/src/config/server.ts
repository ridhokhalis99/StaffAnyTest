import * as dotenv from "dotenv";
dotenv.config();

const DEFAULT_PORT = 3000;
const DEFAULT_BASE_API_PATH = "/api";

const DEFAULT_JWT_SECRET = "12345asd";

export const serverConfig = Object.freeze({
  SERVER_NAME: "Hapi",
  NODE_ENV: process.env.NODE_ENV || "development",
  BASE_REST_API_PATH: process.env.BASE_API_PATH
    ? process.env.BASE_API_PATH
    : DEFAULT_BASE_API_PATH,
  PORT: process.env.PORT ? process.env.PORT : DEFAULT_PORT,
  WHITE_LISTED_ORIGINS: ["http://localhost:3000"],
  SALT_ROUNDS: 10,
  AUTH_TOKEN: {
    SECRET: process.env.JWT_SECRET || DEFAULT_JWT_SECRET,
    EXPIRE_HRS: 120,
  },
});
