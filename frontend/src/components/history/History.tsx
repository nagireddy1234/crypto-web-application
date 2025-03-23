import { Link } from "react-router-dom";

export const History = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">History Page</h1>
      <p className="text-lg">Inprogress 😀, API is ready 🤖.</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Go to Price Page
      </Link>
    </div>
  );
};
