"use client";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function TeamPage() {
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
            Our Team
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
          Our team boasts a diverse range of seasoned professionals, including business leaders with a keen eye for market trends and strategic planning, financial advisors well-versed in investment strategies and risk management, and senior engineers and project managers with extensive experience in designing and managing large-scale infrastructure projects.
        </p>
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify">
          Furthermore, we have assembled a specialized team of hydrologists who understand the complexities of water systems and their interaction with the environment, geologists who can assess the subsurface conditions and potential risks for any project, and tunnel engineers who are experts in the design and construction of underground structures.
        </p>
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify">
          Each of these professionals brings 15 to 35 years of experience to the table, representing the pinnacle of expertise in their respective fields. We have made a concerted effort to recruit the most qualified and accomplished individuals, ensuring that our clients receive the highest level of service and support.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-justify">
          Our team is our most valuable asset, and their combined experience and dedication drive the success of our projects and the continued growth of Infra Nepal Development Fund.
        </p>
      </motion.section>
    </div>
  );
}
