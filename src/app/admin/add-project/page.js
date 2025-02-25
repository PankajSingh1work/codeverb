"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../../lib/firebase"; // Adjust path as needed
import { onAuthStateChanged } from "firebase/auth";
import { database } from "../../../../lib/firebase"; // Ensure database is exported
import { ref, set, onValue } from "firebase/database";

export default function AddProjectControl() {
  const router = useRouter();

  // State for all projects
  const [projects, setProjects] = useState([
    {
      hero: {
        backgroundImageLink: "",
        title: "",
        description: "",
        buttons: [{ buttonText: "", iconLink: "", buttonLink: "" }],
      },
      details: [
        {
          image: "",
          description1: "",
          description2: "",
          description3: "",
        },
      ],
      techStack: {
        items: [{ techIconLink: "", techName: "" }],
      },
      challenges: {
        cards: [{ iconLink: "", title: "", description: "" }],
      },
      features: {
        cards: [{ iconLink: "", title: "", description: "" }],
      },
    },
  ]);

  // Authentication check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch data from Firebase
  useEffect(() => {
    const projectsRef = ref(database, "projectspage/projects_list");
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setProjects(data);
    });
  }, []);

  // Handle input changes for a project section
  const handleChange = (projIndex, section, field, value) => {
    setProjects((prev) => {
      const newProjects = [...prev];
      newProjects[projIndex] = {
        ...newProjects[projIndex],
        [section]: { ...newProjects[projIndex][section], [field]: value },
      };
      return newProjects;
    });
  };

  // Handle input changes for array-based sections (buttons, details, techStack, challenges, features)
  const handleArrayChange = (projIndex, section, itemIndex, field, value) => {
    setProjects((prev) => {
      const newProjects = [...prev];
      if (section === "details") {
        newProjects[projIndex].details[itemIndex] = {
          ...newProjects[projIndex].details[itemIndex],
          [field]: value,
        };
      } else {
        const targetSection = section === "hero" ? "buttons" : section === "techStack" ? "items" : "cards";
        newProjects[projIndex][section][targetSection][itemIndex] = {
          ...newProjects[projIndex][section][targetSection][itemIndex],
          [field]: value,
        };
      }
      return newProjects;
    });
  };

  // Add a new item to an array-based section
  const addItem = (projIndex, section) => {
    setProjects((prev) => {
      const newProjects = [...prev];
      if (section === "buttons") {
        newProjects[projIndex].hero.buttons.push({ buttonText: "", iconLink: "", buttonLink: "" });
      } else if (section === "details") {
        newProjects[projIndex].details.push({ image: "", description1: "", description2: "", description3: "" });
      } else if (section === "techStack") {
        newProjects[projIndex].techStack.items.push({ techIconLink: "", techName: "" });
      } else if (section === "challenges") {
        newProjects[projIndex].challenges.cards.push({ iconLink: "", title: "", description: "" });
      } else if (section === "features") {
        newProjects[projIndex].features.cards.push({ iconLink: "", title: "", description: "" });
      }
      return newProjects;
    });
  };

  // Remove an item from an array-based section
  const removeItem = (projIndex, section, itemIndex) => {
    setProjects((prev) => {
      const newProjects = [...prev];
      let targetArray;
      if (section === "buttons") {
        targetArray = newProjects[projIndex].hero.buttons;
        targetArray = targetArray.filter((_, i) => i !== itemIndex);
        newProjects[projIndex].hero.buttons = targetArray.length > 0 ? targetArray : [{ buttonText: "", iconLink: "", buttonLink: "" }];
      } else if (section === "details") {
        targetArray = newProjects[projIndex].details;
        targetArray = targetArray.filter((_, i) => i !== itemIndex);
        newProjects[projIndex].details = targetArray.length > 0 ? targetArray : [{ image: "", description1: "", description2: "", description3: "" }];
      } else if (section === "techStack") {
        targetArray = newProjects[projIndex].techStack.items;
        targetArray = targetArray.filter((_, i) => i !== itemIndex);
        newProjects[projIndex].techStack.items = targetArray.length > 0 ? targetArray : [{ techIconLink: "", techName: "" }];
      } else if (section === "challenges") {
        targetArray = newProjects[projIndex].challenges.cards;
        targetArray = targetArray.filter((_, i) => i !== itemIndex);
        newProjects[projIndex].challenges.cards = targetArray.length > 0 ? targetArray : [{ iconLink: "", title: "", description: "" }];
      } else if (section === "features") {
        targetArray = newProjects[projIndex].features.cards;
        targetArray = targetArray.filter((_, i) => i !== itemIndex);
        newProjects[projIndex].features.cards = targetArray.length > 0 ? targetArray : [{ iconLink: "", title: "", description: "" }];
      }
      return newProjects;
    });
  };

  // Add a new project
  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        hero: {
          backgroundImageLink: "",
          title: "",
          description: "",
          buttons: [{ buttonText: "", iconLink: "", buttonLink: "" }],
        },
        details: [
          {
            image: "",
            description1: "",
            description2: "",
            description3: "",
          },
        ],
        techStack: {
          items: [{ techIconLink: "", techName: "" }],
        },
        challenges: {
          cards: [{ iconLink: "", title: "", description: "" }],
        },
        features: {
          cards: [{ iconLink: "", title: "", description: "" }],
        },
      },
    ]);
  };

  // Remove a project
  const removeProject = (index) => {
    setProjects((prev) => {
      const newProjects = prev.filter((_, i) => i !== index);
      return newProjects.length > 0
        ? newProjects
        : [
            {
              hero: {
                backgroundImageLink: "",
                title: "",
                description: "",
                buttons: [{ buttonText: "", iconLink: "", buttonLink: "" }],
              },
              details: [
                {
                  image: "",
                  description1: "",
                  description2: "",
                  description3: "",
                },
              ],
              techStack: {
                items: [{ techIconLink: "", techName: "" }],
              },
              challenges: {
                cards: [{ iconLink: "", title: "", description: "" }],
              },
              features: {
                cards: [{ iconLink: "", title: "", description: "" }],
              },
            },
          ];
    });
  };

  // Save all projects to Firebase
  const handleUpdate = () => {
    const projectsRef = ref(database, "projectspage/projects_list");
    set(projectsRef, projects)
      .then(() => alert("Projects updated successfully!"))
      .catch((error) => alert("Error updating projects: " + error.message));
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Add Projects</h1>

      {projects.map((proj, projIndex) => (
        <div key={projIndex} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8 relative">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project {projIndex + 1}</h2>

          {/* Hero Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-medium text-gray-700">Hero Section</h3>
            <div>
              <label htmlFor={`backgroundImageLink-${projIndex}`} className="block text-sm font-medium text-gray-700">
                Background Image Link
              </label>
              <input
                type="text"
                id={`backgroundImageLink-${projIndex}`}
                name="backgroundImageLink"
                value={proj.hero.backgroundImageLink}
                onChange={(e) => handleChange(projIndex, "hero", "backgroundImageLink", e.target.value)}
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., /demo_land.jpg"
              />
            </div>
            <div>
              <label htmlFor={`heroTitle-${projIndex}`} className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id={`heroTitle-${projIndex}`}
                name="title"
                value={proj.hero.title}
                onChange={(e) => handleChange(projIndex, "hero", "title", e.target.value)}
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Smart Home Automation"
              />
            </div>
            <div>
              <label htmlFor={`heroDescription-${projIndex}`} className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id={`heroDescription-${projIndex}`}
                name="description"
                value={proj.hero.description}
                onChange={(e) => handleChange(projIndex, "hero", "description", e.target.value)}
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="e.g., Transform your living space with our innovative..."
              />
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-700">Buttons</h4>
              {proj.hero.buttons.map((button, btnIndex) => (
                <div key={btnIndex} className="border-t pt-4 mt-4 relative">
                  <h5 className="text-md font-medium text-gray-600 mb-2">Button {btnIndex + 1}</h5>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`buttonText-${projIndex}-${btnIndex}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Button Text
                      </label>
                      <input
                        type="text"
                        id={`buttonText-${projIndex}-${btnIndex}`}
                        value={button.buttonText}
                        onChange={(e) => handleArrayChange(projIndex, "hero", btnIndex, "buttonText", e.target.value)}
                        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., View on GitHub"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`iconLink-${projIndex}-${btnIndex}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Icon Link (Font Awesome Class)
                      </label>
                      <input
                        type="text"
                        id={`iconLink-${projIndex}-${btnIndex}`}
                        value={button.iconLink}
                        onChange={(e) => handleArrayChange(projIndex, "hero", btnIndex, "iconLink", e.target.value)}
                        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., fab fa-github"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`buttonLink-${projIndex}-${btnIndex}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Button Link
                      </label>
                      <input
                        type="text"
                        id={`buttonLink-${projIndex}-${btnIndex}`}
                        value={button.buttonLink}
                        onChange={(e) => handleArrayChange(projIndex, "hero", btnIndex, "buttonLink", e.target.value)}
                        className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., https://github.com/demo/smart-home-automation"
                      />
                    </div>
                  </div>
                  {proj.hero.buttons.length > 1 && (
                    <button
                      onClick={() => removeItem(projIndex, "buttons", btnIndex)}
                      className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                    >
                      <i className="fa-solid fa-trash text-lg"></i>
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addItem(projIndex, "buttons")}
                className="w-full py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center"
              >
                <i className="fa-solid fa-plus mr-2"></i> Add Button
              </button>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-medium text-gray-700">Project Details</h3>
            {proj.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="border-t pt-4 mt-4 relative">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Section {detailIndex + 1}</h4>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`detailImage-${projIndex}-${detailIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image
                    </label>
                    <input
                      type="text"
                      id={`detailImage-${projIndex}-${detailIndex}`}
                      value={detail.image}
                      onChange={(e) => handleArrayChange(projIndex, "details", detailIndex, "image", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., /demo_5.webp"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`description1-${projIndex}-${detailIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description 1
                    </label>
                    <textarea
                      id={`description1-${projIndex}-${detailIndex}`}
                      value={detail.description1}
                      onChange={(e) => handleArrayChange(projIndex, "details", detailIndex, "description1", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="e.g., This Smart Home Automation project allows..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`description2-${projIndex}-${detailIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description 2
                    </label>
                    <textarea
                      id={`description2-${projIndex}-${detailIndex}`}
                      value={detail.description2}
                      onChange={(e) => handleArrayChange(projIndex, "details", detailIndex, "description2", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="e.g., The system leverages IoT devices..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`description3-${projIndex}-${detailIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description 3
                    </label>
                    <textarea
                      id={`description3-${projIndex}-${detailIndex}`}
                      value={detail.description3}
                      onChange={(e) => handleArrayChange(projIndex, "details", detailIndex, "description3", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="e.g., The project is built with modern technologies..."
                    />
                  </div>
                </div>
                {proj.details.length > 1 && (
                  <button
                    onClick={() => removeItem(projIndex, "details", detailIndex)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                  >
                    <i className="fa-solid fa-trash text-lg"></i>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addItem(projIndex, "details")}
              className="w-full py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center"
            >
              <i className="fa-solid fa-plus mr-2"></i> Add Details Section
            </button>
          </div>

          {/* Tech Stack Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-medium text-gray-700">Tech Stack</h3>
            {proj.techStack.items.map((item, itemIndex) => (
              <div key={itemIndex} className="border-t pt-4 mt-4 relative">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Tech Item {itemIndex + 1}</h4>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`techIconLink-${projIndex}-${itemIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tech Icon Link (Font Awesome Class)
                    </label>
                    <input
                      type="text"
                      id={`techIconLink-${projIndex}-${itemIndex}`}
                      value={item.techIconLink}
                      onChange={(e) => handleArrayChange(projIndex, "techStack", itemIndex, "techIconLink", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., fab fa-react"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`techName-${projIndex}-${itemIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tech Name
                    </label>
                    <input
                      type="text"
                      id={`techName-${projIndex}-${itemIndex}`}
                      value={item.techName}
                      onChange={(e) => handleArrayChange(projIndex, "techStack", itemIndex, "techName", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., React"
                    />
                  </div>
                </div>
                {proj.techStack.items.length > 1 && (
                  <button
                    onClick={() => removeItem(projIndex, "techStack", itemIndex)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                  >
                    <i className="fa-solid fa-trash text-lg"></i>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addItem(projIndex, "techStack")}
              className="w-full py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center"
            >
              <i className="fa-solid fa-plus mr-2"></i> Add Tech Item
            </button>
          </div>

          {/* Project Challenges Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-medium text-gray-700">Project Challenges</h3>
            {proj.challenges.cards.map((card, cardIndex) => (
              <div key={cardIndex} className="border-t pt-4 mt-4 relative">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Challenge {cardIndex + 1}</h4>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`challengeIconLink-${projIndex}-${cardIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Icon Link (Font Awesome Class)
                    </label>
                    <input
                      type="text"
                      id={`challengeIconLink-${projIndex}-${cardIndex}`}
                      value={card.iconLink}
                      onChange={(e) => handleArrayChange(projIndex, "challenges", cardIndex, "iconLink", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., fas fa-code"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`challengeTitle-${projIndex}-${cardIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id={`challengeTitle-${projIndex}-${cardIndex}`}
                      value={card.title}
                      onChange={(e) => handleArrayChange(projIndex, "challenges", cardIndex, "title", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Integration Issues"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`challengeDescription-${projIndex}-${cardIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id={`challengeDescription-${projIndex}-${cardIndex}`}
                      value={card.description}
                      onChange={(e) => handleArrayChange(projIndex, "challenges", cardIndex, "description", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="e.g., Ensuring seamless communication between..."
                    />
                  </div>
                </div>
                {proj.challenges.cards.length > 1 && (
                  <button
                    onClick={() => removeItem(projIndex, "challenges", cardIndex)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                  >
                    <i className="fa-solid fa-trash text-lg"></i>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addItem(projIndex, "challenges")}
              className="w-full py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center"
            >
              <i className="fa-solid fa-plus mr-2"></i> Add Challenge
            </button>
          </div>

          {/* Key Features Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-medium text-gray-700">Key Features</h3>
            {proj.features.cards.map((card, cardIndex) => (
              <div key={cardIndex} className="border-t pt-4 mt-4 relative">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Feature {cardIndex + 1}</h4>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`featureIconLink-${projIndex}-${cardIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Icon Link (Font Awesome Class)
                    </label>
                    <input
                      type="text"
                      id={`featureIconLink-${projIndex}-${cardIndex}`}
                      value={card.iconLink}
                      onChange={(e) => handleArrayChange(projIndex, "features", cardIndex, "iconLink", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., fas fa-bolt"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`featureTitle-${projIndex}-${cardIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id={`featureTitle-${projIndex}-${cardIndex}`}
                      value={card.title}
                      onChange={(e) => handleArrayChange(projIndex, "features", cardIndex, "title", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Instant Control"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`featureDescription-${projIndex}-${cardIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id={`featureDescription-${projIndex}-${cardIndex}`}
                      value={card.description}
                      onChange={(e) => handleArrayChange(projIndex, "features", cardIndex, "description", e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="e.g., Manage your devices with a single tap..."
                    />
                  </div>
                </div>
                {proj.features.cards.length > 1 && (
                  <button
                    onClick={() => removeItem(projIndex, "features", cardIndex)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition"
                  >
                    <i className="fa-solid fa-trash text-lg"></i>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addItem(projIndex, "features")}
              className="w-full py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center"
            >
              <i className="fa-solid fa-plus mr-2"></i> Add Feature
            </button>
          </div>

          {/* Remove Project Button */}
          {projects.length > 1 && (
            <button
              onClick={() => removeProject(projIndex)}
              className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-800 transition"
            >
              <i className="fa-solid fa-trash text-lg"></i>
            </button>
          )}
        </div>
      ))}

      {/* Add New Project Button */}
      <button
        onClick={addProject}
        className="w-full max-w-2xl py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center mb-8"
      >
        <i className="fa-solid fa-plus mr-2"></i> Add New Project
      </button>

      {/* Update All Projects Button */}
      <button
        onClick={handleUpdate}
        className="w-full max-w-2xl py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Update Projects
      </button>
    </div>
  );
}