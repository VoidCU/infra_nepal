"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const fadeDownVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };
export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section
        variants={fadeDownVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative h-64 md:h-80 w-full"
      >
        <Image
          src="/images/contact-hero.jpg" // Replace with your actual hero image for the contact page
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl text-white font-bold drop-shadow-lg">
            Contact Us
          </h1>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Get in Touch
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Your Message"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#003893] text-white py-2 rounded hover:bg-[#00266c] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.section>

      {/* Additional Contact Information Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Contact Information
          </h2>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              <strong>Address:</strong> 1234 Example Street, Kathmandu, Nepal
            </p>
            <p>
              <strong>Phone:</strong> +977 1 2345678
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@infranepal.com"
                className="text-blue-600 hover:underline"
              >
                info@infranepal.com
              </a>
            </p>
            <div className="flex space-x-4 justify-center">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition"
                aria-label="Facebook"
              >
                {/* Facebook Icon */}
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.407.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.814 0 1.475-.661 1.475-1.475V1.326C24 .594 23.406 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition"
                aria-label="Twitter"
              >
                {/* Twitter Icon */}
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.723c-.95.555-2 .96-3.127 1.184a4.916 4.916 0 00-8.384 4.48A13.946 13.946 0 011.671 3.149a4.916 4.916 0 001.523 6.556 4.903 4.903 0 01-2.224-.616v.06a4.916 4.916 0 003.946 4.827 4.904 4.904 0 01-2.212.084 4.918 4.918 0 004.588 3.41A9.868 9.868 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.51 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition"
                aria-label="LinkedIn"
              >
                {/* LinkedIn Icon */}
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.761 2.24 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.76-2.239-5-5-5zm-11.75 19h-2.5v-8.5h2.5v8.5zm-1.25-9.82c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5c.829 0 1.5.67 1.5 1.5s-.671 1.5-1.5 1.5zm11.75 9.82h-2.5v-4.5c0-1.07-.02-2.44-1.49-2.44-1.49 0-1.72 1.16-1.72 2.36v4.58h-2.5v-8.5h2.4v1.16h.03c.34-.64 1.17-1.31 2.41-1.31 2.58 0 3.06 1.7 3.06 3.91v4.74z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
