"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

interface Loan {
    _id: string;
    fullName: string;
    loanAmount: number;
    status: string;
}

export default function DisbursementPage() {

    const [loans, setLoans] = useState<Loan[]>([]);

    useEffect(() => {
        fetchLoans();
    }, []);


    const fetchLoans = async () => {
        try {
            const res =
                await api.get(
                    "/loans/sanctioned"
                );

                console.log("Fetched Loans:", res.data.loans || res.data);

            setLoans(
                res.data.loans || res.data
            );

        } catch (error) {
            console.log(error);
        }
    };

    const disburseLoan = async (
        loanId: string
    ) => {

        try {

            await api.patch(
                `/loans/${loanId}/disburse`
            );

            alert("Loan Disbursed");

            fetchLoans();

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Disbursement Dashboard
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
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {loans.map((loan) => (

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

                                <button
                                    onClick={() =>
                                        disburseLoan(
                                            loan._id
                                        )
                                    }
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Disburse
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}