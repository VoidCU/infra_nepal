"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

function ImageModal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-75"
        onClick={onClose}
      ></div>
      <div className="relative z-10 p-4">
        <img src={src} alt={alt} className="max-h-screen max-w-full" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-600 text-white px-3 py-1 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ConfirmationModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onCancel}
      ></div>
      <div className="relative bg-white rounded-lg p-6 max-w-sm mx-auto z-10">
        <h2 className="text-xl font-bold mb-4">Please Confirm</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Confirm
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

export default function EditApplicationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [confirmData, setConfirmData] = useState<{
    message: string;
    newStatus: string;
    show: boolean;
  }>({ message: "", newStatus: "", show: false });
  const [popup, setPopup] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });
  // For image modal popup
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

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

  // Save edited details (in edit mode, only details and photos; status remains unchanged)
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details: formData, status }),
      });
      const data = await res.json();
      if (data.success) {
        setPopup({ show: true, message: "Application updated successfully" });
        setEditMode(false);
        router.refresh();
      } else {
        setError(data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    }
  };

  // Direct status change using confirmation modal
  const handleDirectStatusChange = (newStatus: string, message: string) => {
    setConfirmData({ show: true, newStatus, message });
  };

  const confirmStatusChange = async () => {
    setConfirmData((prev) => ({ ...prev, show: false }));
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details: formData, status: confirmData.newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        // Update local state so the change is reflected immediately.
        setStatus(confirmData.newStatus);
        setApplication(data.application); // assuming your API returns the updated application
        setPopup({ show: true, message: "Status updated successfully" });
        // Optionally, you can also call router.refresh() if you use Next.js data fetching.
      } else {
        setError(data.error || "Status update failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    }
  };

  const cancelStatusChange = () => {
    setConfirmData({ show: false, newStatus: "", message: "" });
  };

  // When an image is clicked, open the image modal.
  const handleImageClick = (src: string, alt: string) => {
    setModalImage({ src, alt });
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

  // Additional fields submitted in the 2nd step (if available)
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

  // Determine if second-step details exist (using dematId as indicator)
  const isSecondStep = formData.dematId !== undefined && formData.dematId !== "";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex  justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Application {application.applicationId}
        </h1>
        </div>
        <div className="flex justify-end mb-6">
        <div className="flex items-center space-x-2">
          {/* Direct status change buttons (only in view mode) */}
          {!editMode && application.status === "applied" && (
            <>
              <button
                onClick={() =>
                  handleDirectStatusChange(
                    "processed",
                    "Accept and start 2nd step?"
                  )
                }
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Accept & Start 2nd Step
              </button>
              <button
                onClick={() =>
                  handleDirectStatusChange("cancelled", "Reject this application?")
                }
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Reject
              </button>
            </>
          )}
          {!editMode && application.status === "pending" && (
            <>
              <button
                onClick={() =>
                  handleDirectStatusChange("verified", "Accept this application?")
                }
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  handleDirectStatusChange(
                    "more_details",
                    "Request more details?"
                  )
                }
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
              >
                Request More Details
              </button>
              <button
                onClick={() =>
                  handleDirectStatusChange("cancelled", "Reject this application?")
                }
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Reject
              </button>
            </>
          )}
          {/* In view mode, an "Edit Details" button toggles editMode */}
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Edit Details
            </button>
          )}
        </div>
      </div>

      {/* Status Section - In edit mode, status is shown as read-only text */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Status</label>
        <p className="border p-2 rounded">{status}</p>
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
                  {key === "paymentReceipt" ||
                  key === "passportPhoto" ||
                  key === "citizenshipDoc" ||
                  key === "signImage" ? (
                    <input
                      type="text"
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                    />
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {secondStepFields.map(({ label, key }) => (
                <div key={key}>
                  <dt className="font-semibold">{label}</dt>
                  <dd className="mt-1">
                    {key === "paymentReceipt" ||
                    key === "passportPhoto" ||
                    key === "citizenshipDoc" ||
                    key === "signImage" ? (
                      formData[key] ? (
                        <img
                          src={formData[key]}
                          alt={label}
                          className="h-24 object-cover rounded cursor-pointer"
                          onClick={() => setModalImage({ src: formData[key], alt: label })}
                        />
                      ) : (
                        "-"
                      )
                    ) : (
                      formData[key] || "-"
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      {/* In edit mode, show a Save Changes button */}
      {editMode && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Confirmation Popup for Status Change */}
      {confirmData.show && (
        <ConfirmationModal
          message={confirmData.message}
          onConfirm={confirmStatusChange}
          onCancel={cancelStatusChange}
        />
      )}

      {/* Popup after successful update */}
      {popup.show && (
        <Popup
          message={popup.message}
          onClose={() => {
            setPopup({ show: false, message: "" });
            router.refresh();
          }}
        />
      )}

      {/* Image Modal Popup */}
      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
}
