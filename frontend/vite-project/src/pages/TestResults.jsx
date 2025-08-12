// src/pages/TestResults.jsx
import React from "react";

const TestResults = () => {
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Test Results</h1>
        <p className="text-gray-600">View uploaded medical test results</p>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6 max-w-5xl mx-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-purple-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">Patient</th>
              <th className="py-3 px-4 border-b text-left">Test Type</th>
              <th className="py-3 px-4 border-b text-left">Date</th>
              <th className="py-3 px-4 border-b text-left">Report</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((_, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{idx + 1}</td>
                <td className="py-2 px-4 border-b">John Doe</td>
                <td className="py-2 px-4 border-b">Blood Test</td>
                <td className="py-2 px-4 border-b">2025-07-04</td>
                <td className="py-2 px-4 border-b">
                  <a href="#" className="text-blue-600 underline">View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResults;
