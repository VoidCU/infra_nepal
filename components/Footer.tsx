// components/Footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#003893] text-white pt-10">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About / Company Info */}
          <div>
          <Link href="/" className="flex items-center space-x-2 ">
            <Image
              src="/images/logo.png" // Update with your logo path
              alt="Infra Nepal Logo"
              width={300}
              height={150}
              priority
              className="object-contain bg-white rounded-lg p-2"
            />
          </Link>
            <p className="text-sm leading-relaxed">
              Infra Nepal Development Fund is a multinational investment fund dedicated to fostering sustainable growth and innovation within Nepal.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/initiatives" className="hover:underline">
                 Our Initiatives
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media (Example) */}
          <div>
            <h2 className="text-xl font-bold mb-3">Stay Connected</h2>
            <p className="text-sm mb-4">
              Follow us on social media for the latest updates.
            </p>
            <div className="flex space-x-4">
              {/* Replace # with your actual social links */}
              <Link
                href="#"
                aria-label="Facebook"
                className="hover:text-gray-200 transition"
              >
                {/* Example: Facebook Icon (SVG) */}
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.525 0H1.475C.661 0 0 .66 0 1.475v21.05C0 23.339.661 24 1.475 24h11.338v-9.294H9.847v-3.622h2.966V8.414c0-2.937 1.796-4.534 4.418-4.534 1.257 0 2.336.093 2.648.135v3.07h-1.818c-1.428 0-1.705.68-1.705 1.675v2.197h3.41l-.445 3.622h-2.965V24h5.808c.814 0 1.475-.661 1.475-1.475V1.475C24 .66 23.339 0 22.525 0z"/>
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="hover:text-gray-200 transition"
              >
                {/* Example: Twitter Icon (SVG) */}
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.723c-.95.555-2 .96-3.127 1.184a4.916 4.916 0 00-8.384 4.48A13.946 13.946 0 011.671 3.149a4.916 4.916 0 001.523 6.556 4.903 4.903 0 01-2.224-.616v.06a4.916 4.916 0 003.946 4.827 4.904 4.904 0 01-2.212.084 4.918 4.918 0 004.588 3.41A9.868 9.868 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.51 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z"/>
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="hover:text-gray-200 transition"
              >
                {/* Example: LinkedIn Icon (SVG) */}
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.761 2.24 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.76-2.239-5-5-5zm-11.75 19h-2.5v-8.5h2.5v8.5zm-1.25-9.82c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5c.829 0 1.5.67 1.5 1.5s-.671 1.5-1.5 1.5zm11.75 9.82h-2.5v-4.5c0-1.07-.02-2.44-1.49-2.44-1.49 0-1.72 1.16-1.72 2.36v4.58h-2.5v-8.5h2.4v1.16h.03c.34-.64 1.17-1.31 2.41-1.31 2.58 0 3.06 1.7 3.06 3.91v4.74z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#00266c] py-4">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Infra Nepal Development Fund. All rights reserved.
          </p>
          <p>
            {/* <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link> */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
