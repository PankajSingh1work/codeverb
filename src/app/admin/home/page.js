"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../../lib/firebase"; // Adjust path as needed
import { onAuthStateChanged } from "firebase/auth";
import { database } from "../../../../lib/firebase"; // Ensure database is exported
import { ref, set, onValue } from "firebase/database";

export default function HomeControl() {
  const router = useRouter();

  // State for Hero Section
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

  // State for About Section
  const [aboutData, setAboutData] = useState({
    title: "",
    imageLink: "",
    description: "",
    buttonText: "",
    buttonLink: "",
  });

  // State for Services Section
  const [servicesData, setServicesData] = useState({
    title: "",
    subtitle: "",
    cards: [{ iconLink: "", title: "", description: "" }],
  });

  // State for Projects Section
  const [projectsData, setProjectsData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
  });

  // State for Achievements Section
  const [achievementsData, setAchievementsData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
  });

  // State for Contact Section
  const [contactData, setContactData] = useState({
    title: "",
    subtitle: "",
  });

  // Authentication check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch data from Firebase for all sections
  useEffect(() => {
    const sections = [
      { ref: "homepage/hero", setter: setHeroData },
      { ref: "homepage/about", setter: setAboutData },
      { ref: "homepage/services", setter: setServicesData },
      { ref: "homepage/projects", setter: setProjectsData },
      { ref: "homepage/achievements", setter: setAchievementsData },
      { ref: "homepage/contact", setter: setContactData },
    ];

    sections.forEach(({ ref: path, setter }) => {
      const dataRef = ref(database, path);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) setter(data);
      });
    });
  }, []);

  // Handle input changes for Hero Section
  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for About Section
  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for Services Section (title and subtitle)
  const handleServicesChange = (e) => {
    const { name, value } = e.target;
    setServicesData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for Service Cards
  const handleCardChange = (index, field, value) => {
    setServicesData((prev) => {
      const newCards = [...prev.cards];
      newCards[index] = { ...newCards[index], [field]: value };
      return { ...prev, cards: newCards };
    });
  };

  // Add a new card
  const addCard = () => {
    setServicesData((prev) => ({
      ...prev,
      cards: [...prev.cards, { iconLink: "", title: "", description: "" }],
    }));
  };

  // Remove a card
  const removeCard = (index) => {
    setServicesData((prev) => {
      const newCards = prev.cards.filter((_, i) => i !== index);
      return { ...prev, cards: newCards.length > 0 ? newCards : [{ iconLink: "", title: "", description: "" }] };
    });
  };

  // Handle input changes for Projects Section
  const handleProjectsChange = (e) => {
    const { name, value } = e.target;
    setProjectsData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for Achievements Section
  const handleAchievementsChange = (e) => {
    const { name, value } = e.target;
    setAchievementsData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for Contact Section
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  // Save Hero Section to Firebase
  const handleHeroUpdate = () => {
    const heroRef = ref(database, "homepage/hero");
    set(heroRef, heroData)
      .then(() => alert("Hero section updated successfully!"))
      .catch((error) => alert("Error updating hero section: " + error.message));
  };

  // Save About Section to Firebase
  const handleAboutUpdate = () => {
    const aboutRef = ref(database, "homepage/about");
    set(aboutRef, aboutData)
      .then(() => alert("About section updated successfully!"))
      .catch((error) => alert("Error updating about section: " + error.message));
  };

  // Save Services Section to Firebase
  const handleServicesUpdate = () => {
    const servicesRef = ref(database, "homepage/services");
    set(servicesRef, servicesData)
      .then(() => alert("Services section updated successfully!"))
      .catch((error) => alert("Error updating services section: " + error.message));
  };

  // Save Projects Section to Firebase
  const handleProjectsUpdate = () => {
    const projectsRef = ref(database, "homepage/projects");
    set(projectsRef, projectsData)
      .then(() => alert("Projects section updated successfully!"))
      .catch((error) => alert("Error updating projects section: " + error.message));
  };

  // Save Achievements Section to Firebase
  const handleAchievementsUpdate = () => {
    const achievementsRef = ref(database, "homepage/achievements");
    set(achievementsRef, achievementsData)
      .then(() => alert("Achievements section updated successfully!"))
      .catch((error) => alert("Error updating achievements section: " + error.message));
  };

  // Save Contact Section to Firebase
  const handleContactUpdate = () => {
    const contactRef = ref(database, "homepage/contact");
    set(contactRef, contactData)
      .then(() => alert("Contact section updated successfully!"))
      .catch((error) => alert("Error updating contact section: " + error.message));
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Control Home Page</h1>

      {/* Hero Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="heroImageLink" className="block text-sm font-medium text-gray-700">Image Link</label>
            <input
              type="text"
              id="heroImageLink"
              name="imageLink"
              value={heroData.imageLink}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., /profile_HeroSection.png"
            />
          </div>
          <div>
            <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="heroTitle"
              name="title"
              value={heroData.title}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Hi, I’m Pankaj Singh"
            />
          </div>
          <div>
            <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              id="heroSubtitle"
              name="subtitle"
              value={heroData.subtitle}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Crafting the Future of Mobile Experiences"
            />
          </div>
          <div>
            <label htmlFor="heroDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="heroDescription"
              name="description"
              value={heroData.description}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="e.g., An aspiring mobile app developer with a passion..."
            />
          </div>
          <div>
            <label htmlFor="heroPrimaryButtonText" className="block text-sm font-medium text-gray-700">Primary Button Text</label>
            <input
              type="text"
              id="heroPrimaryButtonText"
              name="primaryButtonText"
              value={heroData.primaryButtonText}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Get Resume"
            />
          </div>
          <div>
            <label htmlFor="heroPrimaryButtonLink" className="block text-sm font-medium text-gray-700">Primary Button Link</label>
            <input
              type="text"
              id="heroPrimaryButtonLink"
              name="primaryButtonLink"
              value={heroData.primaryButtonLink}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., /resume.pdf"
            />
          </div>
          <div>
            <label htmlFor="heroSecondaryButtonText" className="block text-sm font-medium text-gray-700">Secondary Button Text</label>
            <input
              type="text"
              id="heroSecondaryButtonText"
              name="secondaryButtonText"
              value={heroData.secondaryButtonText}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Projects"
            />
          </div>
          <div>
            <label htmlFor="heroSecondaryButtonLink" className="block text-sm font-medium text-gray-700">Secondary Button Link</label>
            <input
              type="text"
              id="heroSecondaryButtonLink"
              name="secondaryButtonLink"
              value={heroData.secondaryButtonLink}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., #projects"
            />
          </div>
          <button
            onClick={handleHeroUpdate}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mt-6"
          >
            Update Hero
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="aboutTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="aboutTitle"
              name="title"
              value={aboutData.title}
              onChange={handleAboutChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., About Me"
            />
          </div>
          <div>
            <label htmlFor="aboutImageLink" className="block text-sm font-medium text-gray-700">Image Link</label>
            <input
              type="text"
              id="aboutImageLink"
              name="imageLink"
              value={aboutData.imageLink}
              onChange={handleAboutChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., /profile_about_me.png"
            />
          </div>
          <div>
            <label htmlFor="aboutDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="aboutDescription"
              name="description"
              value={aboutData.description}
              onChange={handleAboutChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="e.g., I’m Pankaj Singh, a passionate mobile app developer..."
            />
          </div>
          <div>
            <label htmlFor="aboutButtonText" className="block text-sm font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              id="aboutButtonText"
              name="buttonText"
              value={aboutData.buttonText}
              onChange={handleAboutChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Know More"
            />
          </div>
          <div>
            <label htmlFor="aboutButtonLink" className="block text-sm font-medium text-gray-700">Button Link</label>
            <input
              type="text"
              id="aboutButtonLink"
              name="buttonLink"
              value={aboutData.buttonLink}
              onChange={handleAboutChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., /about"
            />
          </div>
          <button
            onClick={handleAboutUpdate}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mt-6"
          >
            Update About
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="servicesTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="servicesTitle"
              name="title"
              value={servicesData.title}
              onChange={handleServicesChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Services"
            />
          </div>
          <div>
            <label htmlFor="servicesSubtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              id="servicesSubtitle"
              name="subtitle"
              value={servicesData.subtitle}
              onChange={handleServicesChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., What I Offer"
            />
          </div>
          {servicesData.cards.map((card, index) => (
            <div key={index} className="border-t pt-4 mt-4 relative">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Card {index + 1}</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor={`iconLink-${index}`} className="block text-sm font-medium text-gray-700">Icon Link (Font Awesome Class)</label>
                  <input
                    type="text"
                    id={`iconLink-${index}`}
                    value={card.iconLink}
                    onChange={(e) => handleCardChange(index, "iconLink", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., fa-brands fa-android"
                  />
                </div>
                <div>
                  <label htmlFor={`cardTitle-${index}`} className="block text-sm font-medium text-gray-700">Card Title</label>
                  <input
                    type="text"
                    id={`cardTitle-${index}`}
                    value={card.title}
                    onChange={(e) => handleCardChange(index, "title", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Android App Development"
                  />
                </div>
                <div>
                  <label htmlFor={`cardDescription-${index}`} className="block text-sm font-medium text-gray-700">Card Description</label>
                  <textarea
                    id={`cardDescription-${index}`}
                    value={card.description}
                    onChange={(e) => handleCardChange(index, "description", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="e.g., Building seamless and intuitive Android applications..."
                  />
                </div>
              </div>
              {servicesData.cards.length > 1 && (
                <button
                  onClick={() => removeCard(index)}
                  className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-800 transition"
                >
                  <i className="fa-solid fa-trash text-lg"></i>
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addCard}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mt-4 flex items-center justify-center"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add New Card
          </button>
          <button
            onClick={handleServicesUpdate}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mt-6"
          >
            Update Services
          </button>
        </div>
      </div>

      {/* Projects Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Projects Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="projectsTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="projectsTitle"
              name="title"
              value={projectsData.title}
              onChange={handleProjectsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., My Projects"
            />
          </div>
          <div>
            <label htmlFor="projectsSubtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              id="projectsSubtitle"
              name="subtitle"
              value={projectsData.subtitle}
              onChange={handleProjectsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Some of My Work"
            />
          </div>
          <div>
            <label htmlFor="projectsButtonText" className="block text-sm font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              id="projectsButtonText"
              name="buttonText"
              value={projectsData.buttonText}
              onChange={handleProjectsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Show All Projects"
            />
          </div>
          <div>
            <label htmlFor="projectsButtonLink" className="block text-sm font-medium text-gray-700">Button Link</label>
            <input
              type="text"
              id="projectsButtonLink"
              name="buttonLink"
              value={projectsData.buttonLink}
              onChange={handleProjectsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., #projects"
            />
          </div>
          <button
            onClick={handleProjectsUpdate}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mt-6"
          >
            Update Projects
          </button>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Achievements Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="achievementsTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="achievementsTitle"
              name="title"
              value={achievementsData.title}
              onChange={handleAchievementsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., My Achievements"
            />
          </div>
          <div>
            <label htmlFor="achievementsSubtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              id="achievementsSubtitle"
              name="subtitle"
              value={achievementsData.subtitle}
              onChange={handleAchievementsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., A showcase of my skills..."
            />
          </div>
          <div>
            <label htmlFor="achievementsButtonText" className="block text-sm font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              id="achievementsButtonText"
              name="buttonText"
              value={achievementsData.buttonText}
              onChange={handleAchievementsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Show All Certificates"
            />
          </div>
          <div>
            <label htmlFor="achievementsButtonLink" className="block text-sm font-medium text-gray-700">Button Link</label>
            <input
              type="text"
              id="achievementsButtonLink"
              name="buttonLink"
              value={achievementsData.buttonLink}
              onChange={handleAchievementsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., /certificates-page"
            />
          </div>
          <button
            onClick={handleAchievementsUpdate}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mt-6"
          >
            Update Achievements
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="contactTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="contactTitle"
              name="title"
              value={contactData.title}
              onChange={handleContactChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Get in Touch"
            />
          </div>
          <div>
            <label htmlFor="contactSubtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              id="contactSubtitle"
              name="subtitle"
              value={contactData.subtitle}
              onChange={handleContactChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Whether you're looking for a commissioned service..."
            />
          </div>
          <button
            onClick={handleContactUpdate}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mt-6"
          >
            Update Contact
          </button>
        </div>
      </div>
    </div>
  );
}

