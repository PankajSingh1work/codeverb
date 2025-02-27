"use client";

import { useState, useEffect } from "react";

export default function ContactForm({ contactData }) {
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({}); // Track validation errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  }); // Controlled form inputs

  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => setFormStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  // Handle input changes and update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setIsSubmitting(true);
    const formSubmissionData = new FormData();
    formSubmissionData.append("name", formData.name);
    formSubmissionData.append("email", formData.email);
    formSubmissionData.append("subject", formData.subject);
    formSubmissionData.append("message", formData.message);
    formSubmissionData.append("access_key", "d7cd00d8-81a4-4d62-853c-50d706c8a2c9");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formSubmissionData,
      });
      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
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
            <label htmlFor="name" className="block text-[#E0E0E0] text-sm sm:text-base md:text-lg font-semibold">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className={`bg-[#292929] text-[#E0E0E0] text-sm md:text-base w-full px-4 py-2 border border-[#444444] rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] focus:border-transparent disabled:opacity-50 ${
                formErrors.name ? "border-[#DC2626]" : ""
              }`}
              disabled={isSubmitting}
              aria-required="true"
              aria-describedby={formErrors.name ? "name-error" : undefined}
            />
            {formErrors.name && (
              <p id="name-error" className="text-[#DC2626] text-xs mt-1">
                {formErrors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-[#E0E0E0] text-sm sm:text-base md:text-lg font-semibold">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={`bg-[#292929] text-[#E0E0E0] text-sm md:text-base w-full px-4 py-2 border border-[#444444] rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] focus:border-transparent disabled:opacity-50 ${
                formErrors.email ? "border-[#DC2626]" : ""
              }`}
              disabled={isSubmitting}
              aria-required="true"
              aria-describedby={formErrors.email ? "email-error" : undefined}
            />
            {formErrors.email && (
              <p id="email-error" className="text-[#DC2626] text-xs mt-1">
                {formErrors.email}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-[#E0E0E0] text-sm sm:text-base md:text-lg font-semibold">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            autoComplete="off"
            className={`bg-[#292929] text-[#E0E0E0] text-sm md:text-base w-full px-4 py-2 border border-[#444444] rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] focus:border-transparent disabled:opacity-50 ${
              formErrors.subject ? "border-[#DC2626]" : ""
            }`}
            disabled={isSubmitting}
            aria-required="true"
            aria-describedby={formErrors.subject ? "subject-error" : undefined}
          />
          {formErrors.subject && (
            <p id="subject-error" className="text-[#DC2626] text-xs mt-1">
              {formErrors.subject}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="block text-[#E0E0E0] text-sm sm:text-base md:text-lg font-semibold">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            autoComplete="off"
            className={`bg-[#292929] text-[#E0E0E0] text-sm md:text-base w-full px-4 py-2 border border-[#444444] rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] focus:border-transparent resize-y disabled:opacity-50 ${
              formErrors.message ? "border-[#DC2626]" : ""
            }`}
            disabled={isSubmitting}
            aria-required="true"
            aria-describedby={formErrors.message ? "message-error" : undefined}
          />
          {formErrors.message && (
            <p id="message-error" className="text-[#DC2626] text-xs mt-1">
              {formErrors.message}
            </p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={`relative bg-[#e2cd2d] text-[#121212] text-sm md:text-base font-semibold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F0F0F0] overflow-hidden ${
              isSubmitting ? "cursor-not-allowed bg-[#666666]" : "hover:bg-[#d1bc29]"
            }`}
            disabled={isSubmitting}
            aria-label={isSubmitting ? "Sending Message" : "Send Message"}
          >
            <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
            {!isSubmitting && <i className="fa-solid fa-paper-plane text-sm relative z-10" aria-hidden="true"></i>}
          </button>
        </div>
      </form>

      {formStatus === "success" && (
        <div
          className="fixed bottom-4 right-4 bg-[#2563EB] text-[#FFFFFF] p-4 rounded-lg shadow-lg animate-fade-in"
          role="alert"
          aria-live="polite"
        >
          Message sent successfully!
        </div>
      )}
      {formStatus === "error" && (
        <div
          className="fixed bottom-4 right-4 bg-[#DC2626] text-[#FFFFFF] p-4 rounded-lg shadow-lg animate-fade-in"
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
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
      `}</style>
    </>
  );
}