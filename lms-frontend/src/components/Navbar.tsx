"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    name: string;
    role: string;
}

export default function Navbar() {

    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] =
        useState<User | null>(null);

    useEffect(() => {

        const loadUser = () => {

            const storedUser =
                localStorage.getItem("user");

            if (storedUser) {
                setUser(
                    JSON.parse(storedUser)
                );
            } else {
                setUser(null);
            }
        };

        loadUser();

        window.addEventListener(
            "storage",
            loadUser
        );

        return () => {
            window.removeEventListener(
                "storage",
                loadUser
            );
        };

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

        setUser(null);

        router.push("/login");
    };

    return (
        <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">

            <Link
                href="/"
                className="font-bold text-xl"
            >
                LMS
            </Link>

            <div className="flex items-center gap-4">

                {user && (
                    <>
                        <span className="text-sm">
                            Welcome,
                            {" "}
                            <b>{user.name}</b>
                            {" "}
                            ({user.role})
                        </span>

                        <button
                            onClick={logout}
                            className="bg-red-500 px-4 py-2 rounded"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>
    );
}