"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";


// Variants for Framer Motion animations
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};


export default function InitiativesPage() {
  const [selectedInitiative, setSelectedInitiative] = useState<typeof initiatives[0] | null>(null);

  interface Initiative {
    id: number;
    name: string;
    description: string;
    image: string;
  }

  const initiatives: Initiative[] = [
    {
      id: 1,
      name: "Upper Kabeli Hydropower Initiative",
      description:
        "A 28.1 MW hydropower initiative in Taplejung developed by Peace Energy Pvt. Ltd. This project, managed primarily by the Nepali diaspora, demonstrates our commitment to sustainable energy.",
      image: "/images/upper-kabeli.jpg", // Replace with your actual image path
    },
    {
      id: 2,
      name: "National Infrastructure Enhancement",
      description:
        "Investments in the construction and modernization of critical infrastructure—including roads, bridges, airports, and telecommunications networks—to boost economic growth across Nepal.",
      image: "/images/infrastructure.jpg", // Replace with your actual image path
    },
    {
      id: 3,
      name: "Sustainable Tourism Initiative",
      description:
        "Focused on promoting eco-friendly tourism, this initiative develops sustainable tourism infrastructure that highlights Nepal's natural beauty and cultural heritage.",
      image: "/images/tourism.jpg", // Replace with your actual image path
    },
    {
      id: 4,
      name: "Rural Agriculture Modernization",
      description:
        "Modernizing agricultural practices and establishing agro-processing hubs to enhance productivity and improve rural livelihoods for sustainable development.",
      image: "/images/agriculture.jpg", // Replace with your actual image path
    },
    {
      id: 5,
      name: "Urban Renewal Initiative",
      description:
        "Revitalizing urban centers through modern infrastructure projects that improve connectivity and foster economic growth.",
      image: "/images/urban-renewal.jpg", // Replace with your actual image path
    },
  ];

  const openModal = (initiative: Initiative) => {
    setSelectedInitiative(initiative);
  };

  const closeModal = () => {
    setSelectedInitiative(null);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 w-full">
        
        <Image
          src="/images/initiatives-hero.jpg" // Replace with your hero image URL
          alt="Our Initiatives Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl text-white font-bold drop-shadow-lg text-center">
            Our Initiatives
          </h1>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="container max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003893] mb-8 text-center">
          Our Pipeline of Initiatives
        </h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((initiative) => (
            <motion.div
              key={initiative.id}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => openModal(initiative)}
            >
              <div className="relative h-48">
                <Image
                  src={initiative.image}
                  alt={initiative.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {initiative.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {initiative.description}
                </p>
                <button className="text-blue-600 hover:underline">
                  Read More &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal Popup */}
      {selectedInitiative && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-lg p-6 max-w-lg mx-4 z-10"
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="relative h-64 mb-4">
              <Image
                src={selectedInitiative.image}
                alt={selectedInitiative.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#003893] mb-2">
              {selectedInitiative.name}
            </h2>
            <p className="text-gray-700">{selectedInitiative.description}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
