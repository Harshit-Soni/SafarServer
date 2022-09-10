import { config } from "dotenv";

const env = config().parsed;

const Config = {
  port: env.API_PORT,
  jwtSecret: env.JWT_SECRET || "",
};

export default Config;
