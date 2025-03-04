import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#003893] to-[#00266c] text-white pt-10 z-10">
      {/* Top Section */}
      <div className="container max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/logo.png" // Replace with your logo path
                alt="Infra Nepal Logo"
                width={200}
                height={100}
                className="object-contain bg-white rounded-lg p-2"
                priority
              />
            </div>
          </Link>
          <p className="text-sm mt-4 md:text-left text-justify">
            Infra Nepal Development Fund is dedicated to fostering sustainable growth and innovation across Nepal by leveraging strategic investments across multiple sectors.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm text-center md:text-left">
            <li>
              <Link href="/">
                <div className="hover:underline">Home</div>
              </Link>
            </li>
            <li>
              <Link href="/portfolio">
                <div className="hover:underline">Our Portfolio</div>
              </Link>
            </li>
            <li>
              <Link href="/team">
                <div className="hover:underline">Our Team</div>
              </Link>
            </li>
            <li>
              <Link href="/commitment">
                <div className="hover:underline">Commitment</div>
              </Link>
            </li>
            <li>
              <Link href="/opportunities">
                <div className="hover:underline">Opportunities</div>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <div className="hover:underline">Contact</div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Stay Connected */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold mb-4">Stay Connected</h2>
          <p className="text-sm mb-4 text-center md:text-left">
            Follow us on social media for the latest updates.
          </p>
          <div className="flex space-x-4">
            <Link href="#">
              <div className="hover:text-gray-200 transition" aria-label="Facebook">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.407.595 24 1.325 24h11.338v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.814 0 1.475-.661 1.475-1.475V1.326C24 .594 23.406 0 22.675 0z"/>
                </svg>
              </div>
            </Link>
            <Link href="#">
              <div className="hover:text-gray-200 transition" aria-label="Twitter">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.723c-.95.555-2 .96-3.127 1.184a4.916 4.916 0 00-8.384 4.48A13.946 13.946 0 011.671 3.149a4.916 4.916 0 001.523 6.556 4.903 4.903 0 01-2.224-.616v.06a4.916 4.916 0 003.946 4.827 4.904 4.904 0 01-2.212.084 4.918 4.918 0 004.588 3.41A9.868 9.868 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.51 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z"/>
                </svg>
              </div>
            </Link>
            <Link href="#">
              <div className="hover:text-gray-200 transition" aria-label="LinkedIn">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.761 2.24 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.76-2.239-5-5-5zm-11.75 19h-2.5v-8.5h2.5v8.5zm-1.25-9.82c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5c.829 0 1.5.67 1.5 1.5s-.671 1.5-1.5 1.5zm11.75 9.82h-2.5v-4.5c0-1.07-.02-2.44-1.49-2.44-1.49 0-1.72 1.16-1.72 2.36v4.58h-2.5v-8.5h2.4v1.16h.03c.34-.64 1.17-1.31 2.41-1.31 2.58 0 3.06 1.7 3.06 3.91v4.74z"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#00266c] py-4">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs">
          <p className="mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Infra Nepal Development Fund. All rights reserved.
          </p>
          <p>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
