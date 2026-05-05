import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- DATA ---------------- */
const initialJobs = [
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedId, setSelectedId] = useState(jobs[0].id);

  const [showExpense, setShowExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    materials: "",
    labor: "",
    other: "",
  });

  const selectedJob = jobs.find((j) => j.id === selectedId);

  const totalCost =
    selectedJob.materials +
    selectedJob.labor +
    selectedJob.other;

  const profit = selectedJob.invoice - totalCost;
  const margin = ((profit / selectedJob.invoice) * 100).toFixed(1);

  /* ---------------- ADD EXPENSE ---------------- */
  const handleAddExpense = () => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === selectedId) {
        return {
          ...job,
          materials:
            job.materials + Number(newExpense.materials || 0),
          labor: job.labor + Number(newExpense.labor || 0),
          other: job.other + Number(newExpense.other || 0),
        };
      }
      return job;
    });

    setJobs(updatedJobs);
    setShowExpense(false);
    setNewExpense({ materials: "", labor: "", other: "" });
  };

  /* ---------------- GRAPH DATA ---------------- */
  const chartData = jobs.map((job) => {
    const cost = job.materials + job.labor + job.other;
    return {
      name: job.name.split(" ")[0],
      profit: job.invoice - cost,
    };
  });

  /* ---------------- LOGIN ---------------- */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <button
          onClick={() => setIsLoggedIn(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Enter Demo
        </button>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 flex justify-center">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-5 space-y-5">

        {/* Header */}
        <div className="flex justify-between">
          <h1 className="font-bold text-lg">ServePay</h1>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>

        {/* Job Selector */}
        <select
          className="w-full p-2 border rounded"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.name}
            </option>
          ))}
        </select>

        {/* Snapshot */}
        <div className="bg-blue-50 p-4 rounded-xl">
          <p>Invoice: ${selectedJob.invoice}</p>
          <p>Collected: ${selectedJob.paid}</p>
        </div>

        {/* Expenses */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="font-semibold mb-2">Job Costs</p>
          <p>Materials: ${selectedJob.materials}</p>
          <p>Labor: ${selectedJob.labor}</p>
          <p>Other: ${selectedJob.other}</p>
          <p className="font-bold mt-2">Total: ${totalCost}</p>

          <button
            onClick={() => setShowExpense(true)}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
          >
            Add Expense
          </button>
        </div>

        {/* Profit */}
        <div className="text-center">
          <p>Profit</p>
          <p className="text-2xl font-bold">${profit}</p>
          <p>{margin}% margin</p>
        </div>

        {/* GRAPH */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* MODAL */}
        {showExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl w-80 space-y-3">
              <h3>Add Expense</h3>

              <input
                placeholder="Materials"
                className="w-full border p-2"
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    materials: e.target.value,
                  })
                }
              />
              <input
                placeholder="Labor"
                className="w-full border p-2"
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    labor: e.target.value,
                  })
                }
              />
              <input
                placeholder="Other"
                className="w-full border p-2"
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    other: e.target.value,
                  })
                }
              />

              <button
                onClick={handleAddExpense}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Save Expense
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
