import { app, server } from "@/server";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { redisClient } from "@/service/redis";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.DBSTRING = mongoUri;

  await mongoose.connect(mongoUri);

  process.env.PRICING_SERVICE_API = "https://mock-pricing-api.com";
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
  await server.close();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Express App with Mongoose and Redis", () => {
  it("should return 200 on /health-check", async () => {
    const response = await request(app).get("/health-check");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Server is running");
  });

  it("should return 400 if symbol is missing in /price request", async () => {
    const response = await request(app).get("/price");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Symbol is required");
  });

  it("should return cached data from Redis if available", async () => {
    const mockCachedPrice = JSON.stringify({
      TONUSDT: 0.5,
      USDTTON: 2,
    });
    jest.spyOn(redisClient, "get").mockResolvedValueOnce(mockCachedPrice);

    const response = await request(app).get("/price?symbol=TON/USDT");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      TONUSDT: 0.5,
      USDTTON: 2,
    });
  });

  it("should handle /history route", async () => {
    const response = await request(app).get("/history");
    expect(response.status).not.toBe(404);
  });
});
