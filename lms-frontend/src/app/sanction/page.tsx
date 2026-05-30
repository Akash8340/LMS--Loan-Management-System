"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

interface Loan {
    _id: string;
    fullName: string;
    loanAmount: number;
    monthlySalary: number;
    status: string;
}

export default function SanctionPage() {

    const [loans, setLoans] =
        useState<Loan[]>([]);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {

        try {

            const res =
                await api.get(
                    "/loans/applied"
                );

            setLoans(
                res.data.loans || res.data
            );

        } catch (error) {

            console.log(error);

        }
    };

    const sanctionLoan = async (
        loanId: string
    ) => {

        try {

            await api.patch(
                `/loans/${loanId}/sanction`
            );

            fetchLoans();

        } catch (error) {

            console.log(error);

        }
    };

    const rejectLoan = async (
        loanId: string
    ) => {

        try {

            await api.patch(
                `/loans/${loanId}/reject`
            );

            fetchLoans();

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    Sanction Dashboard
                </h1>

                <table className="w-full bg-white shadow rounded">

                    <thead>

                        <tr className="bg-gray-200">

                            <th className="p-4">
                                Name
                            </th>

                            <th className="p-4">
                                Amount
                            </th>

                            <th className="p-4">
                                Salary
                            </th>

                            <th className="p-4">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            loans.map(
                                (loan) => (

                                <tr
                                    key={loan._id}
                                    className="border-t"
                                >

                                    <td className="p-4">
                                        {loan.fullName}
                                    </td>

                                    <td className="p-4">
                                        ₹{loan.loanAmount}
                                    </td>

                                    <td className="p-4">
                                        ₹{loan.monthlySalary}
                                    </td>

                                    <td className="p-4 flex gap-2">

                                        <button
                                            onClick={() =>
                                                sanctionLoan(
                                                    loan._id
                                                )
                                            }
                                            className="bg-green-600 text-white px-4 py-2 rounded"
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() =>
                                                rejectLoan(
                                                    loan._id
                                                )
                                            }
                                            className="bg-red-600 text-white px-4 py-2 rounded"
                                        >
                                            Reject
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}