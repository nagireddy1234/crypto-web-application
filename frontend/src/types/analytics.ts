export type AnalyticsResponseData = {
  historical_prices: number[];
  latest_price: number;
  previous_day_price: number;
  price_percentage: number;
};

export type AnalyticsData = {
  historicalPrices: number[];
  latestPrice: number;
  previousDayPrice: number;
  pricePercentage: number;
};

export type Analytics = {
  ton: AnalyticsData;
  btc: AnalyticsData;
  eth: AnalyticsData;
  sol: AnalyticsData;
  bnb: AnalyticsData;
};
