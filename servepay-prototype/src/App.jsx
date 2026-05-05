import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 600 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 650 },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState("job");

  // 🔐 Simple Demo Login Screen
if (!isLoggedIn) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6">ServePay</h1>
        <p className="text-sm text-gray-500 mb-6">Demo Login</p>

        <button
          onClick={() => setIsLoggedIn(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-semibold"
        >
          Enter Demo
        </button>
      </div>
    </div>
  );
}

  // 📊 Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">
            ServePay Dashboard
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => setView("job")}
              className={`px-4 py-2 rounded-lg ${
                view === "job"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Job View
            </button>

            <button
              onClick={() => setView("business")}
              className={`px-4 py-2 rounded-lg ${
                view === "business"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Business View
            </button>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 capitalize">
            {view} Revenue Overview
          </h2>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
