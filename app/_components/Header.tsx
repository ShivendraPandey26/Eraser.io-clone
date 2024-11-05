"use client"
import React, { useState, useRef, useEffect } from "react";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close the menu if clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a href="/" className="text-2xl font-semibold text-white">
          eraser.<span className="text-red-600">io</span>
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          {/* Desktop Navigation */}
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {["About", "Careers", "History", "Services", "Projects", "Blog"].map((item) => (
                <li key={item}>
                  <a className="text-gray-300 transition hover:text-gray-300/75" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                href="#"
              >
                Login
              </a>

              <a
                className="hidden rounded-md bg-gray-700 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:text-white sm:block"
                href="#"
              >
                Register
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="block rounded bg-gray-700 p-2.5 text-gray-300 transition hover:text-white md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-gray-800 p-4 absolute inset-x-0 top-16 z-50 transition transform duration-300 ease-in-out"
        >
          <ul className="flex flex-col items-center gap-4 text-sm">
            {["About", "Careers", "History", "Services", "Projects", "Blog"].map((item) => (
              <li key={item}>
                <a className="text-gray-300 transition hover:text-gray-300/75" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
