import { settings } from "@/settings";
// import { PriceData } from "@/types/price";
import { useQuery } from "@tanstack/react-query";
import { mapAnalyticsData } from "../mappers/analytics.mappers";
import { Analytics } from "@/types/analytics";

const getAnalytics = async (): Promise<Analytics> => {
  const [ton, btc, eth, sol, bnb] = await Promise.all([
    fetch(`${settings.api.baseUrl}/analytics?currency=TONUSDT`),
    fetch(`${settings.api.baseUrl}/analytics?currency=BTCUSDT`),
    fetch(`${settings.api.baseUrl}/analytics?currency=ETHUSDT`),
    fetch(`${settings.api.baseUrl}/analytics?currency=SOLUSDT`),
    fetch(`${settings.api.baseUrl}/analytics?currency=BNBUSDT`),
  ]);

  if (!ton.ok || !btc.ok || !eth.ok || !sol.ok || !bnb.ok) {
    throw new Error("Error fetching analytics");
  }

  const [tonData, btcData, ethData, solData, bnbData] = await Promise.all([
    ton.json(),
    btc.json(),
    eth.json(),
    sol.json(),
    bnb.json(),
  ]);

  return {
    ton: mapAnalyticsData(tonData),
    btc: mapAnalyticsData(btcData),
    eth: mapAnalyticsData(ethData),
    sol: mapAnalyticsData(solData),
    bnb: mapAnalyticsData(bnbData),
  };
};

export const useGetAnalytics = () => {
  const queryCacheTime =
    parseInt(import.meta.env.VITE_QUERY_CACHE_TIME) || 1800000; // Cache time (30 minutes)

  return useQuery<Analytics>({
    queryKey: ["analytics"],
    queryFn: () => getAnalytics(),
    staleTime: queryCacheTime,
    throwOnError: false,
    retry: false,
  });
};
