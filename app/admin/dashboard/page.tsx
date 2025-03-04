// /admin/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";

export default function DashboardHome() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;
  if (!stats) return <p>No stats available</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold">Total Users</h3>
          <p className="text-3xl">{stats.users}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold">Total Applications</h3>
          <p className="text-3xl">{stats.applications}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold">First-Step Applications</h3>
          <p className="text-3xl">{stats.applied}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold">Second-Step Applications</h3>
          <p className="text-3xl">{stats.pending}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold">Verified Applications</h3>
          <p className="text-3xl">{stats.verified}</p>
        </div>
      </div>
    </div>
  );
}
