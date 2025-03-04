"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  interface Application {
    id: string;
    applicationId: string;
    details: string | {
      firstName: string;
      lastName: string;
      email: string;
    };
    status: string;
    createdAt: string;
  }

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications from the API on component mount
  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications");
        if (res.ok) {
          const data = await res.json();
          setApplications(data.applications);
        } else {
          console.error("Failed to fetch applications");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      router.push("/login"); // Redirect to login page after logout
    }
  };

  return (
    <div className="pt-20 p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <p className="mb-4">
        Welcome, Admin. Here you can review share applications and manage user requests.
      </p>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Application ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              // Parse details JSON; it might be stored as a string or already as an object
              let details: { firstName: string; lastName: string; email: string } = { firstName: '', lastName: '', email: '' };
              try {
                details = typeof app.details === "string" ? JSON.parse(app.details) : app.details;
              } catch (error) {
                console.error("Error parsing application details", error);
              }
              return (
                <tr key={app.id}>
                  <td className="py-2 px-4 border">{app.applicationId}</td>
                  <td className="py-2 px-4 border">
                    {details.firstName} {details.lastName}
                  </td>
                  <td className="py-2 px-4 border">{details.email}</td>
                  <td className="py-2 px-4 border">{app.status}</td>
                  <td className="py-2 px-4 border">
                    {new Date(app.createdAt).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
