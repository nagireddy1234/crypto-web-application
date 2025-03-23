import { AnalyticsData, AnalyticsResponseData } from "@/types/analytics";

export const mapAnalyticsData = (
  analyticsData: AnalyticsResponseData
): AnalyticsData => {
  return {
    historicalPrices: analyticsData.historical_prices,
    latestPrice: analyticsData.latest_price,
    previousDayPrice: analyticsData.previous_day_price,
    pricePercentage: analyticsData.price_percentage,
  };
};
