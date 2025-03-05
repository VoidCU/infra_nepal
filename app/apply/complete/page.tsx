"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ContinueApplicationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<any>(null);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  // Second-stage form data for new fields (non-editable fields from first stage remain unchanged)
  const [secondStepData, setSecondStepData] = useState({
    dematId: "",
    paymentMethod: "",
    contactPersonName: "",
    relationship: "",
    contactPersonPhone: "",
    agreeToTerms: false,
  });

  // For file uploads in Step 4
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

  // Fetch the current processed application for the user
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
            (app: any) => app.status === "processed" || app.status === "more_details"
            );
          if (processedApp) {
            setApplication(processedApp);
          } else {
            setError(
              "Your application is not ready to be continued. Please contact support or check your dashboard."
            );
          }
        } else {
          setError("Unable to fetch your application. Please try again later.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch your application.");
      } finally {
        setLoading(false);
      }
    }
    fetchProcessedApp();
  }, [router]);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setSecondStepData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setSecondStepData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFileData((prev) => ({ ...prev, [name]: file }));
      setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  // On submit, create a FormData object that includes secondStepData and fileData
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      // Append secondStepData fields
      for (const key in secondStepData) {
        formDataToSend.append(key, secondStepData[key]);
      }
      // Append file fields
      for (const key in fileData) {
        if (fileData[key]) {
          formDataToSend.append(key, fileData[key] as Blob);
        }
      }
      // Do not set Content-Type manually when sending FormData.
      const res = await fetch("/api/applications/continue", {
        method: "PUT",
        body: formDataToSend,
      });
      const data = await res.json();
      if (data.success) {
        alert("Application continued successfully");
        router.push("/dashboard");
      } else {
        setError(data.error || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while submitting your details");
    }
  };

  if (loading) return <p>Loading your application...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Calculate share purchase amount (each share costs 100 rupees)
  const numberOfShares = application.details.numberOfShares;
  const sharePrice = 100;
  const totalAmount = numberOfShares * sharePrice;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Continue Your Application</h1>

      {/* Display previous details (read-only) */}
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

      {/* Single Form Wrapper for the Multi-Step Form */}
      <form onSubmit={handleSubmit}>
        {/* Step 1: Payment Instructions */}
        {currentStep === 1 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
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
              After completing your payment, click &quot;Next&quot; to proceed.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Investment Details */}
        {currentStep === 2 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
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
                onClick={prevStep}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact Person Details */}
        {currentStep === 3 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#003893] mb-4">
              Step 3: Contact Person Details (if needed)
            </h2>
            <div className="mb-4">
              <label className="block mb-1">Contact Person Name*</label>
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
              <label className="block mb-1">Relationship*</label>
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
              <label className="block mb-1">Contact Person Phone*</label>
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
                onClick={prevStep}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Document Uploads & Agreement */}
        {currentStep === 4 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
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
                    className="mt-2 h-24 object-cover rounded"
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
                    className="mt-2 h-24 object-cover rounded"
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
                    className="mt-2 h-24 object-cover rounded"
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
                    className="mt-2 h-24 object-cover rounded"
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
                onClick={prevStep}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit Application
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
