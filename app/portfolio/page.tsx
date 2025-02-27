"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative h-64 md:h-80 w-full"
      >
        <Image
          src="/images/nepal-projects.jpg" // Replace with your hero image path
          alt="Our Portfolio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl text-white font-bold drop-shadow-lg text-center">
            Our Portfolio
          </h1>
        </div>
      </motion.section>

      {/* Core Investment Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container max-w-6xl mx-auto px-4 py-16"
      >
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify">
          At Nepal Development Fund, hydropower is at the core of our investment strategy. Our current projects include the 28.1 MW Upper Kabeli Hydropower Project in Taplejung, Nepal, registered under Peace Energy Pvt. Ltd. This project is owned, executed, and managed primarily by the Nepali diaspora living in the USA.
        </p>
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-justify">
          Our senior leadership consists of entrepreneurs, technical experts, and finance professionals. We are currently qualifying several hydro projects ranging from 55 MW to 600 MW. Our senior leadership team is composed of a diverse group of individuals, bringing together a unique blend of skills and expertise. This includes seasoned entrepreneurs with a proven track record of building successful businesses, technical experts with deep knowledge and experience in the relevant fields, and finance professionals who possess a strong understanding of financial markets and investment strategies.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-justify">
          Leveraging our combined expertise, we are actively engaged in the due diligence process for a portfolio of hydropower projects. These projects vary significantly in scale, encompassing capacities ranging from 55 MW to 600 MW. Our evaluation process is comprehensive and meticulous, ensuring that we select projects that align with our strategic objectives and offer the potential for attractive returns.
        </p>
      </motion.section>

      {/* Why Hydropower Matters Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container max-w-6xl mx-auto px-4 py-16 bg-gray-50 rounded-lg shadow-md"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-6">
          Why Hydropower Matters
        </h2>
        <p className="text-lg md:text-xl leading-relaxed mb-4 text-justify">
          Nepal possesses an enormous hydropower potential, estimated at over 83,000 MW. Yet only a small fraction of this potential has been harnessed so far. By investing in state-of-the-art hydropower projects, we aim to not only generate sustainable energy but also drive socio-economic growth by creating jobs, reducing reliance on fossil fuels, and modernizing the power grid.
        </p>
        <ul className="list-disc pl-8 text-lg md:text-xl leading-relaxed">
          <li>
            <strong>Energy Security:</strong> Diversifying Nepal's energy mix and ensuring a stable supply of clean energy.
          </li>
          <li>
            <strong>Economic Growth:</strong> Boosting local economies by generating employment and stimulating industrial development.
          </li>
          <li>
            <strong>Environmental Impact:</strong> Reducing carbon emissions and promoting eco-friendly energy solutions.
          </li>
        </ul>
      </motion.section>

      {/* Future Prospects Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container max-w-6xl mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-6">
          Future Prospects
        </h2>
        <p className="text-lg md:text-xl leading-relaxed mb-4 text-justify">
          Our portfolio is continuously evolving. Beyond our current hydropower investments, we are actively exploring opportunities in infrastructure, tourism, and agriculture. We believe that a diversified investment approach will not only drive sustainable growth in Nepal but also position us as a leading player in the region’s development.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-justify">
          With a focus on innovation, efficiency, and community empowerment, our future projects aim to transform the energy landscape, support national development goals, and generate significant long-term returns for our investors.
        </p>
      </motion.section>
    </div>
  );
}
