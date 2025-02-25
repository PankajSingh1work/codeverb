// src/app/about/page.js
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

// Define metadata for SEO
export const metadata = {
  title: "About Pankaj Singh - Mobile App Developer",
  description: "Learn more about Pankaj Singh, a passionate mobile app developer specializing in Android, iOS, UI/UX design, and software optimization.",
  keywords: "Pankaj Singh, about, mobile app developer, Android, iOS, UI/UX, software development, education, skills",
  openGraph: {
    title: "About Pankaj Singh - Mobile App Developer",
    description: "Discover Pankaj Singh's journey as a mobile app developer, including education, skills, and passion for technology.",
    url: "https://codeverb.in/about", // Replace with your actual domain
    type: "website",
    images: [
      {
        url: "/Pankaj_Singh_Profile_Image.png", // Replace with a relevant image
        width: 1200,
        height: 630,
        alt: "Pankaj Singh - About Me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pankaj Singh - Mobile App Developer",
    description: "Explore Pankaj Singh's background, skills, and passion for mobile app development.",
    image: "/Pankaj_Singh_Profile_Image.png", // Replace with a relevant image
  },
  alternates: {
    canonical: "https://codeverb.in/about", // Replace with your actual domain
  },
};

// Structured Data (JSON-LD) for SEO
function generateStructuredData(heroData, aboutData, educationData, skillsData) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Pankaj Singh",
        jobTitle: "Mobile App Developer",
        description: aboutData.description1 || "A passionate mobile app developer specializing in Android, iOS, and UI/UX design.",
        url: "https://codeverb.in/about", // Replace with your actual domain
        image: aboutData.imageLink || "/Pankaj_Singh_Profile_Image.png",
        sameAs: [
          "https://instagram.com/pankaj_rawat_991",
          "https://linkedin.com/in/pankajsingh1work",
          "https://github.com/PankajSingh1work",
        ],
        alumniOf: educationData.cards?.map((edu) => ({
          "@type": "EducationalOrganization",
          name: edu.instituteName || "Institute Name",
          description: edu.description || "Educational institution attended by Pankaj Singh.",
        })),
        knowsAbout: skillsData.rows?.flat().map((skill) => skill.skillText || "Skill"),
      },
      {
        "@type": "WebPage",
        url: "https://yourdomain.com/about", // Replace with your actual domain
        name: "About Pankaj Singh",
        description: heroData.description || "Learn about Pankaj Singh's journey in mobile app development.",
        mainEntity: {
          "@type": "Person",
          name: "Pankaj Singh",
        },
      },
    ],
  };
}

export default async function About() {
  const aboutPageData = await fetchFirebaseData("aboutpage");

  const heroData = aboutPageData.hero || {};
  const aboutData = aboutPageData.about || {};
  const educationData = aboutPageData.education || {};
  const skillsData = aboutPageData.skills || {};

  const structuredData = generateStructuredData(heroData, aboutData, educationData, skillsData);

  return (
    <div className="bg-[#121212] min-h-screen">
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
          className="h-max w-full mx-auto bg-cover bg-center bg-no-repeat pb-10 md:py-[7.5rem] lg:py-40 pt-[calc(4rem+20px)]"
          style={{ backgroundImage: `url(${heroData.backgroundImageLink || "/hero_bg.png"})` }}
        >
          <div className="flex items-center justify-center">
            <div className="w-full max-w-7xl px-6 space-y-6">
              <h1 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-start">
                {heroData.title || "Get to Know Me Better"}
              </h1>
              <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed md:max-w-2xl text-center md:text-start">
                {heroData.description ||
                  "I'm a passionate developer with a love for creating seamless user experiences. Let's connect and explore my journey."}
              </p>
              <div className="flex flex-col md:flex-row gap-4 text-center md:text-start justify-center md:justify-start items-center md:items-start">
                <Link
                  href={heroData.primaryButtonLink || "/projects"}
                  className="bg-[#222222] text-[#E0E0E0] hover:bg-[#333333] text-sm md:text-base py-2 px-6 rounded-lg transition w-full max-w-lg md:w-max"
                  aria-label="View Pankaj Singh's Projects"
                >
                  {heroData.primaryButtonText || "View Projects"}
                </Link>
                <Link
                  href={heroData.secondaryButtonLink || "/contact"}
                  className="bg-[#222222] text-[#E0E0E0] hover:bg-[#333333] text-sm md:text-base py-2 px-6 rounded-lg transition w-full max-w-lg md:w-max flex items-center justify-center space-x-2"
                  aria-label="Contact Pankaj Singh"
                >
                  <span>{heroData.secondaryButtonText || "Contact Me"}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        

        {/* About Section */}
        <section id="about" className="w-full max-w-7xl mx-auto px-6 py-10 bg-[#121212]">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
              <Image
                src={aboutData.imageLink || "/Pankaj_Singh_Profile_Image.png"}
                alt="Pankaj Singh - Mobile App Developer"
                width={320}
                height={420}
                className="w-80 h-[420px] object-cover rounded-lg shadow-lg border-0 border-[#E0E0E0]"
                loading="lazy"
              />
              <div className="flex flex-col space-y-4">
                <h2 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  {aboutData.title || "Hi, I'm Pankaj Singh!"}
                </h2>
                <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed">
                  {aboutData.description1 ||
                    "I am currently pursuing a Bachelor's degree in Computer Science Engineering. As a student, I am constantly exploring the ever-evolving world of technology, and I am deeply passionate about Android and iOS development, UI/UX design, software optimization, and database integration."}
                </p>
                <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed">
                  {aboutData.description2 ||
                    "My motivation stems from my creative mind and a constant desire to dive deep into the tech landscape. My major goal is to become a successful entrepreneur, equipped with a strong business mindset, a humble attitude, and the right strategies to make a lasting impact."}
                </p>
                <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed">
                  {aboutData.description3 ||
                    "I enjoy engaging with people, learning from different cultures, and understanding various mindsets. It helps me broaden my perspectives and approach challenges in new ways."}
                </p>
              </div>
            </div>
            <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed pt-3">
              {aboutData.description4 ||
                "I am driven by a love for technology and a strong desire to make a difference. Whether it's creating innovative software, optimizing solutions, or learning from diverse experiences, I am always looking for the next opportunity to grow."}
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold">
                {educationData.title || "Education"}
              </h2>
            </header>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[4px] bg-[#B0B0B0]"></div>
              {educationData.cards?.map((edu, index) => (
                <article
                  key={index}
                  className={`relative flex flex-col items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative">
                      <div className="bg-[#1E1E1E] text-[#FFFFFF] rounded-full h-12 w-auto px-2 flex items-center justify-center font-bold z-10">
                        {edu.year || "Year"}
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-12 h-full w-[2px] bg-[#B0B0B0]"></div>
                    </div>
                  </div>
                  <div
                    className={`w-full md:w-2/3 mt-6 md:mt-0 ${
                      index % 2 === 0 ? "md:ml-6" : "md:mr-6"
                    } border border-[#B0B0B0] rounded-lg p-6 bg-[#1E1E1E] shadow-lg`}
                  >
                    <h3 className="text-[#FFFFFF] text-lg md:text-xl lg:text-2xl font-semibold mb-2">
                      {edu.courseName || "Course Name"}
                    </h3>
                    <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed mb-2">
                      {edu.instituteName || "Institute Name"}
                    </p>
                    <p className="text-sm text-[#B0B0B0] mb-4">{edu.periodOrPassout || "Period"}</p>
                    <p className="text-[#E0E0E0] text-sm md:text-base leading-relaxed">
                      {edu.description || "Description"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <header>
              <h2 className="text-3xl font-bold text-[#FFFFFF] mb-6">
                {skillsData.title || "Skills"}
              </h2>
              <p className="text-[#E0E0E0] mb-8">
                {skillsData.subtitle || "Here are the tools and technologies I am proficient in:"}
              </p>
            </header>
            <div className="space-y-6">
              {skillsData.rows?.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap justify-center gap-4">
                  {row.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="rounded-full border border-[#444444] py-2 px-6 text-[#E0E0E0] bg-[#2E2E2E] hover:bg-[#1E1E1E] text-sm font-medium transition"
                    >
                      {skill.skillText || "Skill"}
                    </span>
                  ))}
                </div>
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