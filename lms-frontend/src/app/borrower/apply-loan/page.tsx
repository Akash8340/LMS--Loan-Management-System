"use client";

import { useState } from "react";
import api from "../../../services/api";

export default function ApplyLoanPage() {

    const [formData, setFormData] = useState({
        fullName: "",
        pan: "",
        dob: "",
        monthlySalary: "",
        employmentMode: "SALARIED",
        loanAmount: "",
        tenure: ""
    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post(
                "/loans/apply",
                {
                    ...formData,
                    monthlySalary: Number(
                        formData.monthlySalary
                    ),
                    loanAmount: Number(
                        formData.loanAmount
                    ),
                    tenure: Number(
                        formData.tenure
                    )
                }
            );

            alert(
                "Loan Applied Successfully"
            );

            setFormData({
                fullName: "",
                pan: "",
                dob: "",
                monthlySalary: "",
                employmentMode: "SALARIED",
                loanAmount: "",
                tenure: ""
            });

        } catch (error: any) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-3xl font-bold mb-2">
                    Apply For Loan
                </h1>

                <p className="text-gray-500 mb-8">
                    Fill in your details to submit a
                    new loan application.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-5"
                >

                    <div>
                        <label className="block mb-2 font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            PAN Number
                        </label>

                        <input
                            type="text"
                            name="pan"
                            value={formData.pan}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Monthly Salary
                        </label>

                        <input
                            type="number"
                            name="monthlySalary"
                            value={formData.monthlySalary}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Employment Type
                        </label>

                        <select
                            name="employmentMode"
                            value={formData.employmentMode}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="SALARIED">
                                Salaried
                            </option>

                            <option value="SELF_EMPLOYED">
                                Self Employed
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Loan Amount
                        </label>

                        <input
                            type="number"
                            name="loanAmount"
                            value={formData.loanAmount}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Tenure (Days)
                        </label>

                        <input
                            type="number"
                            name="tenure"
                            value={formData.tenure}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    <div className="md:col-span-2 mt-4">

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90"
                        >
                            {
                                loading
                                ? "Submitting..."
                                : "Apply Loan"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}