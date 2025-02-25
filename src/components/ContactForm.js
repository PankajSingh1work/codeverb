"use client";

import { useState, useEffect } from "react";

export default function ContactForm({ contactData }) {
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form status after timeout
  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => setFormStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    formData.append("access_key", "d7cd00d8-81a4-4d62-853c-50d706c8a2c9");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        e.target.reset();
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-[#1E1E1E] p-6 sm:p-8 rounded-lg shadow-md grid grid-cols-1 gap-6"
        aria-label="Contact Pankaj Singh"
        method="POST"
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-[#E0E0E0] text-sm sm:text-base md:text-lg font-semibold"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              className="bg-[#292929] text-[#E0E0E0] text-sm md:text-base w-full px-4 py-2 border border-[#444444] rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#555555] focus:border-transparent"
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-[#E0E0E0] text-sm sm:text-base md:text-lg font-semibold"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              className="bg-[#292929] text-[#E0E0E0] text-sm md:text-base w-full px-4 py-2 border border-[#444444] rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#555555] focus:border-transparent"
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-[#E0E0E0] text-sm sm:text-base md:text-lg font-semibold"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            autoComplete="off"
            className="bg-[#292929] text-[#E0E0E0] text-sm md:text-base w-full px-4 py-2 border border-[#444444] rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#555555] focus:border-transparent"
            disabled={isSubmitting}
            aria-required="true"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-[#E0E0E0] text-sm sm:text-base md:text-lg font-semibold"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            autoComplete="off"
            className="bg-[#292929] text-[#E0E0E0] text-sm md:text-base w-full px-4 py-2 border border-[#444444] rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#555555] focus:border-transparent resize-y"
            disabled={isSubmitting}
            aria-required="true"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={`relative bg-[#222222] text-[#E0E0E0] text-sm md:text-base py-2 px-6 rounded-lg transition duration-300 inline-flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F0F0F0] overflow-hidden ${
              isSubmitting
                ? "cursor-not-allowed bg-[#333333]"
                : "hover:bg-[#333333] animate-pulse-hover"
            }`}
            disabled={isSubmitting}
            aria-label={isSubmitting ? "Sending Message" : "Send Message"}
          >
            <span className="relative z-10">
              {isSubmitting ? "Sending..." : "Send Message"}
            </span>
            {!isSubmitting && (
              <i
                className="fa-solid fa-paper-plane text-sm relative z-10"
                aria-hidden="true"
              ></i>
            )}
            {/* Animation overlay */}
            {!isSubmitting && (
              <span className="absolute inset-0 bg-[#444444] opacity-0 hover:opacity-30 transition-opacity duration-300 transform -skew-x-12"></span>
            )}
          </button>
        </div>
      </form>

      {formStatus === "success" && (
        <div
          className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg animate-fade-in"
          role="alert"
          aria-live="polite"
        >
          Message sent successfully!
        </div>
      )}
      {formStatus === "error" && (
        <div
          className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg animate-fade-in"
          role="alert"
          aria-live="polite"
        >
          Failed to send message. Please try again.
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-hover {
          0% {
            box-shadow: 0 0 0 0 rgba(240, 240, 240, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(240, 240, 240, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(240, 240, 240, 0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
        .animate-pulse-hover:hover {
          animation: pulse-hover 1.5s infinite;
        }
      `}</style>
    </>
  );
}