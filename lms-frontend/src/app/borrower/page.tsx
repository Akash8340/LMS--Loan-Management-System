"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function BorrowerPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Borrower Dashboard</h1>

          <p className="text-gray-600 mb-10">
            Manage your loan applications and track status.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/borrower/apply-loan"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-3">Apply Loan</h2>

              <p className="text-gray-600">Submit a new loan application.</p>
            </Link>

            <Link
              href="/borrower/my-loan"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-3">My Loans</h2>

              <p className="text-gray-600">
                View all your loans and current status.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
