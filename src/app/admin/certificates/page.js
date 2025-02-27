"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, database } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import Link from "next/link";

// export const metadata = {
//   title: "Control Certificates Page - Pankaj Singh Admin",
//   description: "Admin panel to manage content for Pankaj Singh's certificates page.",
//   robots: "noindex, nofollow", // Prevent indexing by search engines
// };

export default function CertificatesControl() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});

  const [heroData, setHeroData] = useState({
    backgroundImageLink: "",
    title: "",
    description: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
  });

  const [certificatesData, setCertificatesData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (loading) return;

    const sections = [
      { path: "certificatespage/hero", setter: setHeroData },
      { path: "certificatespage/certificates", setter: setCertificatesData },
    ];

    sections.forEach(({ path, setter }) => {
      const dataRef = ref(database, path);
      onValue(
        dataRef,
        (snapshot) => {
          const data = snapshot.val() || {};
          setter(data);
        },
        (error) => {
          console.error(`Error fetching ${path}:`, error);
        }
      );
    });
  }, [loading]);

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const updateSection = (path, data, sectionName) => async () => {
    setSaving((prev) => ({ ...prev, [sectionName]: true }));
    try {
      const dataRef = ref(database, path);
      await set(dataRef, data);
      alert(`${sectionName} section updated successfully!`);
    } catch (error) {
      alert(`Error updating ${sectionName.toLowerCase()} section: ${error.message}`);
      console.error(`Error updating ${path}:`, error);
    } finally {
      setSaving((prev) => ({ ...prev, [sectionName]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212]">
        <p className="text-[#E0E0E0] text-lg">Loading control panel...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#121212] p-6">
      <h1 className="text-4xl font-bold text-[#e2cd2d] mb-8">Control Certificates Page</h1>
      <Link href="/admin/dashboard" className="mb-6 text-[#e2cd2d] hover:underline">
        Back to Dashboard
      </Link>

      {/* Hero Section */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="backgroundImageLink" className="block text-sm font-medium text-[#E0E0E0]">Background Image Link</label>
            <input
              type="text"
              id="backgroundImageLink"
              name="backgroundImageLink"
              value={heroData.backgroundImageLink}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., /back.jpg"
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="heroTitle" className="block text-sm font-medium text-[#E0E0E0]">Title</label>
            <input
              type="text"
              id="heroTitle"
              name="title"
              value={heroData.title}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Certifications of Excellence"
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="heroDescription" className="block text-sm font-medium text-[#E0E0E0]">Description</label>
            <textarea
              id="heroDescription"
              name="description"
              value={heroData.description}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              rows="4"
              placeholder="e.g., Highlighting achievements and certifications earned..."
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="primaryButtonText" className="block text-sm font-medium text-[#E0E0E0]">Primary Button Text</label>
            <input
              type="text"
              id="primaryButtonText"
              name="primaryButtonText"
              value={heroData.primaryButtonText}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., View Projects"
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="primaryButtonLink" className="block text-sm font-medium text-[#E0E0E0]">Primary Button Link</label>
            <input
              type="text"
              id="primaryButtonLink"
              name="primaryButtonLink"
              value={heroData.primaryButtonLink}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., #projects"
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="secondaryButtonText" className="block text-sm font-medium text-[#E0E0E0]">Secondary Button Text</label>
            <input
              type="text"
              id="secondaryButtonText"
              name="secondaryButtonText"
              value={heroData.secondaryButtonText}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Contact Me"
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="secondaryButtonLink" className="block text-sm font-medium text-[#E0E0E0]">Secondary Button Link</label>
            <input
              type="text"
              id="secondaryButtonLink"
              name="secondaryButtonLink"
              value={heroData.secondaryButtonLink}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., #contact"
              disabled={saving["Hero"]}
            />
          </div>
          <button
            onClick={updateSection("certificatespage/hero", heroData, "Hero")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Hero"]}
          >
            {saving["Hero"] ? "Updating..." : "Update Hero"}
          </button>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Certificates Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="certificatesTitle" className="block text-sm font-medium text-[#E0E0E0]">Title</label>
            <input
              type="text"
              id="certificatesTitle"
              name="title"
              value={certificatesData.title}
              onChange={handleChange(setCertificatesData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., My Achievements"
              disabled={saving["Certificates"]}
            />
          </div>
          <div>
            <label htmlFor="certificatesDescription" className="block text-sm font-medium text-[#E0E0E0]">Description</label>
            <textarea
              id="certificatesDescription"
              name="description"
              value={certificatesData.description}
              onChange={handleChange(setCertificatesData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              rows="4"
              placeholder="e.g., A showcase of my certifications from renowned platforms..."
              disabled={saving["Certificates"]}
            />
          </div>
          <button
            onClick={updateSection("certificatespage/certificates", certificatesData, "Certificates")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Certificates"]}
          >
            {saving["Certificates"] ? "Updating..." : "Update Certificates"}
          </button>
        </div>
      </div>
    </div>
  );
}