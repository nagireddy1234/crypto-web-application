import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Price } from "@/components/price/Price";
import { History } from "./components/history/History";
import { Analytics } from "./components/analytics/Analytics";

function App() {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 min-h-screen p-10">
        <Analytics />
        <Router>
          <Routes>
            <Route path="/" element={<Price />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
