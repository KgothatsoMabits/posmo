import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Dummy Components for Routing 
const Dashboard = () => (
  <div className="p-6 flex flex-col items-center justify-center h-full">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">MoMo Spaza OS</h1>
    <Link to="/scanner" className="w-full text-center bg-yellow-400 text-black font-bold text-xl py-4 rounded-xl shadow-lg mb-4">
      NEW SALE
    </Link>
    <div className="grid grid-cols-2 gap-4 w-full">
      <Link to="/vault" className="bg-gray-800 text-white text-center py-4 rounded-xl font-semibold">Compliance Vault</Link>
      <button className="bg-gray-200 text-gray-600 text-center py-4 rounded-xl font-semibold">Supplier Pay</button>
    </div>
  </div>
);

const SmartScanner = () => (
  <div className="p-6 flex flex-col h-full">
    <h1 className="text-2xl font-bold mb-4">Scan Items</h1>
    <div className="flex-grow bg-gray-300 rounded-xl flex items-center justify-center mb-4 border-4 border-dashed border-gray-400">
      <p className="text-gray-500 font-bold">[ Camera Viewfinder ]</p>
    </div>
    <Link to="/checkout" className="w-full text-center bg-blue-600 text-white font-bold text-xl py-4 rounded-xl shadow-lg">
      CHARGE R0.00
    </Link>
  </div>
);

const Checkout = () => (
  <div className="p-6 flex flex-col items-center justify-center h-full">
    <h1 className="text-2xl font-bold mb-8">Awaiting Payment</h1>
    <div className="w-64 h-64 bg-gray-200 rounded-xl flex items-center justify-center mb-8">
      <p className="text-gray-500 font-bold">[ PayShap QR Code ]</p>
    </div>
    <Link to="/" className="w-full text-center bg-red-500 text-white font-bold text-lg py-3 rounded-xl">
      Cancel Transaction
    </Link>
  </div>
);

const ComplianceVault = () => (
  <div className="p-6 h-full">
    <h1 className="text-2xl font-bold mb-4">Compliance Vault</h1>
    <div className="bg-green-100 text-green-800 p-4 rounded-xl font-bold mb-4 border border-green-300">
      Status: Verified Business
    </div>
    <Link to="/" className="mt-4 block text-center text-blue-600 font-bold">Back to Dashboard</Link>
  </div>
);

export default function Application() {
  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto h-screen bg-gray-50 shadow-2xl overflow-hidden font-sans border-x border-gray-200">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scanner" element={<SmartScanner />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/vault" element={<ComplianceVault />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}