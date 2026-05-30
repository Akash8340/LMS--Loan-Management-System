import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-lg rounded-xl p-10 w-[450px] text-center">

                <h1 className="text-4xl font-bold mb-3">
                    Loan Management System
                </h1>

                <p className="text-gray-600 mb-8">
                    Manage loan applications, approvals,
                    disbursements and collections.
                </p>

                <div className="flex justify-center gap-4">

                    <Link
                        href="/login"
                        className="bg-black text-white px-6 py-3 rounded-lg"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="border px-6 py-3 rounded-lg"
                    >
                        Register
                    </Link>

                </div>

            </div>

        </div>
    );
}