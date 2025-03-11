"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */

const MAX_FILE_SIZE = 1.5 * 1024 * 1024;


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
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({
    paymentReceipt: false,
    passportPhoto: false,
    citizenshipDoc: false,
    signImage: false,
  });

  
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

  // File upload handler for editing image fields.
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 1.5MB limit");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }
    setUploading((prev) => ({ ...prev, [fieldName]: true }));
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev: any) => ({ ...prev, [fieldName]: data.secure_url }));
      } else {
        console.error("Upload failed", data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading((prev) => ({ ...prev, [fieldName]: false }));
    }
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  // Second-step: split into text fields and file fields.
  const secondStepTextFields = [
    { label: "Demat ID", key: "dematId" },
    { label: "Payment Method", key: "paymentMethod" },
    { label: "Contact Person Name", key: "contactPersonName" },
    { label: "Relationship", key: "relationship" },
    { label: "Contact Person Phone", key: "contactPersonPhone" },
  ];
  const secondStepFileFields = [
    { label: "Payment Receipt", key: "paymentReceipt" },
    { label: "Passport Photo", key: "passportPhoto" },
    { label: "Citizenship Document", key: "citizenshipDoc" },
    { label: "Signature Image", key: "signImage" },
  ];


  // Determine if second-step details exist (using paymentReceipt as indicator)
  const isSecondStep = formData.paymentReceipt !== undefined && formData.paymentReceipt !== "";

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

      <div className="bg-white shadow rounded-lg p-6 mb-6">
  <h2 className="text-2xl font-bold mb-4">Basic Details</h2>

  {/* Personal Information Section */}
  <div className="mb-6 bg-gray-200 p-4 rounded">
    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
    {editMode ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="font-semibold">First Name:</span> {formData.firstName || "-"}
        </div>
        <div>
          <span className="font-semibold">Middle Name:</span> {formData.middleName || "-"}
        </div>
        <div>
          <span className="font-semibold">Last Name:</span> {formData.lastName || "-"}
        </div>
        <div>
          <span className="font-semibold">Date of Birth:</span> {formData.dob || "-"}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {formData.email || "-"}
        </div>
        <div>
          <span className="font-semibold">Phone:</span> {formData.phone || "-"}
        </div>
        <div>
          <span className="font-semibold">Country:</span> {formData.country || "-"}
        </div>
      </div>
    )}
  </div>

  {/* Identity Details Section */}
  <div className="mb-6 bg-gray-200 p-4 rounded">
    <h3 className="text-lg font-semibold mb-4">Identity Details</h3>
    {formData.country === "Nepal" ? (
      editMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Citizenship Number</label>
            <input
              type="text"
              name="citizenshipNo"
              value={formData.citizenshipNo || ""}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Citizenship Issue Date</label>
            <input
              type="date"
              name="citizenshipIssueDate"
              value={formData.citizenshipIssueDate || ""}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Citizenship Number:</span> {formData.citizenshipNo || "-"}
          </div>
          <div>
            <span className="font-semibold">Citizenship Issue Date:</span> {formData.citizenshipIssueDate || "-"}
          </div>
        </div>
      )
    ) : (
      editMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Passport Number</label>
            <input
              type="text"
              name="passportNumber"
              value={formData.passportNumber || ""}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">NRN Number</label>
            <input
              type="text"
              name="NRNNumber"
              value={formData.NRNNumber || ""}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Passport Number:</span> {formData.passportNumber || "-"}
          </div>
          <div>
            <span className="font-semibold">NRN Number:</span> {formData.NRNNumber || "-"}
          </div>
        </div>
      )
    )}
  </div>

  {/* Family Information Section */}
  <div className="mb-6 bg-gray-200 p-4 rounded">
    <h3 className="text-lg font-semibold mb-4">Family Information</h3>
    {editMode ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Father&apos;s Name</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Grandfather&apos;s Name</label>
          <input
            type="text"
            name="grandfatherName"
            value={formData.grandfatherName || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Spouse&apos;s Name</label>
          <input
            type="text"
            name="spouseName"
            value={formData.spouseName || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="font-semibold">Father&apos;s Name:</span> {formData.fatherName || "-"}
        </div>
        <div>
          <span className="font-semibold">Grandfather&apos;s Name:</span> {formData.grandfatherName || "-"}
        </div>
        <div>
          <span className="font-semibold">Spouse&apos;s Name:</span> {formData.spouseName || "-"}
        </div>
      </div>
    )}
  </div>

  {/* Address Section */}
  <div className="mb-6 bg-gray-200 p-4 rounded">
    <h3 className="text-lg font-semibold mb-4">Address</h3>
    {editMode ? (
      <div>
        <label className="block font-semibold">Combined Address</label>
        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
      </div>
    ) : (
      <p>{formData.address || "-"}</p>
    )}
  </div>
  {/* Professional Details Section */}
  <div className="mb-6 bg-gray-200 p-4 rounded">
    <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
    {editMode ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Education Qualification</label>
          <input
            type="text"
            name="educationQualification"
            value={formData.educationQualification || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Work Experience</label>
          <input
            type="text"
            name="workExperience"
            value={formData.workExperience || ""}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="font-semibold">Occupation:</span> {formData.occupation || "-"}
        </div>
        <div>
          <span className="font-semibold">Education Qualification:</span> {formData.educationQualification || "-"}
        </div>
        <div>
          <span className="font-semibold">Work Experience:</span> {formData.workExperience || "-"}
        </div>
      </div>
    )}
  </div>

  {/* Share Details Section */}
  <div className="mb-6 bg-gray-200 p-4 rounded">
    <h3 className="text-lg font-semibold mb-4">Share Details</h3>
    {editMode ? (
      <div>
        <label className="block font-semibold">Number of Shares</label>
        <input
          type="number"
          name="numberOfShares"
          value={formData.numberOfShares || ""}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
      </div>
    ) : (
      <p>
        <span className="font-semibold">Number of Shares:</span> {formData.numberOfShares || "-"}
      </p>
    )}
  </div>
      </div>

      {/* View/Edit Second-Step Details (if available) */}
  {isSecondStep && (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Second-Step Details</h2>
    {editMode ? (
      <>
        {/* Contact & Investment Details (Text Fields) */}
        <div className="mb-6 bg-gray-200 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Contact & Investment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondStepTextFields.map(({ label, key }) => (
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
        </div>
        {/* Document Uploads (File Fields) */}
        <div className="mb-6 bg-gray-200 p-4 rounded sh">
          <h3 className="text-lg font-semibold mb-2">Document Uploads</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondStepFileFields.map(({ label, key }) => (
              <div key={key} >
                <label className="block mb-1">{label}*</label>
                <input
                  type="file"
                  id={key}
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, key)}
                />
                {formData[key] && (
                  <img
                    src={formData[key]}
                    alt={`${label} Preview`}
                    className="mt-2 h-24 object-cover rounded cursor-pointer mb-4"
                    onClick={() => setModalImage({ src: formData[key], alt: `${label} Preview` })}
                  />
                )}
                <button
                  type="button"
                  onClick={() => document.getElementById(key)?.click()}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={uploading[key]}
                >
                  {uploading[key] ? "Uploading..." : `Upload ${label}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    ) : (
      <>
        {/* View Mode */}
        <div className="mb-6 bg-gray-200 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Contact & Investment Details</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondStepTextFields.map(({ label, key }) => (
              <div key={key}>
                <dt className="font-semibold">{label}</dt>
                <dd className="mt-1">{formData[key] || "-"}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mb-6 bg-gray-200 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Document Uploads</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondStepFileFields.map(({ label, key }) => (
              <div key={key}>
                <dt className="font-semibold">{label}</dt>
                <dd className="mt-1">
                  {formData[key] ? (
                    <img
                      src={formData[key]}
                      alt={label}
                      className="h-24 object-cover rounded cursor-pointer"
                      onClick={() => setModalImage({ src: formData[key], alt: label })}
                    />
                  ) : (
                    "-"
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </>
    )}
  </div>
)}

      {/* In edit mode, show a Save Changes button */}
      {editMode && (
        <div className="flex justify-end mt-6 gap-8">
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
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
