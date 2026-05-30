"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminPage() {

    const [stats, setStats] =
        useState<any>({});

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {

        try {

            const res =
                await api.get(
                    "/admin/stats"
                );

            setStats(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="p-8 bg-gray-100 min-h-screen">

            <h1 className="text-4xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">
                        Total Users
                    </h2>

                    <p className="text-3xl mt-2">
                        {stats.totalUsers || 0}
                    </p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">
                        Total Loans
                    </h2>

                    <p className="text-3xl mt-2">
                        {stats.totalLoans || 0}
                    </p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">
                        Applied
                    </h2>

                    <p className="text-3xl mt-2">
                        {stats.applied || 0}
                    </p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">
                        Sanctioned
                    </h2>

                    <p className="text-3xl mt-2">
                        {stats.sanctioned || 0}
                    </p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">
                        Disbursed
                    </h2>

                    <p className="text-3xl mt-2">
                        {stats.disbursed || 0}
                    </p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold">
                        Closed
                    </h2>

                    <p className="text-3xl mt-2">
                        {stats.closed || 0}
                    </p>
                </div>

            </div>

        </div>

    );
}