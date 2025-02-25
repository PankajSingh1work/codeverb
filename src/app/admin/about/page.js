"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../../lib/firebase"; // Adjust path as needed
import { onAuthStateChanged } from "firebase/auth";
import { database } from "../../../../lib/firebase"; // Ensure database is exported
import { ref, set, onValue } from "firebase/database";

export default function AboutControl() {
  const router = useRouter();

  // State for Hero Section
  const [heroData, setHeroData] = useState({
    backgroundImageLink: "",
    title: "",
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
    description1: "",
    description2: "",
    description3: "",
    description4: "",
  });

  // State for Education Section
  const [educationData, setEducationData] = useState({
    title: "",
    cards: [{ year: "", courseName: "", instituteName: "", periodOrPassout: "", description: "" }],
  });

  // State for Skills Section
  const [skillsData, setSkillsData] = useState({
    title: "",
    subtitle: "",
    rows: [[{ skillText: "" }]], // Array of rows, each row is an array of skills
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
      { ref: "aboutpage/hero", setter: setHeroData },
      { ref: "aboutpage/about", setter: setAboutData },
      { ref: "aboutpage/education", setter: setEducationData },
      { ref: "aboutpage/skills", setter: setSkillsData },
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

  // Handle input changes for Education Section (title)
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for Education Cards
  const handleEducationCardChange = (index, field, value) => {
    setEducationData((prev) => {
      const newCards = [...prev.cards];
      newCards[index] = { ...newCards[index], [field]: value };
      return { ...prev, cards: newCards };
    });
  };

  // Add a new Education Card
  const addEducationCard = () => {
    setEducationData((prev) => ({
      ...prev,
      cards: [...prev.cards, { year: "", courseName: "", instituteName: "", periodOrPassout: "", description: "" }],
    }));
  };

  // Remove an Education Card
  const removeEducationCard = (index) => {
    setEducationData((prev) => {
      const newCards = prev.cards.filter((_, i) => i !== index);
      return { ...prev, cards: newCards.length > 0 ? newCards : [{ year: "", courseName: "", instituteName: "", periodOrPassout: "", description: "" }] };
    });
  };

  // Handle input changes for Skills Section (title and subtitle)
  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    setSkillsData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for Skills in a Row
  const handleSkillChange = (rowIndex, skillIndex, value) => {
    setSkillsData((prev) => {
      const newRows = [...prev.rows];
      newRows[rowIndex] = newRows[rowIndex].map((skill, i) =>
        i === skillIndex ? { skillText: value } : skill
      );
      return { ...prev, rows: newRows };
    });
  };

  // Add a new Skill to a Row
  const addSkillToRow = (rowIndex) => {
    setSkillsData((prev) => {
      const newRows = [...prev.rows];
      newRows[rowIndex] = [...newRows[rowIndex], { skillText: "" }];
      return { ...prev, rows: newRows };
    });
  };

  // Remove a Skill from a Row
  const removeSkillFromRow = (rowIndex, skillIndex) => {
    setSkillsData((prev) => {
      const newRows = [...prev.rows];
      newRows[rowIndex] = newRows[rowIndex].filter((_, i) => i !== skillIndex);
      if (newRows[rowIndex].length === 0) newRows[rowIndex] = [{ skillText: "" }]; // Ensure at least one skill per row
      return { ...prev, rows: newRows };
    });
  };

  // Add a new Row
  const addSkillRow = () => {
    setSkillsData((prev) => ({
      ...prev,
      rows: [...prev.rows, [{ skillText: "" }]],
    }));
  };

  // Remove a Row
  const removeSkillRow = (rowIndex) => {
    setSkillsData((prev) => {
      const newRows = prev.rows.filter((_, i) => i !== rowIndex);
      return { ...prev, rows: newRows.length > 0 ? newRows : [[{ skillText: "" }]] };
    });
  };

  // Save Hero Section to Firebase
  const handleHeroUpdate = () => {
    const heroRef = ref(database, "aboutpage/hero");
    set(heroRef, heroData)
      .then(() => alert("Hero section updated successfully!"))
      .catch((error) => alert("Error updating hero section: " + error.message));
  };

  // Save About Section to Firebase
  const handleAboutUpdate = () => {
    const aboutRef = ref(database, "aboutpage/about");
    set(aboutRef, aboutData)
      .then(() => alert("About section updated successfully!"))
      .catch((error) => alert("Error updating about section: " + error.message));
  };

  // Save Education Section to Firebase
  const handleEducationUpdate = () => {
    const educationRef = ref(database, "aboutpage/education");
    set(educationRef, educationData)
      .then(() => alert("Education section updated successfully!"))
      .catch((error) => alert("Error updating education section: " + error.message));
  };

  // Save Skills Section to Firebase
  const handleSkillsUpdate = () => {
    const skillsRef = ref(database, "aboutpage/skills");
    set(skillsRef, skillsData)
      .then(() => alert("Skills section updated successfully!"))
      .catch((error) => alert("Error updating skills section: " + error.message));
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Control About Page</h1>

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
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Get to Know Me Better"
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
              placeholder="e.g., I'm a passionate developer with a love for..."
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
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="e.g., Hi I'm Pankaj Singh !"
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
            <label htmlFor="description1" className="block text-sm font-medium text-gray-700">Description 1</label>
            <textarea
              id="description1"
              name="description1"
              value={aboutData.description1}
              onChange={handleAboutChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="e.g., I am currently pursuing a Bachelor's degree..."
            />
          </div>
          <div>
            <label htmlFor="description2" className="block text-sm font-medium text-gray-700">Description 2</label>
            <textarea
              id="description2"
              name="description2"
              value={aboutData.description2}
              onChange={handleAboutChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="e.g., My motivation stems from my creative mind..."
            />
          </div>
          <div>
            <label htmlFor="description3" className="block text-sm font-medium text-gray-700">Description 3</label>
            <textarea
              id="description3"
              name="description3"
              value={aboutData.description3}
              onChange={handleAboutChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="e.g., I enjoy engaging with people..."
            />
          </div>
          <div>
            <label htmlFor="description4" className="block text-sm font-medium text-gray-700">Description 4</label>
            <textarea
              id="description4"
              name="description4"
              value={aboutData.description4}
              onChange={handleAboutChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="e.g., I am driven by a love for technology..."
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

      {/* Education Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Education Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="educationTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="educationTitle"
              name="title"
              value={educationData.title}
              onChange={handleEducationChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Education"
            />
          </div>
          {educationData.cards.map((card, index) => (
            <div key={index} className="border-t pt-4 mt-4 relative">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Education Card {index + 1}</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor={`year-${index}`} className="block text-sm font-medium text-gray-700">Year</label>
                  <input
                    type="text"
                    id={`year-${index}`}
                    value={card.year}
                    onChange={(e) => handleEducationCardChange(index, "year", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2026"
                  />
                </div>
                <div>
                  <label htmlFor={`courseName-${index}`} className="block text-sm font-medium text-gray-700">Course Name</label>
                  <input
                    type="text"
                    id={`courseName-${index}`}
                    value={card.courseName}
                    onChange={(e) => handleEducationCardChange(index, "courseName", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., B.Tech in Computer Science & Engineering"
                  />
                </div>
                <div>
                  <label htmlFor={`instituteName-${index}`} className="block text-sm font-medium text-gray-700">Institute Name</label>
                  <input
                    type="text"
                    id={`instituteName-${index}`}
                    value={card.instituteName}
                    onChange={(e) => handleEducationCardChange(index, "instituteName", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Shivalik College of Engineering"
                  />
                </div>
                <div>
                  <label htmlFor={`periodOrPassout-${index}`} className="block text-sm font-medium text-gray-700">Period or Passout</label>
                  <input
                    type="text"
                    id={`periodOrPassout-${index}`}
                    value={card.periodOrPassout}
                    onChange={(e) => handleEducationCardChange(index, "periodOrPassout", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2023 - 2026 (Present)"
                  />
                </div>
                <div>
                  <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id={`description-${index}`}
                    value={card.description}
                    onChange={(e) => handleEducationCardChange(index, "description", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="e.g., Currently pursuing my Bachelor's degree..."
                  />
                </div>
              </div>
              {educationData.cards.length > 1 && (
                <button
                  onClick={() => removeEducationCard(index)}
                  className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-800 transition"
                >
                  <i className="fa-solid fa-trash text-lg"></i>
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addEducationCard}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mt-4 flex items-center justify-center"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add New Education Card
          </button>
          <button
            onClick={handleEducationUpdate}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mt-6"
          >
            Update Education
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="skillsTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="skillsTitle"
              name="title"
              value={skillsData.title}
              onChange={handleSkillsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Skills"
            />
          </div>
          <div>
            <label htmlFor="skillsSubtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              id="skillsSubtitle"
              name="subtitle"
              value={skillsData.subtitle}
              onChange={handleSkillsChange}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Here are the tools and technologies..."
            />
          </div>
          {skillsData.rows.map((row, rowIndex) => (
            <div key={rowIndex} className="border-t pt-4 mt-4 relative">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Row {rowIndex + 1}</h3>
              <div className="space-y-4">
                {row.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={skill.skillText}
                      onChange={(e) => handleSkillChange(rowIndex, skillIndex, e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Java"
                    />
                    {row.length > 1 && (
                      <button
                        onClick={() => removeSkillFromRow(rowIndex, skillIndex)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <i className="fa-solid fa-trash text-lg"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addSkillToRow(rowIndex)}
                  className="w-full py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center"
                >
                  <i className="fa-solid fa-plus mr-2"></i> Add Skill to Row
                </button>
              </div>
              {skillsData.rows.length > 1 && (
                <button
                  onClick={() => removeSkillRow(rowIndex)}
                  className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-800 transition"
                >
                  <i className="fa-solid fa-trash text-lg"></i>
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addSkillRow}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mt-4 flex items-center justify-center"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add New Row
          </button>
          <button
            onClick={handleSkillsUpdate}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mt-6"
          >
            Update Skills
          </button>
        </div>
      </div>
    </div>
  );
}