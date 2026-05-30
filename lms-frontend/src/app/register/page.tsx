"use client";

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
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

            const res = await api.post(
                "/auth/register",
                formData
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    res.data.user
                )
            );

            alert(
                "Registration Successful"
            );

            router.push("/dashboard");

        } catch (error: any) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-[420px] flex flex-col gap-4"
            >

                <h1 className="text-2xl font-bold text-center">
                    Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white p-2"
                >
                    {
                        loading
                        ? "Registering..."
                        : "Register"
                    }
                </button>

                <div className="text-center mt-4">
                    <span>
                        Already have an account?
                    </span>

                    <a
                        href="/login"
                        className="text-blue-600 ml-2"
                    >
                        Login
                    </a>
                </div>

            </form>

        </div>
    );
}