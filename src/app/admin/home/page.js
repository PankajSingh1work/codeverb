"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, database } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import Link from "next/link";

// export const metadata = {
//   title: "Control Home Page - Pankaj Singh Admin",
//   description: "Admin panel to manage content for Pankaj Singh's portfolio homepage.",
//   robots: "noindex, nofollow", // Prevent indexing by search engines
// };

export default function HomeControl() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});

  const [heroData, setHeroData] = useState({
    imageLink: "",
    title: "",
    subtitle: "",
    description: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
  });

  const [aboutData, setAboutData] = useState({
    title: "",
    imageLink: "",
    description: "",
    buttonText: "",
    buttonLink: "",
  });

  const [servicesData, setServicesData] = useState({
    title: "",
    subtitle: "",
    cards: [{ iconLink: "", title: "", description: "" }],
  });

  const [projectsData, setProjectsData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
  });

  const [achievementsData, setAchievementsData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
  });

  const [contactData, setContactData] = useState({
    title: "",
    subtitle: "",
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
      { path: "homepage/hero", setter: setHeroData },
      { path: "homepage/about", setter: setAboutData },
      { path: "homepage/services", setter: setServicesData },
      { path: "homepage/projects", setter: setProjectsData },
      { path: "homepage/achievements", setter: setAchievementsData },
      { path: "homepage/contact", setter: setContactData },
    ];

    sections.forEach(({ path, setter }) => {
      const dataRef = ref(database, path);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val() || {};
        setter(data);
      }, (error) => {
        console.error(`Error fetching ${path}:`, error);
      });
    });
  }, [loading]);

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (index, field, value) => {
    setServicesData((prev) => {
      const newCards = [...prev.cards];
      newCards[index] = { ...newCards[index], [field]: value };
      return { ...prev, cards: newCards };
    });
  };

  const addCard = () => {
    setServicesData((prev) => ({
      ...prev,
      cards: [...prev.cards, { iconLink: "", title: "", description: "" }],
    }));
  };

  const removeCard = (index) => {
    setServicesData((prev) => {
      const newCards = prev.cards.filter((_, i) => i !== index);
      return { ...prev, cards: newCards.length > 0 ? newCards : [{ iconLink: "", title: "", description: "" }] };
    });
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
      <h1 className="text-4xl font-bold text-[#e2cd2d] mb-8">Control Home Page</h1>
      <Link href="/admin/dashboard" className="mb-6 text-[#e2cd2d] hover:underline">
        Back to Dashboard
      </Link>

      {/* Hero Section */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="heroImageLink" className="block text-sm font-medium text-[#E0E0E0]">Image Link</label>
            <input
              type="text"
              id="heroImageLink"
              name="imageLink"
              value={heroData.imageLink}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., /profile_HeroSection.png"
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
              placeholder="e.g., Hi, I’m Pankaj Singh"
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="heroSubtitle" className="block text-sm font-medium text-[#E0E0E0]">Subtitle</label>
            <input
              type="text"
              id="heroSubtitle"
              name="subtitle"
              value={heroData.subtitle}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Crafting the Future of Mobile Experiences"
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
              placeholder="e.g., An aspiring mobile app developer with a passion..."
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="heroPrimaryButtonText" className="block text-sm font-medium text-[#E0E0E0]">Primary Button Text</label>
            <input
              type="text"
              id="heroPrimaryButtonText"
              name="primaryButtonText"
              value={heroData.primaryButtonText}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Get Resume"
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="heroPrimaryButtonLink" className="block text-sm font-medium text-[#E0E0E0]">Primary Button Link</label>
            <input
              type="text"
              id="heroPrimaryButtonLink"
              name="primaryButtonLink"
              value={heroData.primaryButtonLink}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., /resume.pdf"
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="heroSecondaryButtonText" className="block text-sm font-medium text-[#E0E0E0]">Secondary Button Text</label>
            <input
              type="text"
              id="heroSecondaryButtonText"
              name="secondaryButtonText"
              value={heroData.secondaryButtonText}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Projects"
              disabled={saving["Hero"]}
            />
          </div>
          <div>
            <label htmlFor="heroSecondaryButtonLink" className="block text-sm font-medium text-[#E0E0E0]">Secondary Button Link</label>
            <input
              type="text"
              id="heroSecondaryButtonLink"
              name="secondaryButtonLink"
              value={heroData.secondaryButtonLink}
              onChange={handleChange(setHeroData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., #projects"
              disabled={saving["Hero"]}
            />
          </div>
          <button
            onClick={updateSection("homepage/hero", heroData, "Hero")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Hero"]}
          >
            {saving["Hero"] ? "Updating..." : "Update Hero"}
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">About Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="aboutTitle" className="block text-sm font-medium text-[#E0E0E0]">Title</label>
            <input
              type="text"
              id="aboutTitle"
              name="title"
              value={aboutData.title}
              onChange={handleChange(setAboutData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., About Me"
              disabled={saving["About"]}
            />
          </div>
          <div>
            <label htmlFor="aboutImageLink" className="block text-sm font-medium text-[#E0E0E0]">Image Link</label>
            <input
              type="text"
              id="aboutImageLink"
              name="imageLink"
              value={aboutData.imageLink}
              onChange={handleChange(setAboutData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., /profile_about_me.png"
              disabled={saving["About"]}
            />
          </div>
          <div>
            <label htmlFor="aboutDescription" className="block text-sm font-medium text-[#E0E0E0]">Description</label>
            <textarea
              id="aboutDescription"
              name="description"
              value={aboutData.description}
              onChange={handleChange(setAboutData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              rows="4"
              placeholder="e.g., I’m Pankaj Singh, a passionate mobile app developer..."
              disabled={saving["About"]}
            />
          </div>
          <div>
            <label htmlFor="aboutButtonText" className="block text-sm font-medium text-[#E0E0E0]">Button Text</label>
            <input
              type="text"
              id="aboutButtonText"
              name="buttonText"
              value={aboutData.buttonText}
              onChange={handleChange(setAboutData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Know More"
              disabled={saving["About"]}
            />
          </div>
          <div>
            <label htmlFor="aboutButtonLink" className="block text-sm font-medium text-[#E0E0E0]">Button Link</label>
            <input
              type="text"
              id="aboutButtonLink"
              name="buttonLink"
              value={aboutData.buttonLink}
              onChange={handleChange(setAboutData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., /about"
              disabled={saving["About"]}
            />
          </div>
          <button
            onClick={updateSection("homepage/about", aboutData, "About")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["About"]}
          >
            {saving["About"] ? "Updating..." : "Update About"}
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Services Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="servicesTitle" className="block text-sm font-medium text-[#E0E0E0]">Title</label>
            <input
              type="text"
              id="servicesTitle"
              name="title"
              value={servicesData.title}
              onChange={handleChange(setServicesData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Services"
              disabled={saving["Services"]}
            />
          </div>
          <div>
            <label htmlFor="servicesSubtitle" className="block text-sm font-medium text-[#E0E0E0]">Subtitle</label>
            <input
              type="text"
              id="servicesSubtitle"
              name="subtitle"
              value={servicesData.subtitle}
              onChange={handleChange(setServicesData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., What I Offer"
              disabled={saving["Services"]}
            />
          </div>
          {servicesData.cards.map((card, index) => (
            <div key={index} className="border-t border-[#444444] pt-4 mt-4 relative">
              <h3 className="text-lg font-medium text-[#E0E0E0] mb-2">Card {index + 1}</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor={`iconLink-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Icon Link (Font Awesome Class)</label>
                  <input
                    type="text"
                    id={`iconLink-${index}`}
                    value={card.iconLink}
                    onChange={(e) => handleCardChange(index, "iconLink", e.target.value)}
                    className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                    placeholder="e.g., fa-brands fa-android"
                    disabled={saving["Services"]}
                  />
                </div>
                <div>
                  <label htmlFor={`cardTitle-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Card Title</label>
                  <input
                    type="text"
                    id={`cardTitle-${index}`}
                    value={card.title}
                    onChange={(e) => handleCardChange(index, "title", e.target.value)}
                    className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                    placeholder="e.g., Android App Development"
                    disabled={saving["Services"]}
                  />
                </div>
                <div>
                  <label htmlFor={`cardDescription-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Card Description</label>
                  <textarea
                    id={`cardDescription-${index}`}
                    value={card.description}
                    onChange={(e) => handleCardChange(index, "description", e.target.value)}
                    className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                    rows="3"
                    placeholder="e.g., Building seamless and intuitive Android applications..."
                    disabled={saving["Services"]}
                  />
                </div>
              </div>
              {servicesData.cards.length > 1 && (
                <button
                  onClick={() => removeCard(index)}
                  className="absolute top-4 right-4 bg-[#DC2626] text-[#FFFFFF] p-2 rounded-full hover:bg-[#b91c1c] transition disabled:opacity-50"
                  disabled={saving["Services"]}
                >
                  <i className="fa-solid fa-trash text-lg"></i>
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addCard}
            className="w-full py-2 bg-[#2563EB] text-[#FFFFFF] rounded-md hover:bg-[#1e4fc3] transition mt-4 flex items-center justify-center disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Services"]}
          >
            <i className="fa-solid fa-plus mr-2"></i> Add New Card
          </button>
          <button
            onClick={updateSection("homepage/services", servicesData, "Services")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Services"]}
          >
            {saving["Services"] ? "Updating..." : "Update Services"}
          </button>
        </div>
      </div>

      {/* Projects Section */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Projects Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="projectsTitle" className="block text-sm font-medium text-[#E0E0E0]">Title</label>
            <input
              type="text"
              id="projectsTitle"
              name="title"
              value={projectsData.title}
              onChange={handleChange(setProjectsData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., My Projects"
              disabled={saving["Projects"]}
            />
          </div>
          <div>
            <label htmlFor="projectsSubtitle" className="block text-sm font-medium text-[#E0E0E0]">Subtitle</label>
            <input
              type="text"
              id="projectsSubtitle"
              name="subtitle"
              value={projectsData.subtitle}
              onChange={handleChange(setProjectsData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Some of My Work"
              disabled={saving["Projects"]}
            />
          </div>
          <div>
            <label htmlFor="projectsButtonText" className="block text-sm font-medium text-[#E0E0E0]">Button Text</label>
            <input
              type="text"
              id="projectsButtonText"
              name="buttonText"
              value={projectsData.buttonText}
              onChange={handleChange(setProjectsData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Show All Projects"
              disabled={saving["Projects"]}
            />
          </div>
          <div>
            <label htmlFor="projectsButtonLink" className="block text-sm font-medium text-[#E0E0E0]">Button Link</label>
            <input
              type="text"
              id="projectsButtonLink"
              name="buttonLink"
              value={projectsData.buttonLink}
              onChange={handleChange(setProjectsData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., #projects"
              disabled={saving["Projects"]}
            />
          </div>
          <button
            onClick={updateSection("homepage/projects", projectsData, "Projects")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Projects"]}
          >
            {saving["Projects"] ? "Updating..." : "Update Projects"}
          </button>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Achievements Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="achievementsTitle" className="block text-sm font-medium text-[#E0E0E0]">Title</label>
            <input
              type="text"
              id="achievementsTitle"
              name="title"
              value={achievementsData.title}
              onChange={handleChange(setAchievementsData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., My Achievements"
              disabled={saving["Achievements"]}
            />
          </div>
          <div>
            <label htmlFor="achievementsSubtitle" className="block text-sm font-medium text-[#E0E0E0]">Subtitle</label>
            <input
              type="text"
              id="achievementsSubtitle"
              name="subtitle"
              value={achievementsData.subtitle}
              onChange={handleChange(setAchievementsData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., A showcase of my skills..."
              disabled={saving["Achievements"]}
            />
          </div>
          <div>
            <label htmlFor="achievementsButtonText" className="block text-sm font-medium text-[#E0E0E0]">Button Text</label>
            <input
              type="text"
              id="achievementsButtonText"
              name="buttonText"
              value={achievementsData.buttonText}
              onChange={handleChange(setAchievementsData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Show All Certificates"
              disabled={saving["Achievements"]}
            />
          </div>
          <div>
            <label htmlFor="achievementsButtonLink" className="block text-sm font-medium text-[#E0E0E0]">Button Link</label>
            <input
              type="text"
              id="achievementsButtonLink"
              name="buttonLink"
              value={achievementsData.buttonLink}
              onChange={handleChange(setAchievementsData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., /certificates-page"
              disabled={saving["Achievements"]}
            />
          </div>
          <button
            onClick={updateSection("homepage/achievements", achievementsData, "Achievements")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Achievements"]}
          >
            {saving["Achievements"] ? "Updating..." : "Update Achievements"}
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Contact Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="contactTitle" className="block text-sm font-medium text-[#E0E0E0]">Title</label>
            <input
              type="text"
              id="contactTitle"
              name="title"
              value={contactData.title}
              onChange={handleChange(setContactData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Get in Touch"
              disabled={saving["Contact"]}
            />
          </div>
          <div>
            <label htmlFor="contactSubtitle" className="block text-sm font-medium text-[#E0E0E0]">Subtitle</label>
            <input
              type="text"
              id="contactSubtitle"
              name="subtitle"
              value={contactData.subtitle}
              onChange={handleChange(setContactData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Whether you're looking for a commissioned service..."
              disabled={saving["Contact"]}
            />
          </div>
          <button
            onClick={updateSection("homepage/contact", contactData, "Contact")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Contact"]}
          >
            {saving["Contact"] ? "Updating..." : "Update Contact"}
          </button>
        </div>
      </div>
    </div>
  );
}