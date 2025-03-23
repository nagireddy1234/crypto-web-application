import { useState } from "react";
import { useGetPrice } from "@/hooks/api/useGetPrice";
import { Link } from "react-router-dom";
import { PriceCard } from "./PriceCard/PriceCard";

export const Price = () => {
  const [currency, setCurrency] = useState("TON/USDT");
  const { data, isError, isLoading } = useGetPrice(currency);

  return (
    <>
      <div className="container flex justify-between items-center mx-auto px-6 pt-10 pb-14 max-w-7xl">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img
              src="crypto.svg"
              alt="Logo"
              className="h-6 w-6 rounded-full shadow-lg"
              style={{
                transform: "rotate(45deg)",
                boxShadow:
                  "0 4px 8px rgba(0, 255, 0, 0.3), 0 0 15px rgba(0, 255, 0, 0.5)",
              }}
            />
            <h2 className="text-white text-lg font-bold">Crypto Converter</h2>
          </div>
        </div>
        <Link
          to="/history"
          className="text-blue-500 hover:underline hover:text-blue-400 transition duration-200 ease-in-out"
        >
          History
        </Link>
      </div>

      <div className="flex justify-center mb-8 space-x-6">
        {["TON/USDT", "ETH/BTC", "BTC/USDT"].map((pair) => (
          <label
            key={pair}
            className={`cursor-pointer text-white text-lg p-2 rounded-md transition-colors duration-200 ${
              currency === pair
                ? "bg-blue-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <input
              type="radio"
              name="currency"
              value={pair}
              checked={currency === pair}
              onChange={() => setCurrency(pair)}
              className="hidden"
            />
            <span>{pair}</span>
          </label>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-7xl p-4 mx-auto my-12">
        {isError && (
          <div className="h-28 flex justify-center items-center text-red-500">
            <p>Error fetching data.</p>
          </div>
        )}
        {isLoading && (
          <div className="h-28 flex justify-center items-center text-gray-500">
            <p>Loading...</p>
          </div>
        )}
        {data &&
          Object.entries(data).map(([pair, price]) => (
            <PriceCard key={pair} pair={pair} price={price} />
          ))}
      </div>
    </>
  );
};
