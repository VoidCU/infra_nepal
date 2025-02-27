"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Updated navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Our Portfolio", path: "/portfolio" },
    { name: "Our Team", path: "/team" },
    { name: "Commitment", path: "/commitment" },
    { name: "Opportunities", path: "/opportunities" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Main Header */}
      <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/images/logo.png" // Replace with your logo path
                alt="Infra Nepal Logo"
                width={160}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden my:flex space-x-8">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link key={index} href={item.path}>
                  <div
                    className={`relative text-lg font-medium group transition ${
                      isActive ? "text-blue-600" : "text-gray-800"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${
                        isActive
                          ? "w-full bg-blue-600"
                          : "w-0 group-hover:w-full bg-gray-800"
                      }`}
                    ></span>
                  </div>
                </Link>
              );
            })}
          </nav>
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="my:hidden focus:outline-none"
            aria-label="Open mobile menu"
          >
            <svg className="w-8 h-8 fill-current text-gray-800" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container max-w-6xl mx-auto px-6 pt-20">
          <div className="flex justify-end">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="focus:outline-none"
              aria-label="Close mobile menu"
            >
              <svg className="w-8 h-8 fill-current text-gray-800" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z"
                />
              </svg>
            </button>
          </div>
          <nav className="mt-10 flex flex-col space-y-6 text-center">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link key={index} href={item.path}>
                  <div
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-medium transition ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-800 hover:text-gray-600"
                    }`}
                  >
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
