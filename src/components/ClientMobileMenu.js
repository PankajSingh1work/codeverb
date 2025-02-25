"use client"; // Mark as client-side component
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ClientMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change or when clicking outside
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    window.addEventListener("popstate", handleRouteChange);

    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest(".mobile-menu")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-[#E0E0E0] hover:text-[#F0F0F0] focus:outline-none focus:ring-2 focus:ring-[#F0F0F0] rounded"
        aria-label="Open mobile navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`fixed top-0 right-0 w-[75%] h-full bg-[#181818] backdrop-blur-md transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg p-6 flex flex-col space-y-6 md:hidden z-50 mobile-menu`}
        id="mobile-menu"
        role="dialog"
        aria-modal={isOpen}
        aria-hidden={!isOpen}
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex justify-between items-center">
          <h2 id="mobile-menu-title" className="text-[#E0E0E0] text-lg font-semibold sr-only">
            Mobile Navigation Menu
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#E0E0E0] hover:text-[#F0F0F0] focus:outline-none focus:ring-2 focus:ring-[#F0F0F0] rounded"
            aria-label="Close mobile navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col space-y-6" aria-label="Mobile Navigation">
          <Link
            href="/#home"
            className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base focus:outline-none rounded"
            onClick={() => setIsOpen(false)}
            prefetch={true} // Enable prefetching for faster navigation
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base focus:outline-none rounded"
            onClick={() => setIsOpen(false)}
            prefetch={true}
          >
            About Me
          </Link>
          <Link
            href="/#services"
            className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base focus:outline-none rounded"
            onClick={() => setIsOpen(false)}
            prefetch={true}
          >
            Services
          </Link>
          <Link
            href="/#projects"
            className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base focus:outline-none rounded"
            onClick={() => setIsOpen(false)}
            prefetch={true}
          >
            Projects
          </Link>
          <Link
            href="/#achievements"
            className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base focus:outline-none rounded"
            onClick={() => setIsOpen(false)}
            prefetch={true}
          >
            Achievements
          </Link>
          <Link
            href="/#contact"
            className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base focus:outline-none rounded"
            onClick={() => setIsOpen(false)}
            prefetch={true}
          >
            Contact Me
          </Link>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}