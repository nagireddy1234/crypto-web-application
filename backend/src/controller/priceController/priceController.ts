import { Response, Request } from "express";
import { PriceHistory } from "@/models/priceHistory";
import { redisClient } from "@/service/redis";
import { PriceData, Prices } from "@/types/price";
import { settings } from "@/settings";

export const getPrice = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const symbol: string | undefined = req.query.symbol as string | undefined;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  const pair: string = symbol.replace(/\//g, "");
  const reversePair: string = symbol.split("/").reverse().join("/");
  const redisKey: string = `price:${pair}`;

  try {
    const cachedPrice = await redisClient.get(redisKey);
    if (cachedPrice) {
      return res.status(200).json(JSON.parse(cachedPrice));
    }

    const pricingServiceUrl = `${settings.pricingServiceApi}?symbol=${pair}`;
    const response = await fetch(pricingServiceUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PriceData = await response.json();
    const tonUsdtPrice: number = parseFloat(data.price);

    const prices: Prices = {
      [`${symbol}`]: tonUsdtPrice,
      [reversePair]: 1 / tonUsdtPrice,
    };

    const newPriceHistory = new PriceHistory({
      pair,
      price: tonUsdtPrice,
      inversePrice: 1 / tonUsdtPrice,
    });

    await newPriceHistory.save();
    await redisClient.setEx(
      redisKey,
      Number(settings.redisTtl),
      JSON.stringify(prices)
    );

    return res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "External API failure" });
  }
};
