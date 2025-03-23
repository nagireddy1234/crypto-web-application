import express from "express";
import { getMarketAnalytics } from "@/controller/analyticsController";

const router = express.Router();

router.get("/", getMarketAnalytics);

export const analyticsRouter = router;
