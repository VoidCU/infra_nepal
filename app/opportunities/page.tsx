"use client";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function OpportunitiesPage() {
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
            Opportunities
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
          Nepal&apos;s hydropower and infrastructure sectors offer immense growth potential, with continuous investment opportunities arising from the need for large hydropower projects to meet rising domestic and regional energy demands. Urbanization will drive demand for infrastructure such as roads, bridges, and transportation systems delivering consistent, long-term returns through scaled-up investment.
        </p>
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify">
          Our PPP model leverages partnerships with the Nepalese government and local businesses to accelerate infrastructure development. Nepal&apos;s stable, experienced, and committed workforce further positions us to capitalize on these opportunities, paving the way for sustainable growth, increased profitability, and positive social and environmental impact.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-justify">
          With forward-looking policies, innovative financing, and a collaborative development approach, Infra Nepal is uniquely positioned to harness these opportunities. This strategic pathway not only drives economic progress but also creates long-lasting social benefits for communities throughout the region.
        </p>
      </motion.section>
    </div>
  );
}
