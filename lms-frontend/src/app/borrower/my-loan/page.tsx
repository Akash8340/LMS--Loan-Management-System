"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

interface Loan {
  _id: string;
  loanAmount: number;
  status: string;
  outstandingAmount: number;
  totalRepayment: number;
  tenure: number;
}

export default function MyLoansPage() {
  const [loans, setLoans] = useState<Loan[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await api.get("/loans/my-loans");

      setLoans(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Loans</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-left">Loan Amount</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Outstanding</th>

                <th className="p-4 text-left">Total Repayment</th>

                <th className="p-4 text-left">Tenure</th>
              </tr>
            </thead>

            <tbody>
              {loans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center">
                    No loans found
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan._id} className="border-t">
                    <td className="p-4">₹{loan.loanAmount}</td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                        {loan.status}
                      </span>
                    </td>

                    <td className="p-4">₹{loan.outstandingAmount}</td>

                    <td className="p-4">₹{loan.totalRepayment}</td>

                    <td className="p-4">{loan.tenure} Days</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
