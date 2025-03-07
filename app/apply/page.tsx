"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function InitialApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data across 4 steps
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    citizenshipNo: "",
    citizenshipIssueDate: "",
    // Step 2: Family & Address Details
    fatherName: "",
    grandfatherName: "",
    spouseName: "",
    province: "",
    district: "",
    municipality: "",
    wardNo: "",
    temporaryAddress: "",
    // Step 3: Professional Details & Investment Intent
    occupation: "",
    educationQualification: "",
    workExperience: "",
    // Step 4: Share Count
    numberOfShares: "",
    agreeToTerms: false,
  });

  // Handle input changes – handles text and checkboxes.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate the required fields for the current step.
  const validateCurrentStep = (): boolean => {
    if (step === 1) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.dob ||
        !formData.email ||
        !formData.phone ||
        !formData.citizenshipNo ||
        !formData.citizenshipIssueDate
      ) {
        setErrorMsg("Please fill in all required fields in Basic Information.");
        return false;
      }
    } else if (step === 2) {
      if (
        !formData.fatherName ||
        !formData.grandfatherName ||
        !formData.province ||
        !formData.district ||
        !formData.municipality ||
        !formData.wardNo
      ) {
        setErrorMsg("Please fill in all required fields in Family & Address Details.");
        return false;
      }
    } else if (step === 3) {
      if (
        !formData.occupation ||
        !formData.educationQualification ||
        !formData.workExperience
      ) {
        setErrorMsg("Please fill in all required fields in Professional Details.");
        return false;
      }
    } else if (step === 4) {
      if (!formData.numberOfShares || !formData.agreeToTerms) {
        setErrorMsg("Please fill in all required fields and agree to terms in Share Count.");
        return false;
      }
    }
    // Clear any existing error if validation passes.
    setErrorMsg("");
    return true;
  };

  // Handler for the Next button. It validates the current step before proceeding.
  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => prev + 1);
    }
  };

  // Back button clears error and navigates one step back.
  const handlePrev = () => {
    setErrorMsg("");
    setStep((prev) => prev - 1);
  };

  // Form submission handler. Also validates the current step before submitting.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res: Response = await fetch("/api/applications/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data: { error?: string } = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Submission failed.");
      } else {
        setShowSuccessPopup(true);
      }
    } catch (error) {
      setErrorMsg(`Something went wrong, please try again. Error: ${error}`);
    }
    setIsSubmitting(false);
  };

  const handlePopupOk = () => {
    setShowSuccessPopup(false);
    router.push("/");
  };

  const handleRedirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="pt-20 max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 mt-4">Apply for Share Purchase</h1>
      <p className=" text-center">
        Please fill in the form below to apply for purchasing shares in Infra Nepal Development Fund.
      </p>
      <p className="mb-2 text-end">To check applied form status go to <a href="/dashboard" className="text-blue-800">Dashboard</a></p>
      {/* Error Display */}
      {errorMsg && (
        <div className="text-center mb-4">
          <p className="text-red-500">{errorMsg}</p>
          {errorMsg.toLowerCase().includes("already exist") && (
            <button
              onClick={handleRedirectToLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Redirect to Login
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#003893] mb-4">Step 1: Basic Information</h2>
            <div className="mb-4">
              <label className="block mb-1">First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">
                Middle Name <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Date of Birth*</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Citizenship Number*</label>
              <input
                type="text"
                name="citizenshipNo"
                value={formData.citizenshipNo}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Citizenship Issue Date*</label>
              <input
                type="date"
                name="citizenshipIssueDate"
                value={formData.citizenshipIssueDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#003893] mb-4">Step 2: Family & Address Details</h2>
            <div className="mb-4">
              <label className="block mb-1">Father&apos;s Name*</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Grandfather&apos;s Name*</label>
              <input
                type="text"
                name="grandfatherName"
                value={formData.grandfatherName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Spouse&apos;s Name</label>
              <input
                type="text"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <label className="block mb-1">Permanent Address</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Province*</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">District*</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Municipality*</label>
                <input
                  type="text"
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Ward No*</label>
                <input
                  type="text"
                  name="wardNo"
                  value={formData.wardNo}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Temporary Address</label>
              <textarea
                name="temporaryAddress"
                value={formData.temporaryAddress}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={3}
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={handlePrev} className="bg-gray-600 text-white px-4 py-2 rounded">
                Back
              </button>
              <button type="button" onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#003893] mb-4">Step 3: Professional Details & Investment Intent</h2>
            <div className="mb-4">
              <label className="block mb-1">Occupation*</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Education Qualification*</label>
              <input
                type="text"
                name="educationQualification"
                value={formData.educationQualification}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Business/Work Experience in years*</label>
              <input
                type="text"
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={handlePrev} className="bg-gray-600 text-white px-4 py-2 rounded">
                Back
              </button>
              <button type="button" onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#003893] mb-4">Step 4: Share Count</h2>
            <div className="mb-4">
              <label className="block mb-1">Number of Shares to Purchase*</label>
              <input
                type="number"
                name="numberOfShares"
                value={formData.numberOfShares}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                (Each share costs 100 rupees. For 50 shares, deposit 5000 rupees.)
              </p>
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2 text-lg">
                  I confirm that the details provided are true and authentic.
                </span>
              </label>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={handlePrev} className="bg-gray-600 text-white px-4 py-2 rounded">
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </motion.div>
        )}
      </form>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-lg p-8 max-w-md mx-auto text-center shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#003893] mb-4">Application Submitted</h2>
            <p className="text-lg mb-6">
              Your application has been submitted successfully. We will email you for further instruction.
            </p>
            <button
              onClick={handlePopupOk}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              OK
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
