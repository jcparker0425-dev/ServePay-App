import React, { useState } from "react";

/* ---------------- MOCK DATA ---------------- */
const jobs = [
  {
    id: "JOB-1",
    name: "Smith Water Heater Install",
    invoice: 2000,
    paid: 1500,
    materials: 500,
    labor: 500,
    other: 200,
  },
  {
    id: "JOB-2",
    name: "Johnson AC Repair",
    invoice: 1200,
    paid: 1200,
    materials: 200,
    labor: 400,
    other: 100,
  },
];

/* ---------------- APP ---------------- */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  const totalCost =
    selectedJob.materials +
    selectedJob.labor +
    selectedJob.other;

  const profit = selectedJob.invoice - totalCost;
  const margin = ((profit / selectedJob.invoice) * 100).toFixed(1);
  const outstanding = selectedJob.invoice - selectedJob.paid;

  /* ---------------- LOGIN ---------------- */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-6">ServePay</h1>
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

  /* ---------------- DASHBOARD ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-5 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">ServePay</h1>
            <p className="text-xs opacity-80">Contractor Dashboard</p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-xs bg-white text-blue-600 px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="p-5 space-y-5">

          {/* Job Selector */}
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedJob.id}
            onChange={(e) =>
              setSelectedJob(
                jobs.find((j) => j.id === e.target.value)
              )
            }
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.name}
              </option>
            ))}
          </select>

          {/* Snapshot */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Invoice</p>
            <p className="text-xl font-bold">${selectedJob.invoice}</p>

            <p className="text-sm text-gray-600 mt-2">Collected</p>
            <p className="text-lg font-semibold">${selectedJob.paid}</p>

            <p className="text-xs text-gray-500 mt-1">
              Outstanding: ${outstanding}
            </p>
          </div>

          {/* Expenses */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm font-semibold mb-2">
              What This Job Cost Me
            </p>
            <div className="text-sm space-y-1">
              <p>Materials: ${selectedJob.materials}</p>
              <p>Labor: ${selectedJob.labor}</p>
              <p>Other: ${selectedJob.other}</p>
              <p className="font-semibold mt-2">
                Total Cost: ${totalCost}
              </p>
            </div>
          </div>

          {/* Profit */}
          <div className="bg-gray-100 p-4 rounded-xl text-center">
            <p className="text-sm text-gray-600">Profit</p>
            <p
              className={`text-2xl font-bold ${
                profit >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ${profit}
            </p>
            <p className="text-sm mt-1">Margin: {margin}%</p>
          </div>

        </div>
      </div>
    </div>
  );
}
