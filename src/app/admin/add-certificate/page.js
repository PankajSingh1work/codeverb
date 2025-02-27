"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, database } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import Link from "next/link";

// export const metadata = {
//   title: "Add Certificates - Pankaj Singh Admin",
//   description: "Admin panel to add and manage certificates for Pankaj Singh's portfolio.",
//   robots: "noindex, nofollow", // Prevent indexing by search engines
// };

export default function AddCertificateControl() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [certificates, setCertificates] = useState([
    {
      hero: {
        backgroundImageLink: "",
        title: "",
        description: "",
        issuedBy: "",
        certificateLink: "",
      },
      details: {
        title: "",
        imageLink: "",
        description1: "",
        description2: "",
        description3: "",
      },
      skillsGained: {
        title: "",
        skills: [{ iconLink: "", skillTitle: "", skillDescription: "" }],
      },
    },
  ]);

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

    const certificatesRef = ref(database, "certificatespage/certificates_list");
    onValue(
      certificatesRef,
      (snapshot) => {
        const data = snapshot.val() || [
          {
            hero: { backgroundImageLink: "", title: "", description: "", issuedBy: "", certificateLink: "" },
            details: { title: "", imageLink: "", description1: "", description2: "", description3: "" },
            skillsGained: { title: "", skills: [{ iconLink: "", skillTitle: "", skillDescription: "" }] },
          },
        ];
        setCertificates(data);
      },
      (error) => {
        console.error("Error fetching certificates:", error);
      }
    );
  }, [loading]);

  const handleChange = (index, section, field, value) => {
    setCertificates((prev) => {
      const newCertificates = [...prev];
      newCertificates[index] = {
        ...newCertificates[index],
        [section]: { ...newCertificates[index][section], [field]: value },
      };
      return newCertificates;
    });
  };

  const handleSkillChange = (certIndex, skillIndex, field, value) => {
    setCertificates((prev) => {
      const newCertificates = [...prev];
      const newSkills = [...newCertificates[certIndex].skillsGained.skills];
      newSkills[skillIndex] = { ...newSkills[skillIndex], [field]: value };
      newCertificates[certIndex].skillsGained.skills = newSkills;
      return newCertificates;
    });
  };

  const addSkill = (certIndex) => {
    setCertificates((prev) => {
      const newCertificates = [...prev];
      newCertificates[certIndex].skillsGained.skills = [
        ...newCertificates[certIndex].skillsGained.skills,
        { iconLink: "", skillTitle: "", skillDescription: "" },
      ];
      return newCertificates;
    });
  };

  const removeSkill = (certIndex, skillIndex) => {
    setCertificates((prev) => {
      const newCertificates = [...prev];
      const newSkills = newCertificates[certIndex].skillsGained.skills.filter((_, i) => i !== skillIndex);
      newCertificates[certIndex].skillsGained.skills =
        newSkills.length > 0 ? newSkills : [{ iconLink: "", skillTitle: "", skillDescription: "" }];
      return newCertificates;
    });
  };

  const addCertificate = () => {
    setCertificates((prev) => [
      ...prev,
      {
        hero: { backgroundImageLink: "", title: "", description: "", issuedBy: "", certificateLink: "" },
        details: { title: "", imageLink: "", description1: "", description2: "", description3: "" },
        skillsGained: { title: "", skills: [{ iconLink: "", skillTitle: "", skillDescription: "" }] },
      },
    ]);
  };

  const removeCertificate = (index) => {
    if (confirm("Are you sure you want to remove this certificate?")) {
      setCertificates((prev) => {
        const newCertificates = prev.filter((_, i) => i !== index);
        return newCertificates.length > 0
          ? newCertificates
          : [
              {
                hero: { backgroundImageLink: "", title: "", description: "", issuedBy: "", certificateLink: "" },
                details: { title: "", imageLink: "", description1: "", description2: "", description3: "" },
                skillsGained: { title: "", skills: [{ iconLink: "", skillTitle: "", skillDescription: "" }] },
              },
            ];
      });
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const certificatesRef = ref(database, "certificatespage/certificates_list");
      await set(certificatesRef, certificates);
      alert("Certificates updated successfully!");
    } catch (error) {
      alert(`Error updating certificates: ${error.message}`);
      console.error("Error updating certificates:", error);
    } finally {
      setSaving(false);
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
      <h1 className="text-4xl font-bold text-[#e2cd2d] mb-8">Add Certificates</h1>
      <Link href="/admin/dashboard" className="mb-6 text-[#e2cd2d] hover:underline">
        Back to Dashboard
      </Link>

      {certificates.map((cert, index) => (
        <div key={index} className="w-full max-w-2xl bg-[#1E1E1E] p-6 rounded-lg shadow-md mb-8 relative">
          <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Certificate {index + 1}</h2>

          {/* Hero Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-medium text-[#E0E0E0]">Hero Section</h3>
            <div>
              <label htmlFor={`backgroundImageLink-${index}`} className="block text-sm font-medium text-[#E0E0E0]">
                Background Image Link
              </label>
              <input
                type="text"
                id={`backgroundImageLink-${index}`}
                name="backgroundImageLink"
                value={cert.hero.backgroundImageLink}
                onChange={(e) => handleChange(index, "hero", "backgroundImageLink", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                placeholder="e.g., /android.jpg"
                disabled={saving}
              />
            </div>
            <div>
              <label htmlFor={`heroTitle-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Title</label>
              <input
                type="text"
                id={`heroTitle-${index}`}
                name="title"
                value={cert.hero.title}
                onChange={(e) => handleChange(index, "hero", "title", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                placeholder="e.g., Android Development Certificate"
                disabled={saving}
              />
            </div>
            <div>
              <label htmlFor={`heroDescription-${index}`} className="block text-sm font-medium text-[#E0E0E0]">
                Description
              </label>
              <textarea
                id={`heroDescription-${index}`}
                name="description"
                value={cert.hero.description}
                onChange={(e) => handleChange(index, "hero", "description", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                rows="4"
                placeholder="e.g., A deep dive into Android Development..."
                disabled={saving}
              />
            </div>
            <div>
              <label htmlFor={`issuedBy-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Issued By</label>
              <input
                type="text"
                id={`issuedBy-${index}`}
                name="issuedBy"
                value={cert.hero.issuedBy}
                onChange={(e) => handleChange(index, "hero", "issuedBy", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                placeholder="e.g., Coursera"
                disabled={saving}
              />
            </div>
            <div>
              <label htmlFor={`certificateLink-${index}`} className="block text-sm font-medium text-[#E0E0E0]">
                Certificate Link
              </label>
              <input
                type="text"
                id={`certificateLink-${index}`}
                name="certificateLink"
                value={cert.hero.certificateLink}
                onChange={(e) => handleChange(index, "hero", "certificateLink", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                placeholder="e.g., https://drive.google.com/certificate-link"
                disabled={saving}
              />
            </div>
          </div>

          {/* Certificate Details Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-medium text-[#E0E0E0]">Certificate Details</h3>
            <div>
              <label htmlFor={`detailsTitle-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Title</label>
              <input
                type="text"
                id={`detailsTitle-${index}`}
                name="title"
                value={cert.details.title}
                onChange={(e) => handleChange(index, "details", "title", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                placeholder="e.g., Certificate Details"
                disabled={saving}
              />
            </div>
            <div>
              <label htmlFor={`imageLink-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Image Link</label>
              <input
                type="text"
                id={`imageLink-${index}`}
                name="imageLink"
                value={cert.details.imageLink}
                onChange={(e) => handleChange(index, "details", "imageLink", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                placeholder="e.g., /demo_5.webp"
                disabled={saving}
              />
            </div>
            <div>
              <label htmlFor={`description1-${index}`} className="block text-sm font-medium text-[#E0E0E0]">
                Description 1
              </label>
              <textarea
                id={`description1-${index}`}
                name="description1"
                value={cert.details.description1}
                onChange={(e) => handleChange(index, "details", "description1", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                rows="4"
                placeholder="e.g., This certificate recognizes the successful completion..."
                disabled={saving}
              />
            </div>
            <div>
              <label htmlFor={`description2-${index}`} className="block text-sm font-medium text-[#E0E0E0]">
                Description 2
              </label>
              <textarea
                id={`description2-${index}`}
                name="description2"
                value={cert.details.description2}
                onChange={(e) => handleChange(index, "details", "description2", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                rows="4"
                placeholder="e.g., Participants will gain the knowledge required..."
                disabled={saving}
              />
            </div>
            <div>
              <label htmlFor={`description3-${index}`} className="block text-sm font-medium text-[#E0E0E0]">
                Description 3
              </label>
              <textarea
                id={`description3-${index}`}
                name="description3"
                value={cert.details.description3}
                onChange={(e) => handleChange(index, "details", "description3", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                rows="4"
                placeholder="e.g., By completing this course, participants demonstrate..."
                disabled={saving}
              />
            </div>
          </div>

          {/* Skills Gained Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-[#E0E0E0]">Skills Gained</h3>
            <div>
              <label htmlFor={`skillsTitle-${index}`} className="block text-sm font-medium text-[#E0E0E0]">Title</label>
              <input
                type="text"
                id={`skillsTitle-${index}`}
                name="title"
                value={cert.skillsGained.title}
                onChange={(e) => handleChange(index, "skillsGained", "title", e.target.value)}
                className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                placeholder="e.g., Skills Gained"
                disabled={saving}
              />
            </div>
            {cert.skillsGained.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="border-t border-[#444444] pt-4 mt-4 relative">
                <h4 className="text-lg font-medium text-[#E0E0E0] mb-2">Skill {skillIndex + 1}</h4>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`iconLink-${index}-${skillIndex}`}
                      className="block text-sm font-medium text-[#E0E0E0]"
                    >
                      Icon Link (Font Awesome Class)
                    </label>
                    <input
                      type="text"
                      id={`iconLink-${index}-${skillIndex}`}
                      value={skill.iconLink}
                      onChange={(e) => handleSkillChange(index, skillIndex, "iconLink", e.target.value)}
                      className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                      placeholder="e.g., fas fa-cogs"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`skillTitle-${index}-${skillIndex}`}
                      className="block text-sm font-medium text-[#E0E0E0]"
                    >
                      Skill Title
                    </label>
                    <input
                      type="text"
                      id={`skillTitle-${index}-${skillIndex}`}
                      value={skill.skillTitle}
                      onChange={(e) => handleSkillChange(index, skillIndex, "skillTitle", e.target.value)}
                      className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                      placeholder="e.g., Problem Solving"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`skillDescription-${index}-${skillIndex}`}
                      className="block text-sm font-medium text-[#E0E0E0]"
                    >
                      Skill Description
                    </label>
                    <textarea
                      id={`skillDescription-${index}-${skillIndex}`}
                      value={skill.skillDescription}
                      onChange={(e) => handleSkillChange(index, skillIndex, "skillDescription", e.target.value)}
                      className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
                      rows="3"
                      placeholder="e.g., Developed problem-solving skills by..."
                      disabled={saving}
                    />
                  </div>
                </div>
                {cert.skillsGained.skills.length > 1 && (
                  <button
                    onClick={() => removeSkill(index, skillIndex)}
                    className="absolute top-4 right-4 text-[#DC2626] hover:text-[#b91c1c] transition disabled:opacity-50"
                    disabled={saving}
                  >
                    <i className="fa-solid fa-trash text-lg"></i>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addSkill(index)}
              className="w-full py-1 bg-[#2563EB] text-[#FFFFFF] rounded-md hover:bg-[#1e4fc3] transition flex items-center justify-center disabled:bg-[#666666] disabled:cursor-not-allowed"
              disabled={saving}
            >
              <i className="fa-solid fa-plus mr-2"></i> Add Skill
            </button>
          </div>

          {/* Remove Certificate Button */}
          {certificates.length > 1 && (
            <button
              onClick={() => removeCertificate(index)}
              className="absolute top-4 right-4 bg-[#DC2626] text-[#FFFFFF] p-2 rounded-full hover:bg-[#b91c1c] transition disabled:opacity-50"
              disabled={saving}
            >
              <i className="fa-solid fa-trash text-lg"></i>
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addCertificate}
        className="w-full max-w-2xl py-2 bg-[#2563EB] text-[#FFFFFF] rounded-md hover:bg-[#1e4fc3] transition flex items-center justify-center mb-8 disabled:bg-[#666666] disabled:cursor-not-allowed"
        disabled={saving}
      >
        <i className="fa-solid fa-plus mr-2"></i> Add New Certificate
      </button>

      <button
        onClick={handleUpdate}
        className="w-full max-w-2xl py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition disabled:bg-[#666666] disabled:cursor-not-allowed"
        disabled={saving}
      >
        {saving ? "Updating..." : "Update Certificates"}
      </button>
    </div>
  );
}