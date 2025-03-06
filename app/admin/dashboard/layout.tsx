"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      router.push("/login");
    }
  };
  return (
    <div className="flex min-h-screen mt-16 h-full bg-gray-200 ">
      <aside className="w-64  p-4 relative ">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <div className="flex flex-col justify-around">
        <nav >
          <ul >
            <li className="mb-4">
              <Link href="/admin/dashboard">Dashboard Home</Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/dashboard/applications">Applications</Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/dashboard/users">Users</Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition "
        >
          Logout
        </button>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-gray-50 relative">{children}</main>
    </div>
  );
}
