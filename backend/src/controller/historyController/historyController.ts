import { Request, Response } from "express";
import { PriceHistory } from "@/models/priceHistory";

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { currency, skip = 0, limit = 10 } = req.query;
    const skipValue = parseInt(skip as string, 10);
    const limitValue = parseInt(limit as string, 10);

    if (
      isNaN(skipValue) ||
      isNaN(limitValue) ||
      skipValue < 0 ||
      limitValue <= 0
    ) {
      return res.status(400).json({ message: "Invalid skip or limit values" });
    }

    const filter = currency ? { pair: currency } : {};

    const total = await PriceHistory.countDocuments(filter);
    const history = await PriceHistory.find(filter)
      .select("-_id -__v")
      .sort({ date: -1 })
      .skip(skipValue)
      .limit(limitValue);

    return res.status(200).json({
      total,
      skip: skipValue,
      limit: limitValue,
      history,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching price history" });
  }
};
