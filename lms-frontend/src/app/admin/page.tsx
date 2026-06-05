"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

export default function AdminPage() {
  const [stats, setStats] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => router.push("/sanction")}
          className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-lg shadow"
        >
          Manage Sanctions
        </button>

        <button
          onClick={() => router.push("/disbursement")}
          className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-lg shadow"
        >
          Manage Disbursements
        </button>

        <button
          onClick={() => router.push("/collection")}
          className="bg-purple-600 hover:bg-purple-700 text-white p-5 rounded-lg shadow"
        >
          Manage Collections
        </button>
      </div>

      {/* Statistics */}
      <h2 className="text-2xl font-semibold mb-4">System Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl mt-2">{stats.totalUsers || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Loans</h2>
          <p className="text-3xl mt-2">{stats.totalLoans || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Applied</h2>
          <p className="text-3xl mt-2">{stats.applied || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Sanctioned</h2>
          <p className="text-3xl mt-2">{stats.sanctioned || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Disbursed</h2>
          <p className="text-3xl mt-2">{stats.disbursed || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Closed</h2>
          <p className="text-3xl mt-2">{stats.closed || 0}</p>
        </div>
      </div>
    </div>
  );
}
