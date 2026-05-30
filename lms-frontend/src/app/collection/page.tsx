"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CollectionPage() {

    const [loans, setLoans] = useState<any[]>([]);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {

        try {

            const res =
                await api.get(
                    "/loans/disbursed"
                );

            setLoans(
                res.data.loans || res.data
            );

        } catch (error) {
            console.log(error);
        }
    };

    const addPayment = async (
        loanId: string
    ) => {

        const utrNumber =
            prompt("Enter UTR Number");

        const amount =
            prompt("Enter Amount");

        if (!utrNumber || !amount)
            return;

        try {

            await api.post(
                `/payments/${loanId}`,
                {
                    utrNumber,
                    amount:
                        Number(amount),
                    paymentDate:
                        new Date()
                }
            );

            alert(
                "Payment Added"
            );

            fetchLoans();

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Collection Dashboard
            </h1>

            <table className="w-full bg-white shadow rounded">

                <thead>

                    <tr className="bg-gray-200">

                        <th className="p-4">
                            Name
                        </th>

                        <th className="p-4">
                            Outstanding
                        </th>

                        <th className="p-4">
                            Status
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
                                    ₹{loan.outstandingAmount}
                                </td>

                                <td className="p-4">
                                    {loan.status}
                                </td>

                                <td className="p-4">

                                    <button
                                        onClick={() =>
                                            addPayment(
                                                loan._id
                                            )
                                        }
                                        className="bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        Add Payment
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}