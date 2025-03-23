import * as dotenv from "dotenv";
dotenv.config();

export const settings = {
  dbString: process.env.DBSTRING,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  pricingServiceApi: process.env.PRICING_SERVICE_API,
  analyticsServiceApi: process.env.ANALYTICS_SERVICE_API,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  redisTtl: process.env.REDIS_TTL,
};
