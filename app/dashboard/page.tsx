"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
/* eslint-disable @typescript-eslint/no-explicit-any */
function DetailsModal({ app, onClose }: { app: any; onClose: () => void }) {
  let details: any = {};
  try {
    details =
      typeof app.details === "string"
        ? JSON.parse(app.details)
        : app.details;
  } catch (err) {
    console.error("Error parsing application details", err);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-lg p-8 max-w-lg mx-auto z-10"
      >
        <h2 className="text-2xl font-bold mb-4">Application Details</h2>
        <div className="space-y-2">
          <p>
            <strong>Application ID:</strong> {app.applicationId}
          </p>
            <p>
            <strong>Name:</strong> {details.firstName} {details.middleName ? details.middleName + " " : ""}{details.lastName}
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
            <strong>Address:</strong> {details.address}
          </p>
          <p>
            <strong>Occupation:</strong> {details.occupation}
          </p>
          <p>
            <strong>Number of Shares:</strong> {details.numberOfShares}
          </p>
          <p>
            <strong>Status:</strong> {app.status}
          </p>
          <p>
            <strong>Submitted At:</strong>{" "}
            {new Date(app.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
        <div className="text-center mt-4">
          If any details are incorrect, mail us at <br />
          <a href="mailto:correctit@infranepal.com" className="text-blue-600 underline">
            correctit@infranepal.com
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function ChangePasswordModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (newPassword: string) => Promise<void>;
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    await onSubmit(newPassword);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-75" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg p-6 max-w-md mx-auto z-10">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block font-semibold mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Popup({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md mx-auto text-center shadow-lg">
        <h2 className="text-2xl font-bold text-[#003893] mb-4">Success</h2>
        <p className="text-lg mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [popup, setPopup] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

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

 

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      router.push("/login");
    }
  };

  // Change password submission handler
  async function handleChangePasswordSubmit(newPassword: string) {
    try {
      const res = await fetch("/api/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setPopup({ show: true, message: "Password changed successfully" });
        setShowChangePasswordModal(false);
      } else {
        setPopup({ show: true, message: data.error || "Password change failed" });
      }
    } catch (error) {
      console.error("Change password error:", error);
      setPopup({ show: true, message: "An error occurred while changing your password" });
    }
  }

  // Summary stats for shares and applications
  const totalApplications = applications.length;
  const verifiedCount = applications.filter((app) => app.status === "verified").length;
  const cancelledCount = applications.filter((app) => app.status === "cancelled").length;

  const totalSharesApplied = applications.reduce((acc, app) => {
    let details: any = {};
    try {
      details =
        typeof app.details === "string"
          ? JSON.parse(app.details)
          : app.details;
    } catch (err) {
      details = {};
      console.error("Error parsing application details", err);
      // console.error("Error parsing application details", err);
    }
    return acc + (parseInt(details.numberOfShares, 10) || 0);
  }, 0);

  const acceptedShares = applications
    .filter((app) => app.status === "verified")
    .reduce((acc, app) => {
      let details: any = {};
      try {
        details =
          typeof app.details === "string"
            ? JSON.parse(app.details)
            : app.details;
      } catch (err) {
        details = {};
        console.error("Error parsing application details", err);
      }
      return acc + (parseInt(details.numberOfShares, 10) || 0);
    }, 0);

  const rejectedShares = applications
    .filter((app) => app.status === "cancelled")
    .reduce((acc, app) => {
      let details: any = {};
      try {
        details =
          typeof app.details === "string"
            ? JSON.parse(app.details)
            : app.details;
      } catch (err) {
        details = {};
        console.error("Error parsing application details", err);
      }
      return acc + (parseInt(details.numberOfShares, 10) || 0);
    }, 0);

  return (
    <div className="pt-20 max-w-6xl mx-auto p-4">
      <div className="flex justify-end items-center my-8 space-x-4">
        <a href="/apply" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Request New Shares
        </a>
        <button
          onClick={() => setShowChangePasswordModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Change Password
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold">
            Total Applications (Shares)
          </h3>
          <p className="text-3xl">
            {totalApplications} ({totalSharesApplied})
          </p>
          <div className="flex justify-around mt-4">
            <div className="text-green-600">
              <h4 className="text-lg font-semibold">
                Verified (Shares)
              </h4>
              <p className="text-2xl">
                {verifiedCount} ({acceptedShares})
              </p>
            </div>
            <div className="text-red-600">
              <h4 className="text-lg font-semibold">
                Cancelled (Shares)
              </h4>
              <p className="text-2xl">
                {cancelledCount} ({rejectedShares})
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : totalApplications === 0 ? (
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
                let details: any = {};
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
                    <td className="py-2 px-4 border">
                      {app.status === "more_details" ? (
                        <span className="text-yellow-600">
                          Re-upload Documents
                        </span>
                      ) : (
                        app.status
                      )}
                    </td>
                    <td className="py-2 px-4 border">
                      {new Date(app.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border">
                      {app.status === "processed" || app.status === "more_details" ? (
                        <button
                          onClick={() => router.push("/apply/complete")}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        >
                          View Details
                        </button>
                      )}
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
        <DetailsModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
          onSubmit={handleChangePasswordSubmit}
        />
      )}

      {/* Popup Modal */}
      {popup.show && (
        <Popup
          message={popup.message}
          onClose={() => setPopup({ show: false, message: "" })}
        />
      )}
    </div>
  );
}
