"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, database } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import Link from "next/link";

// export const metadata = {
//   title: "Control About Page - Pankaj Singh Admin",
//   description: "Admin panel to manage content for Pankaj Singh's about page.",
//   robots: "noindex, nofollow", // Prevent indexing by search engines
// };

export default function AboutControl() {
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

  const [aboutData, setAboutData] = useState({
    title: "",
    imageLink: "",
    description1: "",
    description2: "",
    description3: "",
    description4: "",
  });

  const [educationData, setEducationData] = useState({
    title: "",
    cards: [{ year: "", courseName: "", instituteName: "", periodOrPassout: "", description: "" }],
  });

  const [skillsData, setSkillsData] = useState({
    title: "",
    subtitle: "",
    rows: [[{ skillText: "" }]],
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
      { path: "aboutpage/hero", setter: setHeroData },
      { path: "aboutpage/about", setter: setAboutData },
      { path: "aboutpage/education", setter: setEducationData },
      { path: "aboutpage/skills", setter: setSkillsData },
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

  const handleEducationCardChange = (index, field, value) => {
    setEducationData((prev) => {
      const newCards = [...prev.cards];
      newCards[index] = { ...newCards[index], [field]: value };
      return { ...prev, cards: newCards };
    });
  };

  const addEducationCard = () => {
    setEducationData((prev) => ({
      ...prev,
      cards: [...prev.cards, { year: "", courseName: "", instituteName: "", periodOrPassout: "", description: "" }],
    }));
  };

  const removeEducationCard = (index) => {
    setEducationData((prev) => {
      const newCards = prev.cards.filter((_, i) => i !== index);
      return { ...prev, cards: newCards.length > 0 ? newCards : [{ year: "", courseName: "", instituteName: "", periodOrPassout: "", description: "" }] };
    });
  };

  const handleSkillChange = (rowIndex, skillIndex, value) => {
    setSkillsData((prev) => {
      const newRows = [...prev.rows];
      newRows[rowIndex] = newRows[rowIndex].map((skill, i) => (i === skillIndex ? { skillText: value } : skill));
      return { ...prev, rows: newRows };
    });
  };

  const addSkillToRow = (rowIndex) => {
    setSkillsData((prev) => {
      const newRows = [...prev.rows];
      newRows[rowIndex] = [...newRows[rowIndex], { skillText: "" }];
      return { ...prev, rows: newRows };
    });
  };

  const removeSkillFromRow = (rowIndex, skillIndex) => {
    setSkillsData((prev) => {
      const newRows = [...prev.rows];
      newRows[rowIndex] = newRows[rowIndex].filter((_, i) => i !== skillIndex);
      if (newRows[rowIndex].length === 0) newRows[rowIndex] = [{ skillText: "" }];
      return { ...prev, rows: newRows };
    });
  };

  const addSkillRow = () => {
    setSkillsData((prev) => ({
      ...prev,
      rows: [...prev.rows, [{ skillText: "" }]],
    }));
  };

  const removeSkillRow = (rowIndex) => {
    setSkillsData((prev) => {
      const newRows = prev.rows.filter((_, i) => i !== rowIndex);
      return { ...prev, rows: newRows.length > 0 ? newRows : [[{ skillText: "" }]] };
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
      <h1 className="text-4xl font-bold text-[#e2cd2d] mb-8">Control About Page</h1>
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
              placeholder="e.g., Get to Know Me Better"
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
              placeholder="e.g., I'm a passionate developer with a love for..."
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
            onClick={updateSection("aboutpage/hero", heroData, "Hero")}
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
              placeholder="e.g., Hi I'm Pankaj Singh!"
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
            <label htmlFor="description1" className="block text-sm font-medium text-[#E0E0E0]">Description 1</label>
            <textarea
              id="description1"
              name="description1"
              value={aboutData.description1}
              onChange={handleChange(setAboutData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              rows="4"
              placeholder="e.g., I am currently pursuing a Bachelor's degree..."
              disabled={saving["About"]}
            />
          </div>
          <div>
            <label htmlFor="description2" className="block text-sm font-medium text-[#E0E0E0]">Description 2</label>
            <textarea
              id="description2"
              name="description2"
              value={aboutData.description2}
              onChange={handleChange(setAboutData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              rows="4"
              placeholder="e.g., My motivation stems from my creative mind..."
              disabled={saving["About"]}
            />
          </div>
          <div>
            <label htmlFor="description3" className="block text-sm font-medium text-[#E0E0E0]">Description 3</label>
            <textarea
              id="description3"
              name="description3"
              value={aboutData.description3}
              onChange={handleChange(setAboutData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              rows="4"
              placeholder="e.g., I enjoy engaging with people..."
              disabled={saving["About"]}
            />
          </div>
          <div>
            <label htmlFor="description4" className="block text-sm font-medium text-[#E0E0E0]">Description 4</label>
            <textarea
              id="description4"
              name="description4"
              value={aboutData.description4}
              onChange={handleChange(setAboutData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              rows="4"
              placeholder="e.g., I am driven by a love for technology..."
              disabled={saving["About"]}
            />
          </div>
          <button
            onClick={updateSection("aboutpage/about", aboutData, "About")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["About"]}
          >
            {saving["About"] ? "Updating..." : "Update About"}
          </button>
        </div>
      </div>

      {/* Education Section */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Education Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="educationTitle" className="block text-sm font-medium text-[#E0E0E0]">Title</label>
            <input
              type="text"
              id="educationTitle"
              name="title"
              value={educationData.title}
              onChange={handleChange(setEducationData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Education"
              disabled={saving["Education"]}
            />
          </div>
          {educationData.cards.map((card, index) => (
            <div key={index} className="border-t border-[#444444] pt-4 mt-4 relative">
              <h3 className="text-lg font-medium text-[#E0E0E0] mb-2">Education Card {index + 1}</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor={`year-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Year</label>
                  <input
                    type="text"
                    id={`year-${index}`}
                    value={card.year}
                    onChange={(e) => handleEducationCardChange(index, "year", e.target.value)}
                    className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                    placeholder="e.g., 2026"
                    disabled={saving["Education"]}
                  />
                </div>
                <div>
                  <label htmlFor={`courseName-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Course Name</label>
                  <input
                    type="text"
                    id={`courseName-${index}`}
                    value={card.courseName}
                    onChange={(e) => handleEducationCardChange(index, "courseName", e.target.value)}
                    className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                    placeholder="e.g., B.Tech in Computer Science & Engineering"
                    disabled={saving["Education"]}
                  />
                </div>
                <div>
                  <label htmlFor={`instituteName-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Institute Name</label>
                  <input
                    type="text"
                    id={`instituteName-${index}`}
                    value={card.instituteName}
                    onChange={(e) => handleEducationCardChange(index, "instituteName", e.target.value)}
                    className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                    placeholder="e.g., Shivalik College of Engineering"
                    disabled={saving["Education"]}
                  />
                </div>
                <div>
                  <label htmlFor={`periodOrPassout-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Period or Passout</label>
                  <input
                    type="text"
                    id={`periodOrPassout-${index}`}
                    value={card.periodOrPassout}
                    onChange={(e) => handleEducationCardChange(index, "periodOrPassout", e.target.value)}
                    className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                    placeholder="e.g., 2023 - 2026 (Present)"
                    disabled={saving["Education"]}
                  />
                </div>
                <div>
                  <label htmlFor={`description-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Description</label>
                  <textarea
                    id={`description-${index}`}
                    value={card.description}
                    onChange={(e) => handleEducationCardChange(index, "description", e.target.value)}
                    className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                    rows="3"
                    placeholder="e.g., Currently pursuing my Bachelor's degree..."
                    disabled={saving["Education"]}
                  />
                </div>
              </div>
              {educationData.cards.length > 1 && (
                <button
                  onClick={() => removeEducationCard(index)}
                  className="absolute top-4 right-4 bg-[#DC2626] text-[#FFFFFF] p-2 rounded-full hover:bg-[#b91c1c] transition disabled:opacity-50"
                  disabled={saving["Education"]}
                >
                  <i className="fa-solid fa-trash text-lg"></i>
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addEducationCard}
            className="w-full py-2 bg-[#2563EB] text-[#FFFFFF] rounded-md hover:bg-[#1e4fc3] transition mt-4 flex items-center justify-center disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Education"]}
          >
            <i className="fa-solid fa-plus mr-2"></i> Add New Education Card
          </button>
          <button
            onClick={updateSection("aboutpage/education", educationData, "Education")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Education"]}
          >
            {saving["Education"] ? "Updating..." : "Update Education"}
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <div className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Skills Section</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="skillsTitle" className="block text-sm font-medium text-[#E0E0E0]">Title</label>
            <input
              type="text"
              id="skillsTitle"
              name="title"
              value={skillsData.title}
              onChange={handleChange(setSkillsData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Skills"
              disabled={saving["Skills"]}
            />
          </div>
          <div>
            <label htmlFor="skillsSubtitle" className="block text-sm font-medium text-[#E0E0E0]">Subtitle</label>
            <input
              type="text"
              id="skillsSubtitle"
              name="subtitle"
              value={skillsData.subtitle}
              onChange={handleChange(setSkillsData)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              placeholder="e.g., Here are the tools and technologies..."
              disabled={saving["Skills"]}
            />
          </div>
          {skillsData.rows.map((row, rowIndex) => (
            <div key={rowIndex} className="border-t border-[#444444] pt-4 mt-4 relative">
              <h3 className="text-lg font-medium text-[#E0E0E0] mb-2">Row {rowIndex + 1}</h3>
              <div className="space-y-4">
                {row.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={skill.skillText}
                      onChange={(e) => handleSkillChange(rowIndex, skillIndex, e.target.value)}
                      className="w-full p-2 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                      placeholder="e.g., Java"
                      disabled={saving["Skills"]}
                    />
                    {row.length > 1 && (
                      <button
                        onClick={() => removeSkillFromRow(rowIndex, skillIndex)}
                        className="text-[#DC2626] hover:text-[#b91c1c] transition disabled:opacity-50"
                        disabled={saving["Skills"]}
                      >
                        <i className="fa-solid fa-trash text-lg"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addSkillToRow(rowIndex)}
                  className="w-full py-1 bg-[#2563EB] text-[#FFFFFF] rounded-md hover:bg-[#1e4fc3] transition flex items-center justify-center disabled:bg-[#666666] disabled:cursor-not-allowed"
                  disabled={saving["Skills"]}
                >
                  <i className="fa-solid fa-plus mr-2"></i> Add Skill to Row
                </button>
              </div>
              {skillsData.rows.length > 1 && (
                <button
                  onClick={() => removeSkillRow(rowIndex)}
                  className="absolute top-4 right-4 bg-[#DC2626] text-[#FFFFFF] p-2 rounded-full hover:bg-[#b91c1c] transition disabled:opacity-50"
                  disabled={saving["Skills"]}
                >
                  <i className="fa-solid fa-trash text-lg"></i>
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addSkillRow}
            className="w-full py-2 bg-[#2563EB] text-[#FFFFFF] rounded-md hover:bg-[#1e4fc3] transition mt-4 flex items-center justify-center disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Skills"]}
          >
            <i className="fa-solid fa-plus mr-2"></i> Add New Row
          </button>
          <button
            onClick={updateSection("aboutpage/skills", skillsData, "Skills")}
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition mt-6 disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={saving["Skills"]}
          >
            {saving["Skills"] ? "Updating..." : "Update Skills"}
          </button>
        </div>
      </div>
    </div>
  );
}