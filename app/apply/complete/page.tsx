"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Displays a full-size image in a popup.
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
      <div className="absolute inset-0 bg-black opacity-75" onClick={onClose}></div>
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

// Asks user for confirmation before an action (if needed for status changes).
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

// Popup for final success message after submission.
function Popup({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
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

export default function ContinueApplicationForm() {
  const router = useRouter();

  // 1) Track whether we're loading or had a fetch error
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(""); // fetch error for loading the application

  // 2) Store the loaded application data
  const [application, setApplication] = useState<any>(null);

  // 3) Step and submission states
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 4) Validation error for required fields
  const [validationError, setValidationError] = useState("");

  // 5) secondStepData for fields
  const [secondStepData, setSecondStepData] = useState({
    dematId: "",
    paymentMethod: "",
    contactPersonName: "",
    relationship: "",
    contactPersonPhone: "",
    agreeToTerms: false,
  });

  // 6) File data for step 4
  const [fileData, setFileData] = useState({
    paymentReceipt: null as File | null,
    passportPhoto: null as File | null,
    citizenshipDoc: null as File | null,
    signImage: null as File | null,
  });
  const [preview, setPreview] = useState({
    paymentReceipt: "",
    passportPhoto: "",
    citizenshipDoc: "",
    signImage: "",
  });

  // 7) ConfirmationModal (if you need it for some action)
  const [confirmData, setConfirmData] = useState<{
    message: string;
    newStatus: string;
    show: boolean;
  }>({ message: "", newStatus: "", show: false });

  // 8) Final popup for success
  const [popup, setPopup] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  // 9) Image modal for enlarged previews
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  // 10) Check if user is logged in (has an access token)
  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("accessToken="));
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // 11) Fetch the user's "processed" or "more_details" application
  useEffect(() => {
    async function fetchProcessedApp() {
      try {
        const res = await fetch("/api/applications/user");
        const data = await res.json();
        if (data.error && data.error === "Unauthorized") {
          router.push("/login");
          return;
        }
        if (data.success) {
          const processedApp = data.applications.find(
            (app: any) =>
              app.status === "processed" || app.status === "more_details"
          );
          if (processedApp) {
            setApplication(processedApp);
          } else {
            setFetchError(
              "Your application is not ready to be continued. Please contact support or check your dashboard."
            );
          }
        } else {
          setFetchError("Unable to fetch your application. Please try again later.");
        }
      } catch (err) {
        console.error(err);
        setFetchError("Failed to fetch your application.");
      } finally {
        setLoading(false);
      }
    }
    fetchProcessedApp();
  }, [router]);

  // 12) Validation for each step
  const validateCurrentStep = (): boolean => {
    if (currentStep === 2) {
      if (!secondStepData.dematId.trim()) {
        setValidationError("Please enter Demat ID.");
        return false;
      }
    }
    if (currentStep === 4) {
      if (
        !fileData.paymentReceipt ||
        !fileData.passportPhoto ||
        !fileData.citizenshipDoc ||
        !fileData.signImage ||
        !secondStepData.agreeToTerms
      ) {
        setValidationError("Please upload all required documents and agree to terms.");
        return false;
      }
    }
    setValidationError("");
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setValidationError("");
    setCurrentStep((prev) => prev - 1);
  };

  // 13) Input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setSecondStepData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setSecondStepData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 14) File changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFileData((prev) => ({ ...prev, [name]: file }));
      setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  // 15) On form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      for (const key in secondStepData) {
        formDataToSend.append(key, secondStepData[key]);
      }
      for (const key in fileData) {
        if (fileData[key]) {
          formDataToSend.append(key, fileData[key] as Blob);
        }
      }
      const res = await fetch("/api/applications/continue", {
        method: "PUT",
        body: formDataToSend,
      });
      const data = await res.json();
      if (data.success) {
        setPopup({ show: true, message: "Application continued successfully" });
        // You can redirect to a dashboard 
        router.push("/dashboard");


      } else {
        setValidationError(data.error || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      setValidationError("An error occurred while submitting your details");
    }
    setIsSubmitting(false);
  };

  // 16) Show loading or fetch error
  if (loading) {
    return <p>Loading your application...</p>;
  }
  if (fetchError) {
    return <p className="text-red-500">{fetchError}</p>;
  }
  if (!application) {
    // If there's no error but no application found, show a message
    return <p className="text-red-500">No application found.</p>;
  }

  // 17) For share calculations
  const numberOfShares = application.details.numberOfShares;
  const sharePrice = 100;
  const totalAmount = numberOfShares * sharePrice;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Continue Your Application</h1>

      

      {/* Display previously submitted details (read-only) */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-2xl font-bold mb-4">Your Submitted Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(application.details).map(([key, value]) => (
            <div key={key}>
              <p className="font-semibold capitalize">{key}</p>
              <p>{value || "-"}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Inline validation error (for required fields) */}
      {validationError && (
        <p className="text-red-500 font-semibold mb-4">{validationError}</p>
      )}
      {/* Multi-step form */}
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#003893] mb-4">
              Step 1: Payment Instructions
            </h2>
            <p className="mb-4 text-lg">
              Each share costs{" "}
              <span className="font-bold text-red-600">100 rupees</span>. To
              purchase <span className="font-bold">50 shares</span>, you must
              deposit{" "}
              <span className="font-bold text-red-600">5000 rupees</span>.
            </p>
            <div className="bg-gray-200 border-4 border-green-600 p-2 mb-4">
              <p className="text-lg font-semibold">
                Pay this much as your share amount is{" "}
                <span className="text-green-800">{totalAmount}</span> rupees.
              </p>
            </div>
            <div className="bg-gray-100 border-l-4 border-blue-600 p-4 mb-4">
              <p className="font-semibold mb-2">How to Buy Shares:</p>
              <ol className="list-decimal list-inside">
                <li>Complete your payment as specified above.</li>
                <li>
                  Use one of the following methods:
                  <ul className="list-disc list-inside ml-4 mb-2">
                    <li>Bank Transfer</li>
                    <li>Cheque</li>
                    <li>Online Transfer</li>
                  </ul>
                </li>
                <li>Deposit the funds using the bank details below.</li>
              </ol>
            </div>
            <div className="border border-gray-300 p-4 rounded-lg mb-4">
              <p>
                <strong>Company:</strong> Peace Energy Company Pvt. Ltd.
              </p>
              <p>
                <strong>Bank Name:</strong> Machapuchchhre Bank Ltd.
              </p>
              <p>
                <strong>Branch:</strong> Lazmipat, Kathmandu
              </p>
              <p>
                <strong>Account Number:</strong> 0390992270400012
              </p>
              <p>
                <strong>Swift Code:</strong> MBLNNPKA
              </p>
            </div>
            <p className="mb-4 text-lg">
              After completing your payment, click "Next" to proceed.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#003893] mb-4">
              Step 2: Investment Details
            </h2>
            <div className="mb-4">
              <label className="block mb-1">Demat ID*</label>
              <input
                type="text"
                name="dematId"
                value={secondStepData.dematId}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">
                Number of Shares to Purchase*
              </label>
              <input
                type="number"
                name="numberOfShares"
                value={application.details.numberOfShares}
                readOnly
                className="w-full border p-2 rounded"
              />
              <p className="text-sm text-gray-600 mt-1">
                (Each share costs 100 rupees. For{" "}
                {application.details.numberOfShares} shares, deposit{" "}
                {application.details.numberOfShares * 100} rupees.)
              </p>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#003893] mb-4">
              Step 3: Contact Person Details (if needed)
            </h2>
            <div className="mb-4">
              <label className="block mb-1">Contact Person Name</label>
              <input
                type="text"
                name="contactPersonName"
                value={secondStepData.contactPersonName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Relationship</label>
              <input
                type="text"
                name="relationship"
                value={secondStepData.relationship}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Contact Person Phone</label>
              <input
                type="tel"
                name="contactPersonPhone"
                value={secondStepData.contactPersonPhone}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#003893] mb-4">
              Step 4: Upload Documents & Agreement
            </h2>
            <div className="grid gap-4 mb-4">
              <div>
                <label className="block mb-1">Payment Receipt Photo*</label>
                <input
                  type="file"
                  name="paymentReceipt"
                  onChange={handleFileChange}
                  className="w-full border p-2 rounded"
                  accept="image/*"
                  required
                />
                {preview.paymentReceipt && (
                  <img
                    src={preview.paymentReceipt}
                    alt="Receipt Preview"
                    className="mt-2 h-24 object-cover rounded cursor-pointer"
                    onClick={() =>
                      setModalImage({
                        src: preview.paymentReceipt,
                        alt: "Receipt Preview",
                      })
                    }
                  />
                )}
              </div>
              <div>
                <label className="block mb-1">Passport Size Photo*</label>
                <input
                  type="file"
                  name="passportPhoto"
                  onChange={handleFileChange}
                  className="w-full border p-2 rounded"
                  accept="image/*"
                  required
                />
                {preview.passportPhoto && (
                  <img
                    src={preview.passportPhoto}
                    alt="Passport Preview"
                    className="mt-2 h-24 object-cover rounded cursor-pointer"
                    onClick={() =>
                      setModalImage({
                        src: preview.passportPhoto,
                        alt: "Passport Preview",
                      })
                    }
                  />
                )}
              </div>
              <div>
                <label className="block mb-1">
                  Citizenship or Passport Copy*
                </label>
                <input
                  type="file"
                  name="citizenshipDoc"
                  onChange={handleFileChange}
                  className="w-full border p-2 rounded"
                  accept="image/*,application/pdf"
                  required
                />
                {preview.citizenshipDoc && (
                  <img
                    src={preview.citizenshipDoc}
                    alt="Citizenship Preview"
                    className="mt-2 h-24 object-cover rounded cursor-pointer"
                    onClick={() =>
                      setModalImage({
                        src: preview.citizenshipDoc,
                        alt: "Citizenship Preview",
                      })
                    }
                  />
                )}
              </div>
              <div>
                <label className="block mb-1">Signature Image*</label>
                <input
                  type="file"
                  name="signImage"
                  onChange={handleFileChange}
                  className="w-full border p-2 rounded"
                  accept="image/*"
                  required
                />
                {preview.signImage && (
                  <img
                    src={preview.signImage}
                    alt="Signature Preview"
                    className="mt-2 h-24 object-cover rounded cursor-pointer"
                    onClick={() =>
                      setModalImage({
                        src: preview.signImage,
                        alt: "Signature Preview",
                      })
                    }
                  />
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={secondStepData.agreeToTerms}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2 text-lg">
                  I confirm that the details provided are true and authentic.
                </span>
              </label>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-green-600 text-white px-4 py-2 rounded transition ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </motion.div>
        )}
      </form>

      {/* Confirmation Popup for status change (not used here) */}
      {confirmData.show && (
        <ConfirmationModal
          message={confirmData.message}
          onConfirm={() => {
            setConfirmData((prev) => ({ ...prev, show: false }));
            // Some status change logic if needed
          }}
          onCancel={() => setConfirmData({ show: false, newStatus: "", message: "" })}
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
