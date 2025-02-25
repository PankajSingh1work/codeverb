// src/app/project/[projectSlug]/[index]/page.js
import Link from "next/link";
import Image from "next/image";
import { database } from "../../../../lib/firebase";
import { ref, get } from "firebase/database";
import ClientMobileMenu from "../../../../components/ClientMobileMenu";

// Fetch data from Firebase
async function fetchFirebaseData(path) {
  try {
    const dataRef = ref(database, path);
    const snapshot = await get(dataRef);
    return snapshot.val() || {};
  } catch (error) {
    console.error(`Error fetching ${path}:`, error.message);
    return {};
  }
}

// Function to generate a slug from a string (SEO-friendly)
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Generate structured data for SEO
function generateStructuredData(project, projectSlug, index) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.hero?.title || "Project",
        description: project.hero?.description || "A project developed by Pankaj Singh showcasing technical expertise.",
        url: `https://codeverb.in/project/${projectSlug}/${index}`, // Replace with your actual domain
        image: project.details?.[0]?.image || "/demo_5.webp",
        creator: {
          "@type": "Person",
          name: "Pankaj Singh",
          sameAs: [
            "https://instagram.com/pankaj_rawat_991",
            "https://linkedin.com/in/pankajsingh1work",
            "https://github.com/PankajSingh1work",
          ],
        },
        dateCreated: new Date().toISOString(), // Adjust if creation date is available in data
        inLanguage: "en",
        keywords: project.hero?.title ? `${project.hero.title}, Pankaj Singh, project` : "Pankaj Singh, project",
        about: project.techStack?.items?.map((tech) => ({
          "@type": "DefinedTerm",
          name: tech.techName || "Technology",
          description: tech.description || "A technology used in this project.",
        })),
        hasPart: [
          ...(project.challenges?.cards?.map((challenge) => ({
            "@type": "CreativeWork",
            name: challenge.title || "Challenge",
            description: challenge.description || "A challenge faced during the project.",
          })) || []),
          ...(project.features?.cards?.map((feature) => ({
            "@type": "CreativeWork",
            name: feature.title || "Feature",
            description: feature.description || "A key feature of the project.",
          })) || []),
        ],
      },
      {
        "@type": "WebPage",
        url: `https://codeverb.in/project/${projectSlug}/${index}`,
        name: `${project.hero?.title || "Project"} - Pankaj Singh`,
        description: project.hero?.description || "Detailed view of a project by Pankaj Singh.",
        mainEntity: {
          "@type": "CreativeWork",
          name: project.hero?.title || "Project",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://codeverb.in/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Projects",
              item: "https://codeverb.in/projects",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: project.hero?.title || "Project",
              item: `https://codeverb.in/project/${projectSlug}/${index}`,
            },
          ],
        },
      },
    ],
  };
}

export default async function ProjectDetail({ params }) {
  const { projectSlug, index } = await params;
  const indexNum = parseInt(index, 10);

  if (!projectSlug || isNaN(indexNum)) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center">
        <p className="text-[#E0E0E0] text-base">Invalid project URL.</p>
      </div>
    );
  }

  const projectsPageData = await fetchFirebaseData("projectspage");
  const projectsList = Array.isArray(projectsPageData.projects_list) ? projectsPageData.projects_list : [];

  if (indexNum < 0 || indexNum >= projectsList.length) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center">
        <p className="text-[#E0E0E0] text-base">Project not found.</p>
      </div>
    );
  }

  const project = projectsList[indexNum];
  const expectedSlug = generateSlug(project.hero?.title || "project");

  if (projectSlug !== expectedSlug) {
    console.log("Slug mismatch:", { received: projectSlug, expected: expectedSlug });
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center">
        <p className="text-[#E0E0E0] text-base">Project not found.</p>
      </div>
    );
  }

  const structuredData = generateStructuredData(project, projectSlug, index);

  return (
    <div className="bg-[#121212] min-h-screen scroll-smooth">
      {/* Inject Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Navbar */}
      <header>
        <nav className="fixed top-0 left-0 w-full bg-[#181818] bg-opacity-80 shadow-md p-4 z-50" aria-label="Main Navigation">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" aria-label="Home">
                <Image src="/Logo_1024w_white.svg" alt="Pankaj Singh Logo" width={32} height={32} className="h-8 w-8" priority />
              </Link>
              <span className="text-2xl font-semibold text-[#FFFFFF]">Pankaj Singh</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link href="/#home" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">Home</Link>
              <Link href="/#about" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">About Me</Link>
              <Link href="/#services" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">Services</Link>
              <Link href="/#projects" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">Projects</Link>
              <Link href="/#achievements" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">Achievements</Link>
              <Link href="/#contact" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">Contact Me</Link>
            </div>
            <ClientMobileMenu />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative h-max w-full mx-auto bg-cover bg-center bg-no-repeat pt-[calc(4rem+40px)] md:pt-40 lg:pt-40"
          style={{ backgroundImage: `url(${project.hero?.backgroundImageLink || "/main_hero_bg.webp"})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold">{project.hero?.title || "Project Title"}</h1>
              <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed">{project.hero?.description || "Project description..."}</p>
              <div className="flex flex-wrap items-center gap-4">
                {project.hero?.buttons?.map((button, idx) => (
                  <Link
                    key={idx}
                    href={button.buttonLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#222222] text-[#E0E0E0] text-sm md:text-base hover:bg-[#333333] py-2 px-6 rounded-lg transition duration-300"
                    aria-label={`${button.buttonText} for ${project.hero?.title || "Project"}`}
                  >
                    <i className={`${button.iconLink || "fas fa-link"} text-lg mr-2`}></i>
                    <span className="text-xs">{button.buttonText || "View Project"}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Project Details Section */}
        <section id="project-details" className="py-16 bg-[#121212]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">Project Details</h2>
            {project.details?.map((detail, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center space-y-8 md:space-y-0 md:space-x-8 mb-16`}
              >
                <div className="w-full md:w-1/3 flex justify-center">
                  <Image
                    src={detail.image || "/demo_5.webp"}
                    alt={`${project.hero?.title || "Project"} - Detail Image ${idx + 1}`}
                    width={400}
                    height={400}
                    className="w-auto h-[400px] object-cover rounded-lg shadow-lg border-0 border-[#E0E0E0]"
                    loading="lazy"
                  />
                </div>
                <div className="w-full md:w-2/3 text-[#E0E0E0] space-y-6">
                  <p className="text-base lg:text-lg leading-relaxed">{detail.description1 || "Description 1"}</p>
                  <p className="text-base lg:text-lg leading-relaxed">{detail.description2 || "Description 2"}</p>
                  <p className="text-base lg:text-lg leading-relaxed">{detail.description3 || "Description 3"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="py-16 bg-[#121212]">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold mb-12">Tech Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
              {project.techStack?.items?.map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-[#E0E0E0]">
                    <i className={`${tech.techIconLink || "fas fa-code"} text-[#E0E0E0] text-3xl`}></i>
                  </div>
                  <span className="text-lg text-[#E0E0E0]">{tech.techName || "Technology"}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Challenges Section */}
        <section id="project-challenges" className="py-16 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] text-center mb-12">Project Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-x-12">
              {project.challenges?.cards?.map((challenge, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#1E1E1E] text-[#E0E0E0] rounded-full mx-auto md:mx-0">
                    <i className={`${challenge.iconLink || "fas fa-code"} text-2xl`}></i>
                  </div>
                  <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md glass">
                    <h3 className="text-xl font-semibold text-[#FFFFFF]">{challenge.title || "Challenge"}</h3>
                    <p className="text-sm text-[#E0E0E0] mt-2">{challenge.description || "Description of the challenge."}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.features?.cards?.map((feature, idx) => (
                <div key={idx} className="group relative bg-[#1E1E1E] p-6 rounded-lg shadow-md overflow-hidden glass">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E2E2E] to-transparent opacity-0 group-hover:opacity-80 transition duration-300"></div>
                  <div className="relative z-10 space-y-4">
                    <div className="w-14 h-14 flex items-center justify-center bg-[#0E0E0E] text-[#E0E0E0] rounded-full">
                      <i className={`${feature.iconLink || "fas fa-star"} text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-[#E0E0E0]">{feature.title || "Feature"}</h3>
                    <p className="text-sm text-[#B0B0B0] transition duration-300">{feature.description || "Feature description."}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#101010] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <div className="flex items-center justify-center sm:justify-start space-x-4">
              <Image src="/Logo_1024w_white.svg" alt="Pankaj Singh Logo" width={40} height={40} className="w-10 h-10 rounded-none" loading="lazy" />
              <div>
                <p className="text-[#FFFFFF] text-lg font-bold">Pankaj Singh</p>
                <p className="text-[#E0E0E0] text-sm">
                  <a href="mailto:rawatpanku991@gmail.com" aria-label="Email Pankaj Singh">rawatpanku991@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
          <nav className="flex space-x-6 justify-center" aria-label="Social Media Links">
            <Link href="https://instagram.com/pankaj_rawat_991" target="_blank" rel="noopener noreferrer" className="text-[#E0E0E0] hover:text-[#F0F0F0] transition" aria-label="Pankaj Singh on Instagram">
              <i className="fa-brands fa-instagram text-2xl"></i>
            </Link>
            <Link href="https://github.com/PankajSingh1work" target="_blank" rel="noopener noreferrer" className="text-[#E0E0E0] hover:text-[#F0F0F0] transition" aria-label="Pankaj Singh on GitHub">
              <i className="fa-brands fa-github text-2xl"></i>
            </Link>
            <Link href="https://www.linkedin.com/in/pankajsingh1work/" target="_blank" rel="noopener noreferrer" className="text-[#E0E0E0] hover:text-[#F0F0F0] transition" aria-label="Pankaj Singh on LinkedIn">
              <i className="fa-brands fa-linkedin text-2xl"></i>
            </Link>
          </nav>
          <div className="text-center sm:text-right mt-6 sm:mt-0 text-[#E0E0E0] text-sm">
            <p>© {new Date().getFullYear()} Pankaj Singh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { projectSlug, index } = await params;
  const indexNum = parseInt(index, 10);
  const projectsPageData = await fetchFirebaseData("projectspage");
  const projectsList = Array.isArray(projectsPageData.projects_list) ? projectsPageData.projects_list : [];

  if (isNaN(indexNum) || indexNum < 0 || indexNum >= projectsList.length) {
    return {
      title: "Project Not Found - Pankaj Singh",
      description: "The requested project could not be found.",
      robots: "noindex",
    };
  }

  const project = projectsList[indexNum];
  const expectedSlug = generateSlug(project.hero?.title || "project");

  if (projectSlug !== expectedSlug) {
    return {
      title: "Project Not Found - Pankaj Singh",
      description: "The requested project could not be found.",
      robots: "noindex",
    };
  }

  const techKeywords = project.techStack?.items?.map((tech) => tech.techName).join(", ") || "technology";
  const featureKeywords = project.features?.cards?.map((feature) => feature.title).join(", ") || "features";
  const challengeKeywords = project.challenges?.cards?.map((challenge) => challenge.title).join(", ") || "challenges";

  return {
    title: `${project.hero?.title || "Project"} - Pankaj Singh`,
    description: project.hero?.description || "Explore this project by Pankaj Singh showcasing innovative solutions and technical expertise.",
    keywords: `${project.hero?.title}, Pankaj Singh, project, ${techKeywords}, ${featureKeywords}, ${challengeKeywords}, mobile app development, UI/UX, tech stack`,
    robots: "index, follow",
    openGraph: {
      title: `${project.hero?.title || "Project"} - Pankaj Singh`,
      description: project.hero?.description || "Detailed view of a project by Pankaj Singh showcasing technical expertise and innovative features.",
      url: `https://codeverb.in/project/${projectSlug}/${index}`,
      type: "article",
      images: [
        {
          url: project.details?.[0]?.image || "/demo_5.webp",
          width: 400,
          height: 400,
          alt: `${project.hero?.title || "Project"} by Pankaj Singh`,
        },
      ],
      locale: "en_US",
      site_name: "Pankaj Singh Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.hero?.title || "Project"} - Pankaj Singh`,
      description: project.hero?.description || "Detailed view of a project by Pankaj Singh.",
      image: project.details?.[0]?.image || "/demo_5.webp",
      creator: "@pankaj_rawat_991", // Replace with your Twitter handle if applicable
    },
    alternates: {
      canonical: `https://codeverb.in/project/${projectSlug}/${index}`,
    },
  };
}