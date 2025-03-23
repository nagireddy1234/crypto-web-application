type PriceCardProps = {
  pair: string;
  price: number;
};

export const PriceCard = ({ pair, price }: PriceCardProps) => {
  return (
    <div
      key={pair}
      className="bg-gradient-to-br from-blue-600 to-green-500 p-6 rounded-lg shadow-xl transition-transform duration-300 ease-out transform hover:scale-105 hover:shadow-2xl"
    >
      <h2 className="text-lg font-semibold text-white tracking-wide mb-2">
        {pair}
      </h2>
      <p className="text-4xl font-extrabold text-white tracking-tight">
        {price % 1 === 0 ? price : price.toFixed(6)}
      </p>
    </div>
  );
};
