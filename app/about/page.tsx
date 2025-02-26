"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const fadeDownVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };
export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section
        variants={fadeDownVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative h-80 w-full"
      >
        <Image
          src="/images/about-hero.jpg" // Replace with your hero image path
          alt="About Infra Nepal"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold drop-shadow-xl text-center px-4">
            Investing in Nepal&apos;s Future
          </h1>
        </div>
      </motion.section>

      {/* Introductory Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container max-w-6xl mx-auto px-4 py-16"
      >
        <p className="text-lg leading-relaxed mb-6 text-justify">
          Infra Nepal Development Fund is a multinational investment fund dedicated to fostering sustainable growth and innovation within Nepal. We operate as an investment platform that strategically sources capital from both individual and institutional investors, as well as project developers, to deploy funds into high-impact opportunities. These investments are targeted towards projects that stimulate economic development and generate lasting value in Nepal.
        </p>
      </motion.section>

      {/* Investment Strategy Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gray-50 py-16"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-6">
            Our Investment Strategy
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Infra Nepal Development is establishing a fund to foster economic growth and development within Nepal. This fund will be sourced from two primary groups:
          </p>
          <ul className="list-disc pl-8 text-lg leading-relaxed mb-4">
            <li>
              <strong>Nepali diaspora and friends of Nepal residing overseas</strong>: This group will contribute through Foreign Direct Investment (FDI).
            </li>
            <li>
              <strong>Small investors from within Nepal</strong>: This group will provide a domestic source of investment.
            </li>
          </ul>
          <p className="text-lg leading-relaxed text-justify">
            By leveraging both international and domestic investment, Infra Nepal Development aims to create a diversified and sustainable funding base to support a range of development projects across the country. This strategy ensures that our investments are aligned with the interests and aspirations of the Nepali people. Our Greenfield investment focus is centered on sectors that are vital for economic growth and national development. These sectors may include:
          </p>
          <ul className="list-disc pl-8 text-lg leading-relaxed mt-4">
            <li>
              <strong>Renewable Energy</strong>: Developing clean energy sources like hydropower to meet Nepal&apos;s and regional energy demands, reduce reliance on fossil fuels, and modernize the power grid through public–private partnerships.
            </li>
            <li>
              <strong>Infrastructure</strong>: Building and upgrading critical infrastructure such as roads, bridges, airports, and telecommunications networks to enhance connectivity and facilitate economic activity.
            </li>
            <li>
              <strong>Tourism</strong>: Promoting sustainable tourism practices and investing in tourism infrastructure to showcase Nepal&apos;s natural beauty and cultural heritage while generating employment and revenue.
            </li>
            <li>
              <strong>Agriculture</strong>: Modernizing agricultural practices, supporting value chain development, and promoting agro-processing industries to enhance productivity and improve rural livelihoods.
            </li>
          </ul>
        </div>
      </motion.section>

      {/* Impact Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container max-w-6xl mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-6">
          Our Impact
        </h2>
        <ul className="list-disc pl-8 text-lg leading-relaxed">
          <li>Stimulate economic growth and job creation.</li>
          <li>Enhance infrastructure and connectivity.</li>
          <li>Promote sustainable development practices.</li>
          <li>Empower local communities and businesses.</li>
          <li>Attract additional foreign investment.</li>
          <li>Contribute to Nepal&apos;s overall development goals.</li>
        </ul>
      </motion.section>

      {/* Portfolio Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gray-50 py-16"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-6">
            Our Portfolio
          </h2>
          <p className="text-lg leading-relaxed mb-4 text-justify">
            At Nepal Development Fund, hydropower is at the core of our investment strategy. Our current projects include the 28.1 MW Upper Kabeli Hydropower Project in Taplejung, Nepal, registered under Peace Energy Pvt. Ltd. This project is owned, executed, and managed primarily by the Nepali diaspora living in the USA.
          </p>
          <p className="text-lg leading-relaxed text-justify">
            Our senior leadership consists of entrepreneurs, technical experts, and finance professionals. We are currently qualifying several hydro projects ranging from 55 MW to 600 MW. Leveraging our combined expertise, we are actively engaged in the due diligence process for a diverse portfolio of hydropower projects, ensuring each aligns with our strategic objectives.
          </p>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container max-w-6xl mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-6">
          Our Team
        </h2>
        <p className="text-lg leading-relaxed">
          Our team boasts a diverse range of seasoned professionals, including business leaders with a keen eye for market trends and strategic planning, financial advisors well-versed in investment strategies and risk management, and senior engineers and project managers with extensive experience in designing and managing large-scale infrastructure projects.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Additionally, we have assembled a specialized team of hydrologists, geologists, and tunnel engineers—each bringing 15 to 35 years of expertise—to ensure that our projects are executed with precision and excellence.
        </p>
      </motion.section>

      {/* Commitment to Investors Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gray-50 py-16"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-6">
            Commitment to Investors
          </h2>
          <p className="text-lg leading-relaxed mb-4 text-justify">
            At INDF, we prioritize our investors and uphold the highest standards of transparency and accountability. We firmly believe that open communication and responsible management are essential for building strong, lasting relationships.
          </p>
          <ul className="list-disc pl-8 text-lg leading-relaxed mb-4">
            <li>
              <strong>Transparent Financial Reporting:</strong> We provide clear, accurate, and timely financial information, adhering to generally accepted accounting principles and subjected to rigorous audits.
            </li>
            <li>
              <strong>Regular Project Updates:</strong> Our investors receive detailed updates on project milestones, risks, and opportunities.
            </li>
            <li>
              <strong>Performance Metrics:</strong> We track financial performance, operational efficiency, and environmental and social impact.
            </li>
            <li>
              <strong>Experienced Professionals:</strong> Our dedicated team ensures every investment is carefully assessed, well-managed, and aligned with our long-term vision.
            </li>
          </ul>
          <p className="text-lg leading-relaxed">
            By adopting these practices, we foster a culture of trust and collaboration that ultimately leads to better investment outcomes and a more sustainable business model.
          </p>
        </div>
      </motion.section>

      {/* Opportunities Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container max-w-6xl mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-6">
          Opportunities
        </h2>
        <p className="text-lg leading-relaxed text-justify">
          Nepal&apos;s hydropower and infrastructure sectors offer immense growth potential, driven by rising domestic and regional energy demands. Urbanization will spur demand for infrastructure such as roads, bridges, and transportation systems—delivering consistent, long-term returns through scaled-up investments.
        </p>
        <p className="text-lg leading-relaxed mt-4 text-justify">
          Our PPP model leverages partnerships with the Nepalese government and local businesses to accelerate infrastructure development. Nepal&apos;s stable, experienced, and committed workforce further positions us to capitalize on opportunities, paving the way for sustainable growth, increased profitability, and positive social and environmental impact.
        </p>
      </motion.section>
    </div>
  );
}
