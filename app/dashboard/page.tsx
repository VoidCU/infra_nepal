"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications/user");
        if (res.ok) {
          const data = await res.json();
          setApplications(data.applications);
        } else {
          console.error("Failed to fetch applications.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  const handleCloseModal = () => {
    setSelectedApp(null);
  };

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      router.push("/login"); // Redirect to login page after logout
    }
  };

  return (
    <div className="pt-20 max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center my-8">
      <h1 className="text-3xl font-bold">My Applications</h1>
      <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>You have not submitted any applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Application ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Submitted At</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                // Parse the stored JSON details
                let details = {};
                try {
                  details =
                    typeof app.details === "string"
                      ? JSON.parse(app.details)
                      : app.details;
                } catch (err) {
                  console.error("Error parsing application details", err);
                }
                return (
                  <tr key={app.id}>
                    <td className="py-2 px-4 border">{app.applicationId}</td>
                    <td className="py-2 px-4 border">
                      {details.firstName} {details.lastName}
                    </td>
                    <td className="py-2 px-4 border">{app.status}</td>
                    <td className="py-2 px-4 border">
                      {new Date(app.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for viewing application details */}
      {selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-lg p-8 max-w-lg mx-auto z-10"
          >
            <h2 className="text-2xl font-bold mb-4">Application Details</h2>
            {(() => {
              let details = {};
              try {
                details =
                  typeof selectedApp.details === "string"
                    ? JSON.parse(selectedApp.details)
                    : selectedApp.details;
              } catch (error) {
                console.error("Error parsing details", error);
              }
              return (
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {details.firstName} {details.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {details.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {details.phone}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {details.dob}
                  </p>
                  <p>
                    <strong>Citizenship No:</strong> {details.citizenshipNo}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {details.municipality}-{details.wardNo}, {details.district},{details.province}
                    
                  </p>
                  <p>
                    <strong>Occupation:</strong> {details.occupation}
                  </p>
                  <p>
                    <strong>Number of Shares:</strong> {details.numberOfShares}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedApp.status}
                  </p>
                  <p>
                    <strong>Submitted At:</strong>{" "}
                    {new Date(selectedApp.createdAt).toLocaleString()}
                  </p>
                  {/* Add more fields as necessary */}
                </div>
              );
            })()}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
