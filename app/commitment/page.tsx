"use client";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function CommitmentPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gray-50 py-16"
      >
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#003893]">
            Commitment to Investors
          </h1>
        </div>
      </motion.section>

      {/* Content Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container max-w-6xl mx-auto px-4 py-16"
      >
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify">
          At INDF, our investors are our top priority. We uphold the highest standards
          of transparency, accountability, and ethical management—principles that are essential
          to building lasting trust with our stakeholders. We believe that open communication and
          proactive engagement are the cornerstones of a successful investment relationship.
        </p>
        <ul className="list-disc pl-8 text-lg md:text-xl leading-relaxed mb-6 text-justify">
          <li className="pb-2">
            <strong>Transparent Financial Reporting:</strong> We are committed to providing clear,
            accurate, and timely financial information. Our financial reports adhere to generally accepted
            accounting principles and undergo rigorous internal and external audits to ensure utmost accuracy.
          </li>
          <li className="pb-2">
            <strong>Regular Project Updates:</strong> We understand the importance of staying informed.
            Our investors receive comprehensive updates detailing project milestones, emerging risks,
            and new opportunities, keeping you confident about the progress of your investments.
          </li>
          <li className="pb-2">
            <strong>Performance Metrics:</strong> We meticulously track key performance indicators—including
            financial performance, operational efficiency, and environmental and social impact—to ensure
            our investments deliver measurable and sustainable results.
          </li>
          <li>
            <strong>Experienced Professionals:</strong> Our dedicated team of experts in investment management,
            financial analysis, and project development ensures that every investment is thoroughly evaluated,
            well-managed, and aligned with our long-term vision.
          </li>
        </ul>
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify">
          In addition to these core practices, we are committed to continuous improvement and proactive investor
          engagement. Regular webinars, investor meetings, and Q&A sessions foster an environment of open dialogue,
          ensuring that our investors are always well-informed and confident in our approach.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-justify">
          By adopting these comprehensive practices, we create a culture of trust and collaboration that ultimately
          leads to superior investment outcomes and a robust, sustainable business model. Our unwavering commitment
          to excellence and integrity ensures that every investment is managed with the highest level of care and professionalism.
        </p>
      </motion.section>
    </div>
  );
}
