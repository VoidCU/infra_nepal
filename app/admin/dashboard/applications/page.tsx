// /admin/dashboard/applications/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

// Helper to get color-coded classes for status badges
function getStatusBadgeClass(status: string) {
  switch (status) {
    case "applied":
      return "bg-blue-100 text-blue-800";
    case "processed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-orange-100 text-orange-800";
    case "verified":
      return "bg-green-200 text-green-900";
    case "more_details":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const router = useRouter();

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await fetch("/api/applications");
        const data = await res.json();
        if (data.success) {
          setApplications(data.applications);
        }
      } catch (error) {
        console.error("Error fetching applications", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApps();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortApplications = (apps: any[]) => {
    if (!sortField) return apps;
    return [...apps].sort((a, b) => {
      let aVal, bVal;
      if (sortField === "submittedAt") {
        aVal = new Date(a.createdAt).getTime();
        bVal = new Date(b.createdAt).getTime();
      } else if (sortField === "applicant") {
        const aDetails =
          typeof a.details === "string" ? JSON.parse(a.details) : a.details;
        const bDetails =
          typeof b.details === "string" ? JSON.parse(b.details) : b.details;
        aVal = (aDetails.firstName + " " + aDetails.lastName).toLowerCase();
        bVal = (bDetails.firstName + " " + bDetails.lastName).toLowerCase();
      } else {
        aVal = a[sortField];
        bVal = b[sortField];
      }
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Filter applications by search term and status
  const filteredApps = applications.filter((app) => {
    let details =
      typeof app.details === "string" ? JSON.parse(app.details) : app.details;
    const fullName = (details.firstName + " " + details.lastName).toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? app.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Separate applications by type
  const firstStepApps = sortApplications(
    filteredApps.filter((app) => app.status === "applied" || app.status === "processed")
  );
  const secondStepApps = sortApplications(
    filteredApps.filter((app) => app.status === "pending" || app.status === "verified" || app.status === "more_details")
  );

  const rejectedApps = sortApplications(
    filteredApps.filter((app) => app.status === "cancelled")
  );


  if (loading) return <p>Loading applications...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Applications</h1>

      {/* Search and Filter */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
        <input
          type="text"
          placeholder="Search by applicant name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full md:w-1/3 mb-2 md:mb-0"
        />
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="">All Statuses</option>
          <option value="applied">Applied (1st Step)</option>
          <option value="processed">Processed</option>
          <option value="pending">Pending (2nd Step)</option>
          <option value="verified">Verified</option>
          <option value="more_details">More Details</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* First-Step Applications Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">First-Step Applications</h2>
        {firstStepApps.length === 0 ? (
          <p>No first-step applications found.</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort("applicationId")}
                >
                  Application ID <ArrowsUpDownIcon className="w-4 h-4 inline-block" />
                </th>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort("applicant")}
                >
                  Applicant <ArrowsUpDownIcon className="w-4 h-4 inline-block" />
                </th>
                <th className="py-2 px-4 border">Status</th>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort("submittedAt")}
                >
                  Submitted At <ArrowsUpDownIcon className="w-4 h-4 inline-block" />
                </th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {firstStepApps.map((app) => {
                let details = {};
                try {
                  details =
                    typeof app.details === "string"
                      ? JSON.parse(app.details)
                      : app.details;
                } catch (e) {
                  console.error("Error parsing details", e);
                }
                return (
                  <tr key={app.id}>
                    <td className="py-2 px-4 border">{app.applicationId}</td>
                    <td className="py-2 px-4 border">
                      {details.firstName} {details.lastName}
                    </td>
                    <td className="py-2 px-4 border">
                      <span className={`px-2 py-1 rounded ${getStatusBadgeClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border">
                      {new Date(app.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() =>
                          router.push(`/admin/dashboard/applications/${app.id}`)
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Second-Step Applications Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Second-Step Applications</h2>
        {secondStepApps.length === 0 ? (
          <p>No second-step applications found.</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort("applicationId")}
                >
                  Application ID <ArrowsUpDownIcon className="w-4 h-4 inline-block" />
                </th>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort("applicant")}
                >
                  Applicant <ArrowsUpDownIcon className="w-4 h-4 inline-block" />
                </th>
                <th className="py-2 px-4 border">Status</th>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort("submittedAt")}
                >
                  Submitted At <ArrowsUpDownIcon className="w-4 h-4 inline-block" />
                </th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {secondStepApps.map((app) => {
                let details = {};
                try {
                  details =
                    typeof app.details === "string"
                      ? JSON.parse(app.details)
                      : app.details;
                } catch (e) {
                  console.error("Error parsing details", e);
                }
                return (
                  <tr key={app.id}>
                    <td className="py-2 px-4 border">{app.applicationId}</td>
                    <td className="py-2 px-4 border">
                      {details.firstName} {details.lastName}
                    </td>
                    <td className="py-2 px-4 border">
                      <span className={`px-2 py-1 rounded ${getStatusBadgeClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border">
                      {new Date(app.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() =>
                          router.push(`/admin/dashboard/applications/${app.id}`)
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Rejected Applications Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Rejected Applications</h2>
        {rejectedApps.length === 0 ? (
          <p>No rejected applications found.</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort("applicationId")}
                >
                  Application ID <ArrowsUpDownIcon className="w-4 h-4 inline-block" />
                </th>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort("applicant")}
                >
                  Applicant <ArrowsUpDownIcon className="w-4 h-4 inline-block" />
                </th>
                <th className="py-2 px-4 border">Status</th>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort("submittedAt")}
                >
                  Submitted At <ArrowsUpDownIcon className="w-4 h-4 inline-block" />
                </th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {rejectedApps.map((app) => {
                let details = {};
                try {
                  details =
                    typeof app.details === "string"
                      ? JSON.parse(app.details)
                      : app.details;
                } catch (e) {
                  console.error("Error parsing details", e);
                }
                return (
                  <tr key={app.id}>
                    <td className="py-2 px-4 border">{app.applicationId}</td>
                    <td className="py-2 px-4 border">
                      {details.firstName} {details.lastName}
                    </td>
                    <td className="py-2 px-4 border">
                      <span className={`px-2 py-1 rounded ${getStatusBadgeClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border">
                      {new Date(app.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() =>
                          router.push(`/admin/dashboard/applications/${app.id}`)
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}
