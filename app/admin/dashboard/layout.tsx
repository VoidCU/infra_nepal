// /admin/dashboard/layout.tsx
import React from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen mt-16 h-full bg-gray-800 ">
      <aside className="w-64  text-white p-4 relative ">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul>
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
      </aside>
      <main className="flex-1 p-6 bg-gray-50 relative">{children}</main>
    </div>
  );
}
