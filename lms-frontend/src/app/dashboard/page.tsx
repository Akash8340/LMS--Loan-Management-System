"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.role === "BORROWER") {
      router.push("/borrower");
    } else if (user.role === "SANCTION") {
      router.push("/sanction");
    } else if (user.role === "DISBURSEMENT") {
      router.push("/disbursement");
    } else if (user.role === "COLLECTION") {
      router.push("/collection");
    } else if (user.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <div>Loading...</div>;
}
