"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="pt-20 p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin. Here you can review share applications and manage user requests.</p>
      {/* Dashboard content goes here */}
    </div>
  );
}
