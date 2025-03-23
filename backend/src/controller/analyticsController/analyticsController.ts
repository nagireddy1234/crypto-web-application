import { Request, Response } from "express";
import { redisClient } from "@/service/redis";
import { settings } from "@/settings";

export const getMarketAnalytics = async (req: Request, res: Response) => {
  try {
    const { currency } = req.query;

    if (!currency) {
      return res.status(400).json({ message: "Currency symbol is required" });
    }

    const redisKey: string = `analytics:${currency}`;
    const cachedData = await redisClient.get(redisKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const dailyAnalyticsEndpoint = `${settings.analyticsServiceApi}?symbol=${currency}&interval=1d&limit=180`;
    const hourlyAnalyticsEndpoint = `${settings.analyticsServiceApi}?symbol=${currency}&interval=1h&limit=24`;

    const [dailyAnalyticsResponse, hourlyAnalyticsResponse] = await Promise.all(
      [fetch(dailyAnalyticsEndpoint), fetch(hourlyAnalyticsEndpoint)]
    );

    const dailyAnalyticsData = await dailyAnalyticsResponse.json();
    const hourlyAnalyticsData = await hourlyAnalyticsResponse.json();

    const historicalPrices = dailyAnalyticsData.map((entry: string[]) =>
      parseFloat(entry[4])
    );

    const previousDayPrice = parseFloat(hourlyAnalyticsData[0][4]);
    const latestPrice = parseFloat(
      hourlyAnalyticsData[hourlyAnalyticsData.length - 1][4]
    );

    const pricePercentage =
      ((latestPrice - previousDayPrice) / previousDayPrice) * 100;

    const prices = {
      historical_prices: historicalPrices,
      latest_price: latestPrice,
      previous_day_price: previousDayPrice,
      price_percentage: pricePercentage.toFixed(2),
    };

    await redisClient.setEx(
      redisKey,
      Number(settings.redisTtl),
      JSON.stringify(prices)
    );

    return res.status(200).send(prices);
  } catch (error) {
    console.error("Error fetching market analytics:", error);
    return res.status(500).json({ message: "Error fetching market analytics" });
  }
};
