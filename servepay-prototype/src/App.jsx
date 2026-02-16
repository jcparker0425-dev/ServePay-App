import React, { useState } from 'react';

/* ---------------- MOCK DATA ---------------- */
const seedInvoices = [
  { id: "INV-1001", client: "ABC Plumbing", email: "abc@email.com", amount: 2500, status: "Paid", date: "Jan 2, 2026" },
  { id: "INV-1002", client: "Metro Builders", email: "metro@email.com", amount: 1800, status: "Outstanding", date: "Jan 5, 2026" }
];

const seedCustomers = [
  { name: "ABC Plumbing", email: "abc@email.com" },
  { name: "Metro Builders", email: "metro@email.com" },
  { name: "Sunrise Electric", email: "sunrise@email.com" }
];

/* ---------------- APP ---------------- */
export default function App() {
  const [userType, setUserType] = useState(null);
  const [invoices, setInvoices] = useState(seedInvoices);
  const [customers, setCustomers] = useState(seedCustomers);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showSendInvoice, setShowSendInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  /* ---------------- METRICS ---------------- */
  const totalRevenue = invoices.reduce((sum, i) => sum + i.amount, 0);
  const outstanding = invoices.filter(i => i.status === "Outstanding").reduce((sum, i) => sum + i.amount, 0);
  const earned = totalRevenue - outstanding;
  const percent = totalRevenue ? Math.round((earned / totalRevenue) * 100) : 0;

  /* ---------------- ACTIONS ---------------- */
  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
    }, 2000);
  };

  const handleAddCustomer = (name, email) => {
    setCustomers([...customers, { name, email }]);
    setShowAddCustomer(false);
  };

  const handleSendInvoice = () => {
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setShowSendInvoice(false);
    }, 2000);
  };

  /* ---------------- LOGIN ---------------- */
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-6">ServePay</h1>
          <p className="text-sm text-gray-500 mb-6">Demo Login</p>
          <button onClick={() => setUserType("contractor")} className="w-full mb-4 bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-semibold">
            Login as Contractor
          </button>
          <button onClick={() => setUserType("client")} className="w-full border py-3 rounded-xl">Login as Client</button>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN APP ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-5">
          <h1 className="text-xl font-semibold">ServePay</h1>
          <p className="text-sm opacity-80">{userType === "contractor" ? "Contractor Dashboard" : "Client Portal"}</p>
        </div>

        <div className="p-5 space-y-6">
          {/* CONTRACTOR DASHBOARD */}
          {userType === "contractor" && (
            <>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue}</p>
                <p className="text-sm text-gray-500">Outstanding: ${outstanding}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <p className="text-sm text-gray-600 mb-4">Revenue Achievement</p>
                <div className="relative w-40 h-40 mx-auto">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="15" fill="none" />
                    <circle cx="80" cy="80" r="70" stroke="url(#grad)" strokeWidth="15" fill="none" strokeDasharray={`${percent * 4.4} 440`} strokeLinecap="round" />
                    <defs>
                      <linearGradient id="grad">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold">{percent}%</div>
                </div>
              </div>

              <div className="space-y-3">
                {invoices.map(inv => (
                  <div key={inv.id} className="bg-gray-50 p-3 rounded-lg flex justify-between">
                    <div>
                      <p className="text-sm font-medium">{inv.client}</p>
                      <p className="text-xs text-gray-500">{inv.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${inv.amount}</p>
                      <button className="text-xs text-blue-600" onClick={() => setSelectedInvoice(inv)}>View</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Customers</p>
                <ul className="space-y-1">
                  {customers.map((c, i) => (
                    <li key={i} className="text-sm">{c.name} – {c.email}</li>
                  ))}
                </ul>
              </div>

              <button onClick={() => setShowAddCustomer(true)} className="w-full bg-blue-600 text-white py-2 rounded-lg">Add Customer</button>
              <button onClick={() => setShowSendInvoice(true)} className="w-full border py-2 rounded-lg">Send Invoice</button>
            </>
          )}

          {/* CLIENT DASHBOARD */}
          {userType === "client" && (
            <>
              {!paid && !processing && (
                <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                  <h2 className="font-semibold">Invoice #INV-1002</h2>
                  <p className="text-lg font-bold">$1,800.00</p>
                  <p className="text-xs text-gray-400">Payments securely processed. (Demo Mode – No real charge)</p>
                  <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" />
                  <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded" />
                  <input type="text" placeholder="CVC" className="w-full p-2 border rounded" />
                  <button onClick={handlePayment} className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 rounded-lg font-semibold">Pay Now</button>
                </div>
              )}
              {processing && (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                  <p className="mt-4 text-gray-600">Processing Payment...</p>
                </div>
              )}
              {paid && (
                <div className="text-center py-10">
                  <p className="text-2xl text-green-600 font-bold">Payment Successful</p>
                  <p className="text-sm text-gray-500 mt-2">(Demo Mode – No real payment processed)</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* MODALS */}
        {showAddCustomer && <Modal onClose={() => setShowAddCustomer(false)}><ModalForm title="Add Customer" onSubmit={(data) => handleAddCustomer(data.name, data.email)} /></Modal>}
        {showSendInvoice && <Modal onClose={() => setShowSendInvoice(false)}>
          <div className="space-y-4">
            <h3 className="font-semibold">Send Invoice</h3>
            <input type="email" placeholder="Client Email" className="w-full p-2 border rounded" />
            <button onClick={handleSendInvoice} className="w-full bg-blue-600 text-white py-2 rounded-lg">Send Invoice</button>
            {emailSent && <p className="text-green-600 text-sm">Invoice email sent successfully (Demo Simulation)</p>}
          </div>
        </Modal>}
        {selectedInvoice && <Modal onClose={() => setSelectedInvoice(null)}>
          <div>
            <h3 className="font-semibold mb-2">{selectedInvoice.id}</h3>
            <p className="text-sm">{selectedInvoice.client}</p>
            <p className="font-bold">${selectedInvoice.amount}</p>
            <p className="text-xs mt-2 text-gray-500">Status: {selectedInvoice.status}</p>
          </div>
        </Modal>}
      </div>
    </div>
  );
}

/* ---------------- MODAL COMPONENT ---------------- */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400">✕</button>
        {children}
      </div>
    </div>
  );
}

/* ---------------- SIMPLE FORM ---------------- */
function ModalForm({ title, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{title}</h3>
      <input type="text" placeholder="Customer Name" className="w-full p-2 border rounded" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Customer Email" className="w-full p-2 border rounded" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => onSubmit({ name, email })} className="w-full bg-blue-600 text-white py-2 rounded-lg">Save</button>
    </div>
  );
}
