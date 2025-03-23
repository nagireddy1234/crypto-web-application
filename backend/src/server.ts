import express, { Request, Response } from "express";
import mongoose from "mongoose";

import cors from "cors";
import { redisClient } from "@/service/redis";
import { priceRouter } from "@/router/priceRouter";
import { historyRouter } from "@/router/historyRouter";
import { analyticsRouter } from "./router/analyticsRouter";
import { settings } from "./settings";

export const app = express();
const PORT = settings.port ?? 5001;

app.use(cors());
app.use(express.json());

app.get("/health-check", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Server is running" });
});

app.use("/price", priceRouter);
app.use("/history", historyRouter);
app.use("/analytics", analyticsRouter);

export const server = app.listen(PORT, () => {
  console.log(
    `⚡️⚡️⚡️[server]: Server is running at https://localhost:${PORT} ⚡️⚡️⚡️`
  );
  if (redisClient.isOpen) {
    console.log("Redis client is connected");
  }
  try {
    console.log("app is started");
    if (!(settings.nodeEnv === "test")) {
      mongoose.connect(`${settings.dbString}`);
      const db = mongoose.connection;
      db.on("error", (err) => {
        console.error(err);
      });
      db.on("open", () => console.log("Connected to DB!!!!"));
    }
  } catch (err) {
    console.log(err);
  }
});
