"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditApplicationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const res = await fetch(`/api/applications/${id}`);
        const data = await res.json();
        if (data.success) {
          setApplication(data.application);
          const details =
            typeof data.application.details === "string"
              ? JSON.parse(data.application.details)
              : data.application.details;
          setFormData(details);
          setStatus(data.application.status);
        } else {
          setError("Application not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load application");
      } finally {
        setLoading(false);
      }
    }
    fetchApplication();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details: formData, status }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Application updated successfully");
        setEditMode(false);
        router.refresh(); // re-fetch the data
      } else {
        setError(data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Fields from the first submission (Step 1-3)
  const firstStepFields = [
    { label: "First Name", key: "firstName" },
    { label: "Middle Name", key: "middleName" },
    { label: "Last Name", key: "lastName" },
    { label: "Date of Birth", key: "dob" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Citizenship Number", key: "citizenshipNo" },
    { label: "Citizenship Issue Date", key: "citizenshipIssueDate" },
    { label: "Father's Name", key: "fatherName" },
    { label: "Grandfather's Name", key: "grandfatherName" },
    { label: "Spouse's Name", key: "spouseName" },
    { label: "Province", key: "province" },
    { label: "District", key: "district" },
    { label: "Municipality", key: "municipality" },
    { label: "Ward No", key: "wardNo" },
    { label: "Temporary Address", key: "temporaryAddress" },
    { label: "Occupation", key: "occupation" },
    { label: "Education Qualification", key: "educationQualification" },
    { label: "Work Experience", key: "workExperience" },
    { label: "Number of Shares", key: "numberOfShares" },
  ];

  // Additional fields submitted in the 2nd step (if present)
  const secondStepFields = [
    { label: "Demat ID", key: "dematId" },
    { label: "Payment Method", key: "paymentMethod" },
    { label: "Contact Person Name", key: "contactPersonName" },
    { label: "Relationship", key: "relationship" },
    { label: "Contact Person Phone", key: "contactPersonPhone" },
    { label: "Payment Receipt", key: "paymentReceipt" },
    { label: "Passport Photo", key: "passportPhoto" },
    { label: "Citizenship Document", key: "citizenshipDoc" },
    { label: "Signature Image", key: "signImage" },
  ];

  // Determine if 2nd step details exist (using dematId as indicator)
  const isSecondStep = formData.dematId !== undefined && formData.dematId !== "";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Application {application.applicationId}
        </h1>
        <div>
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Details
            </button>
          )}
        </div>
      </div>

      {/* Status Section (always editable in edit mode) */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Status</label>
        {editMode ? (
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full border p-2 rounded"
          >
            {/* For first-step applications */}
            {application.status === "applied" && (
              <>
                <option value="applied">Applied (1st Step)</option>
                <option value="processed">Accept & Start 2nd Step</option>
                <option value="cancelled">Reject</option>
              </>
            )}
            {/* For second-step applications */}
            {application.status === "pending" && (
              <>
                <option value="pending">Pending (2nd Step)</option>
                <option value="verified">Accept</option>
                <option value="more_details">Request More Details</option>
                <option value="cancelled">Reject</option>
              </>
            )}
            {/* If in another state, display it */}
            {application.status !== "applied" &&
              application.status !== "pending" && (
                <option value={application.status}>{application.status}</option>
              )}
          </select>
        ) : (
          <p className="border p-2 rounded">{status}</p>
        )}
      </div>

      {/* View/Edit Basic & Family Details */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Basic & Family Details</h2>
        {editMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {firstStepFields.map(({ label, key }) => (
              <div key={key}>
                <label className="block font-semibold">{label}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
          </div>
        ) : (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {firstStepFields.map(({ label, key }) => (
              <div key={key}>
                <dt className="font-semibold">{label}</dt>
                <dd className="mt-1">{formData[key] || "-"}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* View/Edit Second-Step Details (if available) */}
      {isSecondStep && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Second-Step Details</h2>
          {editMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {secondStepFields.map(({ label, key }) => (
                <div key={key}>
                  <label className="block font-semibold">{label}</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}
            </div>
          ) : (
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {secondStepFields.map(({ label, key }) => (
                <div key={key}>
                  <dt className="font-semibold">{label}</dt>
                  <dd className="mt-1">{formData[key] || "-"}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </div>
  );
}
