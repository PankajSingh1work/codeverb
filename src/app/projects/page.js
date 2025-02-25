// src/app/projects/page.js
import Link from "next/link";
import Image from "next/image";
import { database } from "../../lib/firebase"; // Adjust path as per your structure
import { ref, get } from "firebase/database";
import ClientMobileMenu from "../../components/ClientMobileMenu"; // Adjust path as needed

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
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .trim() // Remove leading/trailing whitespace
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Collapse multiple hyphens
}

// Generate structured data for SEO
function generateStructuredData(projectsList) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: "https://codeverb.in/projects", // Replace with your actual domain
        name: "Pankaj Singh - Projects",
        description: "A collection of projects by Pankaj Singh showcasing expertise in mobile app development, UI/UX, and innovative solutions.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projectsList.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: project.hero?.title || "Project",
              description: project.hero?.description || "A project developed by Pankaj Singh.",
              url: `https://codeverb.in/project/${generateSlug(project.hero?.title || "project")}/${index}`, // Replace with your actual domain
              image: project.hero?.backgroundImageLink || "/demo_5.webp",
              creator: {
                "@type": "Person",
                name: "Pankaj Singh",
              },
            },
          })),
        },
      },
      {
        "@type": "Person",
        name: "Pankaj Singh",
        jobTitle: "Mobile App Developer",
        url: "https://codeverb.in", // Replace with your actual domain
        sameAs: [
          "https://instagram.com/pankaj_rawat_991",
          "https://linkedin.com/in/pankajsingh1work",
          "https://github.com/PankajSingh1work",
        ],
      },
    ],
  };
}

export default async function Projects() {
  // Fetch the entire projectspage data
  const projectsPageData = await fetchFirebaseData("projectspage");

  // Extract hero data for the Hero section
  const heroData = projectsPageData.hero || {};

  // Extract projects data for the Projects section
  const projectsData = projectsPageData.projects || {};
  const projectsListRaw = projectsPageData.projects_list || [];
  const projectsList = Array.isArray(projectsListRaw) ? projectsListRaw : [];

  const structuredData = generateStructuredData(projectsList);

  return (
    <div className="bg-[#121212] min-h-screen scroll-smooth">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Navbar */}
      <header>
        <nav
          className="fixed top-0 left-0 w-full bg-[#181818] bg-opacity-80 shadow-md p-4 z-50"
          aria-label="Main Navigation"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" aria-label="Home">
                <Image
                  src="/Logo_1024w_white.svg"
                  alt="Pankaj Singh Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                  priority
                />
              </Link>
              <span className="text-2xl font-semibold text-[#FFFFFF]">Pankaj Singh</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link href="/#home" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">
                Home
              </Link>
              <Link href="/#about" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">
                About Me
              </Link>
              <Link href="/#services" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">
                Services
              </Link>
              <Link href="/#projects" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">
                Projects
              </Link>
              <Link href="/#achievements" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">
                Achievements
              </Link>
              <Link href="/#contact" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-base">
                Contact Me
              </Link>
            </div>
            <ClientMobileMenu />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section
          id="home"
          className="h-max w-full mx-auto bg-cover bg-center bg-no-repeat pb-10 md:py-[120px] lg:py-40 pt-[calc(4rem+30px)]"
          style={{ backgroundImage: `url(${heroData.backgroundImageLink || "/hero_bg.png"})` }}
        >
          <div className="flex items-center justify-center">
            <div className="w-full max-w-7xl px-6 space-y-6">
              <h1 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left">
                {heroData.title || "Innovative Solutions Through Projects"}
              </h1>
              <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed max-w-xl md:max-w-2xl text-center md:text-left">
                {heroData.description || "Explore a range of projects that showcase my expertise in Android development, iOS development, UI/UX design, and innovative solutions."}
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Link
                  href={heroData.primaryButtonLink || "/#projects"}
                  className="bg-[#222222] text-[#E0E0E0] hover:bg-[#333333] text-sm md:text-base py-2 px-6 rounded-lg transition w-max"
                  aria-label="View Pankaj Singh's Projects"
                >
                  {heroData.primaryButtonText || "View Projects"}
                </Link>
                <Link
                  href={heroData.secondaryButtonLink || "/#contact"}
                  className="bg-[#222222] text-[#E0E0E0] hover:bg-[#333333] text-sm md:text-base py-2 px-6 rounded-lg transition w-max"
                  aria-label="Contact Pankaj Singh"
                >
                  {heroData.secondaryButtonText || "Contact Me"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-8 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold">
                {projectsData.title || "My Projects"}
              </h2>
              <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed mt-4 max-w-3xl mx-auto">
                {projectsData.description || "Explore a collection of my diverse projects, where I combine creativity, problem-solving, and cutting-edge technologies to build solutions that are both innovative and user-friendly. Each project reflects my dedication to crafting experiences that make a difference."}
              </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {projectsList.map((project, index) => (
                <article
                  key={index}
                  className="relative group w-full h-[400px] overflow-hidden rounded-lg shadow-xl"
                >
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {project.techStack?.items?.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="bg-[#222222] text-[#E0E0E0] text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {tech.techName || "Tech"}
                      </span>
                    ))}
                  </div>
                  <Image
                    src={project.hero?.backgroundImageLink || "/demo_5.webp"}
                    alt={`${project.hero?.title || "Project"} by Pankaj Singh`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-125"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 p-6 w-full">
                    <h3 className="text-[#FFFFFF] text-lg font-semibold">
                      {project.hero?.title || "Project Title"}
                    </h3>
                    <p className="mt-2 line-clamp-4 text-[#E0E0E0] text-sm">
                      {project.hero?.description || "Project description..."}
                    </p>
                    <Link
                      href={`/project/${generateSlug(project.hero?.title || "project")}/${index}`}
                      className="mt-4 inline-block text-[#e2cd2d] text-sm font-semibold"
                      aria-label={`View details of ${project.hero?.title || "Project"}`}
                    >
                      View Project →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#101010] py-6 sm:py-8 px-4 sm:px-6" itemScope itemType="https://schema.org/WPFooter">
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
    <div className="text-center sm:text-left" itemScope itemType="https://schema.org/Person">
      <div className="flex items-center justify-center sm:justify-start space-x-4">
        <Image
          src="/Logo_1024w_white.svg"
          alt="Codeverb Logo - Pankaj Singh's Portfolio"
          width={36}
          height={36}
          className="rounded-none sm:w-10 sm:h-10"
          loading="lazy"
        />
        <div>
          <p className="text-[#FFFFFF] text-base sm:text-lg font-bold" itemProp="name">
            Pankaj Singh
          </p>
          <p className="text-[#E0E0E0] text-xs sm:text-sm">
            <a href="mailto:rawatpanku991@gmail.com" aria-label="Email Pankaj Singh - Codeverb" itemProp="email">
              rawatpanku991@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
    <nav className="flex space-x-4 sm:space-x-6" aria-label="Social Media Links" itemScope itemType="https://schema.org/SocialMediaPosting">
      <Link
        href="https://www.instagram.com/codeverb.in/"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-[#E0E0E0] hover:text-[#F0F0F0] transition"
        aria-label="Codeverb on Instagram - Web Development Content"
        title="Follow Codeverb on Instagram"
      >
        <i className="fa-brands fa-instagram text-xl sm:text-2xl"></i>
      </Link>
      <Link
        href="https://www.youtube.com/@codeverb-in"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-[#E0E0E0] hover:text-[#F0F0F0] transition"
        aria-label="Codeverb on YouTube - Coding Tutorials"
        title="Subscribe to Codeverb on YouTube"
      >
        <i className="fa-brands fa-youtube text-xl sm:text-2xl"></i>
      </Link>
      <Link
        href="https://github.com/PankajSingh1work"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-[#E0E0E0] hover:text-[#F0F0F0] transition"
        aria-label="Pankaj Singh on GitHub - Open Source Projects"
        title="View Pankaj Singh's GitHub Repositories"
      >
        <i className="fa-brands fa-github text-xl sm:text-2xl"></i>
      </Link>
      <Link
        href="https://www.linkedin.com/in/pankajsingh1work/"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-[#E0E0E0] hover:text-[#F0F0F0] transition"
        aria-label="Pankaj Singh on LinkedIn - Professional Profile"
        title="Connect with Pankaj Singh on LinkedIn"
      >
        <i className="fa-brands fa-linkedin text-xl sm:text-2xl"></i>
      </Link>
    </nav>
    <div className="text-center sm:text-right text-[#E0E0E0] text-xs sm:text-sm" itemScope itemType="https://schema.org/CreativeWork">
      <p itemProp="copyrightNotice">
        © {new Date().getFullYear()} Pankaj Singh. All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  );
}

// Define metadata for SEO
export const metadata = {
  title: "Pankaj Singh - Projects Showcase",
  description: "Discover Pankaj Singh's portfolio of projects, featuring expertise in Android development, iOS development, UI/UX design, and innovative tech solutions.",
  keywords: "Pankaj Singh, mobile app developer, portfolio, app development, projects, services, achievements , Pankaj Singh Rawat , Pankaj Singh Dehradun , Pankaj Singh Kashipur , Pankaj Singh Mobile Application Developer , Software Engineer , Shivalik College of Engineering , Government Polytechnic Kashipur , Codeverb by Pankaj Singh , Codeverb , Full Stack Developer in India, Web Developer Portfolio, Mobile App Developer in India, Next.js Developer Portfolio, Freelance Web Developer in India, UI/UX Designer & Developer, Best Web Developer in Uttarakhand, Full Stack App Developer in Dehradun, Professional Web Development Services, Hire a Freelance Web Developer, React.js Developer Portfolio, Next.js SEO Optimization Services, Firebase Database Integration, Web App Development Expert, CodeVerb Web Development, UI/UX Designer for Hire, Affordable Website Development India, Frontend Developer in Uttarakhand, Custom Website Development Services, Expert in Mobile App UI/UX, Pankaj Singh Rawat Developer Portfolio, CodeVerb Web & App Development, Hire Pankaj Singh for Web Projects, Best Freelancer Developer in Dehradun, CodeVerb Freelance Services, Pankaj Singh Rawat Full Stack Developer, CodeVerb YouTube Channel, Instagram Web Developer Codever.in, Hire CodeVerb for Custom Web Apps, Dehradun Based App Developer, Web Developer from Shivalik College of Engineering, Dehradun Web & App Development, Uttarakhand Full Stack Developer, Kashipur Website Development Services, Best Developer in Shivalik College, Web & App Solutions in Uttarakhand, Freelancer App Developer Kashipur, Mobile App UI/UX in Uttarakhand, CodeVerb India – Custom Development, Affordable Web Development in Dehradun",
  openGraph: {
    title: "Pankaj Singh - Projects Showcase",
    description: "Explore Pankaj Singh's projects, blending creativity and cutting-edge technology in mobile app development and UI/UX design.",
    url: "https://codeverb.in/projects", // Replace with your actual domain
    type: "website",
    images: [
      {
        url: "/demo_5.webp", // Replace with a relevant image
        width: 400,
        height: 400,
        alt: "Pankaj Singh Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Singh - Projects Showcase",
    description: "View Pankaj Singh's innovative projects in mobile app development and UI/UX design.",
    image: "/demo_5.webp", // Replace with a relevant image
  },
  alternates: {
    canonical: "https://codeverb.in/projects", // Replace with your actual domain
  },
};