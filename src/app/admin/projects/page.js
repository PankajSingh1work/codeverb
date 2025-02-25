"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { database } from "../../../lib/firebase";
import { ref, set, onValue } from "firebase/database";

export default function ProjectsControl() {
  const router = useRouter();

  const [heroData, setHeroData] = useState({
    backgroundImageLink: "",
    title: "",
    description: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
  });

  const [projectsData, setProjectsData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const sections = [
      { ref: "projectspage/hero", setter: setHeroData },
      { ref: "projectspage/projects", setter: setProjectsData },
    ];

    sections.forEach(({ ref: path, setter }) => {
      const dataRef = ref(database, path);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) setter(data);
      });
    });
  }, []);

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectsChange = (e) => {
    const { name, value } = e.target;
    setProjectsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeroUpdate = () => {
    const heroRef = ref(database, "projectspage/hero");
    set(heroRef, heroData)
      .then(() => alert("Hero section updated successfully!"))
      .catch((error) => alert("Error updating hero section: " + error.message));
  };

  const handleProjectsUpdate = () => {
    const projectsRef = ref(database, "projectspage/projects");
    set(projectsRef, projectsData)
      .then(() => alert("Projects section updated successfully!"))
      .catch((error) => alert("Error updating projects section: " + error.message));
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Control Projects Page</h1>

      {/* Hero Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="backgroundImageLink" className="block text-sm font-medium text-gray-700">Background Image Link</label>
            <input
              type="text"
              id="backgroundImageLink"
              name="backgroundImageLink"
              value={heroData.backgroundImageLink}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="e.g., /back.jpg"
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
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="e.g., Innovative Solutions Through Projects"
            />
          </div>
          <div>
            <label htmlFor="heroDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="heroDescription"
              name="description"
              value={heroData.description}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              rows="4"
              placeholder="e.g., Explore a range of projects that showcase my expertise..."
            />
          </div>
          <div>
            <label htmlFor="primaryButtonText" className="block text-sm font-medium text-gray-700">Primary Button Text</label>
            <input
              type="text"
              id="primaryButtonText"
              name="primaryButtonText"
              value={heroData.primaryButtonText}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="e.g., View Projects"
            />
          </div>
          <div>
            <label htmlFor="primaryButtonLink" className="block text-sm font-medium text-gray-700">Primary Button Link</label>
            <input
              type="text"
              id="primaryButtonLink"
              name="primaryButtonLink"
              value={heroData.primaryButtonLink}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="e.g., #projects"
            />
          </div>
          <div>
            <label htmlFor="secondaryButtonText" className="block text-sm font-medium text-gray-700">Secondary Button Text</label>
            <input
              type="text"
              id="secondaryButtonText"
              name="secondaryButtonText"
              value={heroData.secondaryButtonText}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="e.g., Contact Me"
            />
          </div>
          <div>
            <label htmlFor="secondaryButtonLink" className="block text-sm font-medium text-gray-700">Secondary Button Link</label>
            <input
              type="text"
              id="secondaryButtonLink"
              name="secondaryButtonLink"
              value={heroData.secondaryButtonLink}
              onChange={handleHeroChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="e.g., #contact"
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
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="e.g., My Projects"
            />
          </div>
          <div>
            <label htmlFor="projectsDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="projectsDescription"
              name="description"
              value={projectsData.description}
              onChange={handleProjectsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              rows="4"
              placeholder="e.g., Explore a collection of my diverse projects..."
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
    </div>
  );
}