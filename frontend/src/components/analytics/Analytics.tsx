import { useGetAnalytics } from "@/hooks/api/useGetAnalytics/useGetAnalytics";
import { Tile } from "./title/Tile";
import { Analytics as AnalyticsType } from "@/types/analytics";

const coins: (keyof AnalyticsType)[] = ["ton", "btc", "eth", "sol", "bnb"];

const defaultCoinData = {
  historicalPrices: [],
  latestPrice: 0,
  previousDayPrice: 0,
  pricePercentage: 0,
};

const initialAnalyticsCollection: AnalyticsType = coins.reduce((acc, coin) => {
  acc[coin] = { ...defaultCoinData };
  return acc;
}, {} as AnalyticsType);

export const Analytics = () => {
  const {
    data = initialAnalyticsCollection,
    isError,
    isLoading,
  } = useGetAnalytics();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center gap-3 mb-6">
        <img
          src="crypto.svg"
          alt="Logo"
          className="h-6 w-6 rounded-full shadow-lg"
          style={{
            boxShadow:
              "0 4px 8px rgba(0, 255, 0, 0.3), 0 0 15px rgba(0, 255, 0, 0.5)",
          }}
        />
        <h2 className="text-white text-lg font-bold">Crypto Markets</h2>
      </div>

      <div className="h-40">
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {coins.map((coin) => {
            const {
              latestPrice,
              historicalPrices,
              pricePercentage,
              previousDayPrice,
            } = data[coin];
            return (
              <Tile
                key={coin}
                icon={coin as "bnb" | "btc" | "eth" | "sol" | "ton"}
                title={coin.toUpperCase()}
                latestPrice={latestPrice}
                historicalPrices={historicalPrices}
                pricePercentage={pricePercentage}
                previousDayPrice={previousDayPrice}
                isError={isError}
                isLoading={isLoading}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
