import { LineGraph } from "../lineGraph/LineGraph";

type TileProps = {
  icon: "bnb" | "btc" | "eth" | "sol" | "ton";
  title: string;
  latestPrice: number;
  historicalPrices: number[];
  pricePercentage: number;
  previousDayPrice: number;
  isLoading: boolean;
  isError: boolean;
};

export const Tile = ({
  icon,
  title,
  historicalPrices,
  latestPrice,
  pricePercentage,
  previousDayPrice,
  isLoading,
  isError,
}: TileProps) => {
  if (isError) {
    return <div className="text-red-500">Error loading data</div>;
  }

  if (isLoading) {
    return (
      <div className="w-[220px] max-w-md text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 outline outline-1 outline-slate-700">
        <div className="animate-pulse space-y-3">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gray-500 rounded-full" />
              <div className="w-24 bg-gray-500 h-4 rounded" />
            </div>
          </div>
          <div className="w-full bg-gray-500 h-1.5 rounded" />
          <div className="w-24 bg-gray-500 h-4 rounded mt-4" />
          <div className="w-32 bg-gray-500 h-4 rounded mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-[220px] max-w-md text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 outline outline-1 outline-slate-700`}
      style={{
        backgroundImage: "linear-gradient(to top right, #003366 1%, black 99%)",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={`${icon}.svg`}
            alt="Logo"
            className="h-10 w-10 rounded-full shadow-lg"
            style={{
              boxShadow:
                "0 4px 8px rgba(0, 255, 0, 0.3), 0 0 15px rgba(0, 255, 0, 0.5)", // Green shadow
            }}
          />
          <span className="text-white text-lg font-semibold">{title}</span>
        </div>
      </div>
      <LineGraph
        data={historicalPrices.map((value, index) => ({
          x: index,
          y: value,
        }))}
      />
      <div className="text-white text-l font-bold mb-1">
        ${latestPrice?.toFixed(2)}
      </div>
      <div className="flex justify-between text-sm text-white">
        <div
          className={`flex font-semibold gap-4 items-center ${
            pricePercentage && pricePercentage < 0
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          <span>
            {latestPrice && latestPrice - previousDayPrice! > 0 ? "▲" : "▼"}{" "}
            {pricePercentage && (pricePercentage < 0 ? "-" : "+")}
            {Math.abs(latestPrice! - previousDayPrice!).toFixed(2)}
          </span>
          <span>
            ({pricePercentage && (pricePercentage < 0 ? "-" : "+")}
            {Math.abs(pricePercentage!).toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};
