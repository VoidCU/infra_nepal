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

  // Initial form state covering the three steps
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
    dematId: "",
    numberOfShares: ""
  });


  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res: Response = await fetch("/api/applications/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data: { error?: string } = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Submission failed.");
      } else {
        alert("Application submitted successfully. Please wait for admin processing.");
        router.push("/");
      }
    } catch (error) {
      setErrorMsg(`Something went wrong, please try again. error: ${error}`);
    }
  };

  return (
    <div className="pt-20 max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Apply for Share Purchase</h1>
      {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Step 1: Basic Information</h2>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} className="border p-2 mb-2 w-full" />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="text" name="citizenshipNo" placeholder="Citizenship Number" value={formData.citizenshipNo} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="date" name="citizenshipIssueDate" placeholder="Citizenship Issue Date" value={formData.citizenshipIssueDate} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <div className="flex justify-end">
              <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Next</button>
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
            <h2 className="text-2xl font-bold mb-4">Step 2: Family & Address Details</h2>
            <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="text" name="grandfatherName" placeholder="Grandfather's Name" value={formData.grandfatherName} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="text" name="spouseName" placeholder="Spouse's Name" value={formData.spouseName} onChange={handleChange} className="border p-2 mb-2 w-full" />
            <input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="text" name="municipality" placeholder="Municipality" value={formData.municipality} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="text" name="wardNo" placeholder="Ward No" value={formData.wardNo} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <textarea name="temporaryAddress" placeholder="Temporary Address" value={formData.temporaryAddress} onChange={handleChange} className="border p-2 mb-2 w-full" rows={3} />
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
              <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
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
            <h2 className="text-2xl font-bold mb-4">Step 3: Professional Details & Investment Intent</h2>
            <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="text" name="educationQualification" placeholder="Education Qualification" value={formData.educationQualification} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="text" name="workExperience" placeholder="Work Experience (years)" value={formData.workExperience} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <input type="text" name="dematId" placeholder="Demat ID (if applicable)" value={formData.dematId} onChange={handleChange} className="border p-2 mb-2 w-full" />
            <input type="number" name="numberOfShares" placeholder="Number of Shares" value={formData.numberOfShares} onChange={handleChange} required className="border p-2 mb-2 w-full" />
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Application</button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
