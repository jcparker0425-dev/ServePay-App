import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

export default function App() {
  const [view, setView] = useState("job");

  const jobs = [
    {
      name: "Smith Water Heater Install",
      invoice: 2000,
      paid: 1500,
      materials: 500,
      labor: 500,
      other: 200,
    },
    {
      name: "Johnson AC Repair",
      invoice: 1200,
      paid: 1200,
      materials: 200,
      labor: 400,
      other: 100,
    },
    {
      name: "Brown Panel Upgrade",
      invoice: 3500,
      paid: 3500,
      materials: 1200,
      labor: 900,
      other: 300,
    },
  ];

  const selectedJob = jobs[0];

  const totalCost =
    selectedJob.materials +
    selectedJob.labor +
    selectedJob.other;

  const profit = selectedJob.invoice - totalCost;
  const margin = ((profit / selectedJob.invoice) * 100).toFixed(1);

  const totalRevenue = jobs.reduce((sum, j) => sum + j.invoice, 0);
  const totalCosts = jobs.reduce(
    (sum, j) => sum + j.materials + j.labor + j.other,
    0
  );
  const totalProfit = totalRevenue - totalCosts;
  const avgMargin = (
    (totalProfit / totalRevenue) *
    100
  ).toFixed(1);

  const businessTrendData = jobs.map((j) => {
    const cost = j.materials + j.labor + j.other;
    return {
      name: j.name,
      Revenue: j.invoice,
      Profit: j.invoice - cost,
    };
  });

  const jobBarData = [
    { name: "Invoice", value: selectedJob.invoice },
    { name: "Cost", value: totalCost },
    { name: "Profit", value: profit },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView("job")}
            className={`px-4 py-2 rounded ${
              view === "job"
                ? "bg-indigo-600 text-white"
                : "bg-white"
            }`}
          >
            Job View
          </button>

          <button
            onClick={() => setView("business")}
            className={`px-4 py-2 rounded ${
              view === "business"
                ? "bg-indigo-600 text-white"
                : "bg-white"
            }`}
          >
            Business View
          </button>
        </div>

        {/* ================= JOB VIEW ================= */}
        {view === "job" && (
          <div className="bg-white rounded-xl shadow p-6 space-y-6">

            <h2 className="text-2xl font-bold">
              {selectedJob.name}
            </h2>

            {/* Snapshot */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-gray-500 text-sm">Invoice</p>
                <p className="text-xl font-bold">
                  ${selectedJob.invoice}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Collected</p>
                <p className="text-xl font-bold">
                  ${selectedJob.paid}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Cost</p>
                <p className="text-xl font-bold">
                  ${totalCost}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Profit</p>
                <p
                  className={`text-xl font-bold ${
                    profit >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ${profit}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Margin</p>
                <p className="text-xl font-bold">
                  {margin}%
                </p>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobBarData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Expense Breakdown */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What This Job Cost Me
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>Materials: ${selectedJob.materials}</div>
                <div>Labor: ${selectedJob.labor}</div>
                <div>Other: ${selectedJob.other}</div>
              </div>
            </div>
          </div>
        )}

        {/* ================= BUSINESS VIEW ================= */}
        {view === "business" && (
          <div className="bg-white rounded-xl shadow p-6 space-y-6">

            <h2 className="text-2xl font-bold">
              Business Performance
            </h2>

            {/* Scoreboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-gray-500 text-sm">
                  Total Revenue
                </p>
                <p className="text-xl font-bold">
                  ${totalRevenue}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  Total Costs
                </p>
                <p className="text-xl font-bold">
                  ${totalCosts}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  Net Profit
                </p>
                <p className="text-xl font-bold text-green-600">
                  ${totalProfit}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  Avg Margin
                </p>
                <p className="text-xl font-bold">
                  {avgMargin}%
                </p>
              </div>
            </div>

            {/* Line Chart */}
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={businessTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Revenue" />
                  <Line type="monotone" dataKey="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
