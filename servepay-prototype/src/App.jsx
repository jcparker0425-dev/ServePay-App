import { useState } from "react";

export default function App() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      name: "Smith Water Heater Install",
      type: "Water Heater",
      invoiceTotal: 1800,
      paidAmount: 1800,
      materials: 650,
      labor: 400,
      other: 50,
    },
    {
      id: 2,
      name: "Johnson Panel Upgrade",
      type: "Electrical Panel",
      invoiceTotal: 2400,
      paidAmount: 1200,
      materials: 900,
      labor: 600,
      other: 100,
    },
    {
      id: 3,
      name: "Drain Cleanout - Elm St",
      type: "Drain Service",
      invoiceTotal: 450,
      paidAmount: 450,
      materials: 75,
      labor: 120,
      other: 0,
    },
  ]);

  const [invoiceTotal, setInvoiceTotal] = useState(0);
const [paidAmount, setPaidAmount] = useState(0);

const [materialsCost, setMaterialsCost] = useState(0);
const [laborCost, setLaborCost] = useState(0);
const [otherCost, setOtherCost] = useState(0);
  const totalExpenses = materialsCost + laborCost + otherCost;

const expectedProfit = invoiceTotal - totalExpenses;
const realizedProfit = paidAmount - totalExpenses;

const margin =
  invoiceTotal > 0
    ? ((expectedProfit / invoiceTotal) * 100).toFixed(1)
    : 0;

const outstanding = invoiceTotal - paidAmount;
  const [selectedJobId, setSelectedJobId] = useState(1);

  const selectedJob = jobs.find((job) => job.id === selectedJobId);

  const updateJob = (field, value) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === selectedJobId ? { ...job, [field]: Number(value) } : job
      )
    );
  };

  const calculateMetrics = (job) => {
    const totalCosts = job.materials + job.labor + job.other;
    const expectedProfit = job.invoiceTotal - totalCosts;
    const realizedProfit = job.paidAmount - totalCosts;
    const margin =
      job.invoiceTotal > 0
        ? ((expectedProfit / job.invoiceTotal) * 100).toFixed(1)
        : 0;

    return { totalCosts, expectedProfit, realizedProfit, margin };
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">

        {/* Job List */}
        <div className="col-span-1 bg-white text-gray-800 rounded-xl shadow-xl p-4">
          <h2 className="text-xl font-bold mb-4">Jobs</h2>

          {jobs.map((job) => {
            const { margin } = calculateMetrics(job);
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`p-3 mb-3 rounded-lg cursor-pointer border ${
                  selectedJobId === job.id
                    ? "bg-indigo-100 border-indigo-400"
                    : "bg-gray-50"
                }`}
              >
                <p className="font-semibold">{job.name}</p>
                <p className="text-sm text-gray-600">{job.type}</p>
                <p className="text-sm font-bold text-green-600">
                  {margin}% Margin
                </p>
              </div>
            );
          })}
        </div>

        {/* Job Detail */}
        <div className="col-span-2 bg-white text-gray-800 rounded-xl shadow-xl p-6">
          <h1 className="text-2xl font-bold mb-6">
            {selectedJob.name}
          </h1>

          {/* Revenue */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Revenue</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={selectedJob.invoiceTotal}
                onChange={(e) =>
                  updateJob("invoiceTotal", e.target.value)
                }
                className="border p-2 rounded"
                placeholder="Invoice Total"
              />
              <input
                type="number"
                value={selectedJob.paidAmount}
                onChange={(e) =>
                  updateJob("paidAmount", e.target.value)
                }
                className="border p-2 rounded"
                placeholder="Paid Amount"
              />
            </div>
          </div>

<div className="mt-8 bg-white text-gray-800 rounded-xl shadow-lg p-6">

  <h2 className="text-xl font-bold mb-6">
    Job Financial Overview
  </h2>

  {/* ================= INVOICE SECTION ================= */}
  <div className="mb-6">
    <h3 className="font-semibold text-lg mb-3 text-indigo-600">
      Invoice & Payment
    </h3>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Total Invoice Amount ($)
        </label>
        <input
          type="number"
          value={invoiceTotal}
          onChange={(e) => setInvoiceTotal(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Amount Paid ($)
        </label>
        <input
          type="number"
          value={paidAmount}
          onChange={(e) => setPaidAmount(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>

    <p className="mt-2 text-sm text-gray-600">
      Outstanding Balance: ${outstanding}
    </p>
  </div>

  {/* ================= EXPENSE SECTION ================= */}
  <div className="mb-6">
    <h3 className="font-semibold text-lg mb-3 text-indigo-600">
      Job Expenses
    </h3>

    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Materials Cost ($)
        </label>
        <input
          type="number"
          value={materialsCost}
          onChange={(e) => setMaterialsCost(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Labor Cost ($)
        </label>
        <input
          type="number"
          value={laborCost}
          onChange={(e) => setLaborCost(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Other Expenses ($)
        </label>
        <input
          type="number"
          value={otherCost}
          onChange={(e) => setOtherCost(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>

    <p className="mt-2 text-sm text-gray-600">
      Total Job Expenses: ${totalExpenses}
    </p>
  </div>

  {/* ================= PROFIT SUMMARY ================= */}
  <div className="bg-gray-100 p-4 rounded-lg">
    <h3 className="font-semibold text-lg mb-3">
      Profit Summary
    </h3>

    <div className="space-y-2">
      <p>
        <strong>Expected Profit:</strong> ${expectedProfit}
      </p>

      <p>
        <strong>Realized Profit (Paid Only):</strong> ${realizedProfit}
      </p>

      <p className="font-bold text-green-600">
        Margin: {margin}%
      </p>
    </div>
  </div>
</div>          
          
          {/* Costs */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Job Costs</h2>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                value={selectedJob.materials}
                onChange={(e) =>
                  updateJob("materials", e.target.value)
                }
                className="border p-2 rounded"
                placeholder="Materials"
              />
              <input
                type="number"
                value={selectedJob.labor}
                onChange={(e) =>
                  updateJob("labor", e.target.value)
                }
                className="border p-2 rounded"
                placeholder="Labor"
              />
              <input
                type="number"
                value={selectedJob.other}
                onChange={(e) =>
                  updateJob("other", e.target.value)
                }
                className="border p-2 rounded"
                placeholder="Other"
              />
            </div>
          </div>

          {/* Profit Summary */}
          <div className="bg-gray-100 p-4 rounded-lg">
            {(() => {
              const { totalCosts, expectedProfit, realizedProfit, margin } =
                calculateMetrics(selectedJob);

              return (
                <>
                  <h2 className="font-semibold text-lg mb-3">
                    Profit Summary
                  </h2>
                  <p>Total Costs: ${totalCosts}</p>
                  <p>Expected Profit: ${expectedProfit}</p>
                  <p>Realized Profit (Paid Only): ${realizedProfit}</p>
                  <p className="font-bold text-green-600">
                    Margin: {margin}%
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}


