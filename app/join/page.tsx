"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function PromoterShareApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    // Step 2: Basic Information
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    citizenshipNo: "",
    citizenshipIssueDate: "",
    // Step 3: Family & Address Details
    fatherName: "",
    grandfatherName: "",
    spouseName: "",
    province: "",
    district: "",
    municipality: "",
    wardNo: "",
    temporaryAddress: "",
    // Step 4: Professional Details
    occupation: "",
    educationQualification: "",
    workExperience: "",
    // Step 5: Investment Details
    dematId: "",
    numberOfShares: "",
    paymentMethod: "",
    // Step 6: Contact Person Details
    contactPersonName: "",
    relationship: "",
    contactPersonPhone: "",
    // Step 7: Document Uploads (files)
    paymentReceipt: null,
    passportPhoto: null,
    citizenshipDoc: null,
    signImage: null,
    // Agreement checkbox
    agreeToTerms: false,
  });

  const [preview, setPreview] = useState({
    paymentReceipt: "",
    passportPhoto: "",
    citizenshipDoc: "",
    signImage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const files = (e.target as HTMLInputElement).files;
    if (type === "file") {
      const file = files ? files[0] : null;
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (file) {
        setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Instead of alert, show a success popup
    setShowSuccessPopup(true);
  };

  const handlePopupOk = () => {
    // Reset form data
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      email: "",
      phone: "",
      citizenshipNo: "",
      citizenshipIssueDate: "",
      fatherName: "",
      grandfatherName: "",
      spouseName: "",
      province: "",
      district: "",
      municipality: "",
      wardNo: "",
      temporaryAddress: "",
      occupation: "",
      educationQualification: "",
      workExperience: "",
      dematId: "",
      numberOfShares: "",
      paymentMethod: "",
      contactPersonName: "",
      relationship: "",
      contactPersonPhone: "",
      paymentReceipt: null,
      passportPhoto: null,
      citizenshipDoc: null,
      signImage: null,
      agreeToTerms: false,
    });
    setPreview({
      paymentReceipt: "",
      passportPhoto: "",
      citizenshipDoc: "",
      signImage: "",
    });
    setStep(1);
    setShowSuccessPopup(false);
    router.push("/join");
  };

  return (
    <div className="pt-20 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Promoter Share Application Form
      </h1>

      {/* Step 1: Payment Instructions */}
      {step === 1 && (
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
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
            After completing your payment, click &quot;Next&quot; to proceed with the
            application.
          </p>
          <div className="flex justify-end">
            <button
              onClick={nextStep}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Basic Information */}
      {step === 2 && (
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            nextStep();
          }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-[#003893] mb-4">
            Step 2: Basic Information
          </h2>
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
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </motion.form>
      )}

      {/* Step 3: Family & Address Details */}
      {step === 3 && (
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            nextStep();
          }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-[#003893] mb-4">
            Step 3: Family & Address Details
          </h2>
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
          <label className=" block">Permanent Address</label>
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
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </motion.form>
      )}

      {/* Step 4: Professional Details */}
      {step === 4 && (
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            nextStep();
          }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-[#003893] mb-4">
            Step 4: Professional Details
          </h2>
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
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </motion.form>
      )}

      {/* Step 5: Investment Details */}
      {step === 5 && (
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            nextStep();
          }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-[#003893] mb-4">
            Step 5: Investment Details
          </h2>
          <div className="mb-4">
            <label className="block mb-1">Demat ID*</label>
            <input
              type="text"
              name="dematId"
              value={formData.dematId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
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
            <label className="block mb-1">Payment Method Used*</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select</option>
              <option value="bank">Bank Transfer</option>
              <option value="cheque">Cheque</option>
              <option value="online">Online Transfer</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </motion.form>
      )}

      {/* Step 6: Contact Person Details */}
      {step === 6 && (
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            nextStep();
          }}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-[#003893] mb-4">
            Step 6: Contact Person Details
          </h2>
          <div className="mb-4">
            <label className="block mb-1">Contact Person Name*</label>
            <input
              type="text"
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Relationship*</label>
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Contact Person Phone*</label>
            <input
              type="tel"
              name="contactPersonPhone"
              value={formData.contactPersonPhone}
              onChange={handleChange}
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
        </motion.form>
      )}

      {/* Step 7: Document Uploads & Agreement */}
      {step === 7 && (
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-[#003893] mb-4">
            Step 7: Upload Documents & Agreement
          </h2>
          <div className="grid gap-4 mb-4">
            <div>
              <label className="block mb-1">Payment Receipt Photo*</label>
              <input
                type="file"
                name="paymentReceipt"
                onChange={handleChange}
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
                onChange={handleChange}
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
              <label className="block mb-1">Citizenship or Passport Copy*</label>
              <input
                type="file"
                name="citizenshipDoc"
                onChange={handleChange}
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
                onChange={handleChange}
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
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Submit Application
            </button>
          </div>
        </motion.form>
      )}

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
              Your application has been submitted successfully. We will email you a payment receipt voucher after confirming that the amount has been deposited in Bank.
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
