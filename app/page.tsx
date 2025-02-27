"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative h-[100vh] bg-[url('/images/nepal-hero.jpg')] bg-cover bg-center flex items-center justify-center"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#003893] bg-opacity-80"></div>
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Investing in Nepal's Future
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed drop-shadow-md">
            Infra Nepal Development Fund is a multinational investment fund dedicated to fostering sustainable growth and innovation within Nepal.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#DC143C] hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-shadow shadow-lg hover:shadow-xl"
          >
            Join Us
          </Link>
        </div>
      </motion.section>

      {/* Investment Strategy Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 bg-white max-w-4xl mx-auto"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-6">
            Our Investment Strategy
          </h2>
          <p className="text-lg md:text-xl mb-8">
            We are establishing a fund to foster economic growth and development within Nepal, sourcing capital from:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg md:text-xl">
            <li>
              Nepali diaspora and friends of Nepal residing overseas (<strong>Foreign Direct Investment</strong>)
            </li>
            <li>
              Small investors from within Nepal (<strong>Domestic Source of Investment</strong>)
            </li>
          </ul>
          <p className="text-lg md:text-xl mt-6">
            By leveraging both international and domestic investment, we create a diversified and sustainable funding base to support projects in renewable energy, infrastructure, tourism, and agriculture.
          </p>
        </div>
      </motion.section>

      {/* Our Impact Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 bg-[#003893] text-white"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#003893] bg-opacity-80 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="font-bold text-2xl mb-2">Economic Growth</h3>
              <p className="text-lg">
                Creating jobs and fostering long-term prosperity through strategic investments.
              </p>
            </div>
            <div className="p-6 bg-[#003893] bg-opacity-80 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="font-bold text-2xl mb-2">Infrastructure</h3>
              <p className="text-lg">
                Upgrading critical networks, roads, and connectivity to drive sustainable development.
              </p>
            </div>
            <div className="p-6 bg-[#003893] bg-opacity-80 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="font-bold text-2xl mb-2">Sustainability</h3>
              <p className="text-lg">
                Promoting renewable energy and eco-friendly practices for a greener future.
              </p>
            </div>
            <div className="p-6 bg-[#003893] bg-opacity-80 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="font-bold text-2xl mb-2">Empowerment</h3>
              <p className="text-lg">
                Empowering local communities and fostering social development through targeted investments.
              </p>
            </div>
            <div className="p-6 bg-[#003893] bg-opacity-80 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="font-bold text-2xl mb-2">Investment</h3>
              <p className="text-lg">
                Attracting foreign and domestic investment to drive growth and innovation in Nepal.
              </p>
            </div>
            <div className="p-6 bg-[#003893] bg-opacity-80 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="font-bold text-2xl mb-2">Overall Development</h3>
              <p className="text-lg">
                Contributing to Nepal’s long-term development goals through strategic investments.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Commitment Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 bg-white text-black"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative w-full h-64 md:h-96 order-2 md:order-1">
              <Image
                src="/images/commitment.png"
                alt="Infra Nepal Team"
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Commitment
              </h2>
              <p className="text-lg md:text-xl mb-6">
                Transparency, accountability, and community empowerment drive our mission. Our experienced team rigorously vets every project to ensure alignment with Nepal’s long-term development goals.
              </p>
              <Link
                href="/team"
                className="inline-block bg-[#DC143C] text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition-shadow shadow-lg hover:shadow-xl"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 bg-[#DC143C] text-white text-center"
      >
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Invest?</h2>
          <p className="text-lg md:text-xl mb-8">
            Join us in shaping Nepal’s future by contributing to sustainable projects that benefit both local communities and global stakeholders.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#DC143C] font-semibold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-shadow shadow-lg hover:shadow-xl"
          >
            Contact Us
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
