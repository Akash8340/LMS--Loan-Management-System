"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoggedIn(!!token);
    }, []);

    if (
        pathname === "/login" ||
        pathname === "/register"
    ) {
        return null;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <nav className="bg-black text-white px-6 py-4 flex justify-between">

            <Link href="/" className="font-bold">
                LMS
            </Link>

            {loggedIn && (
                <button
                    onClick={logout}
                    className="bg-red-500 px-4 py-2 rounded"
                >
                    Logout
                </button>
            )}

        </nav>
    );
}