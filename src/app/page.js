// src/app/page.js
import Link from "next/link";
import Image from "next/image";
import ClientMobileMenu from "../components/ClientMobileMenu";
import ContactForm from "../components/ContactForm";


// Define metadata for SEO (removed unnecessary type annotation)
export const metadata = {
  title: "Pankaj Singh - Mobile App Developer Portfolio",
  description: "Explore the portfolio of Pankaj Singh, an aspiring mobile app developer crafting innovative mobile experiences. View projects, services, and achievements.",
  keywords: "Pankaj Singh, mobile app developer, portfolio, app development, projects, services, achievements , Pankaj Singh Rawat , Pankaj Singh Dehradun , Pankaj Singh Kashipur , Pankaj Singh Mobile Application Developer , Software Engineer , Shivalik College of Engineering , Government Polytechnic Kashipur , Codeverb by Pankaj Singh , Codeverb , Full Stack Developer in India, Web Developer Portfolio, Mobile App Developer in India, Next.js Developer Portfolio, Freelance Web Developer in India, UI/UX Designer & Developer, Best Web Developer in Uttarakhand, Full Stack App Developer in Dehradun, Professional Web Development Services, Hire a Freelance Web Developer, React.js Developer Portfolio, Next.js SEO Optimization Services, Firebase Database Integration, Web App Development Expert, CodeVerb Web Development, UI/UX Designer for Hire, Affordable Website Development India, Frontend Developer in Uttarakhand, Custom Website Development Services, Expert in Mobile App UI/UX, Pankaj Singh Rawat Developer Portfolio, CodeVerb Web & App Development, Hire Pankaj Singh for Web Projects, Best Freelancer Developer in Dehradun, CodeVerb Freelance Services, Pankaj Singh Rawat Full Stack Developer, CodeVerb YouTube Channel, Instagram Web Developer Codever.in, Hire CodeVerb for Custom Web Apps, Dehradun Based App Developer, Web Developer from Shivalik College of Engineering, Dehradun Web & App Development, Uttarakhand Full Stack Developer, Kashipur Website Development Services, Best Developer in Shivalik College, Web & App Solutions in Uttarakhand, Freelancer App Developer Kashipur, Mobile App UI/UX in Uttarakhand, CodeVerb India – Custom Development, Affordable Web Development in Dehradun , Home page of CODEVERB.IN codeverb.in , landing page codeverb.in , pankaj singh website home page , sections of codeverb.in services achievments projects contact rawatpanku991@gmail.com pankajsingh1work@gmail.com , youtube @codeberb-in , instgram @pankaj_rawat_991 , instagram @codeverb.in linkedin @pankajsingh1work , github @PankajSingh1work , codeverb.in",
  openGraph: {
    title: "Pankaj Singh - Mobile App Developer Portfolio",
    description: "Discover Pankaj Singh's work as a mobile app developer, showcasing projects, services, and achievements.",
    url: "https://codeverb.in", // Replace with your actual domain
    type: "website",
    images: [
      {
        url: "/Pankaj_Singh_Profile_Image.png", // Replace with a relevant image
        width: 1200,
        height: 630,
        alt: "Pankaj Singh Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Singh - Mobile App Developer",
    description: "Portfolio showcasing mobile app development projects and services by Pankaj Singh.",
    image: "/Pankaj_Singh_Profile_Image.png", // Replace with a relevant image
  },
  alternates: {
    canonical: "https://codeverb.in", // Replace with your actual domain
  },
};


// Fetch data from the API route
async function fetchData(path) {
  try {
    const res = await fetch(`http://localhost:3000/api/fetchData?path=${encodeURIComponent(path)}`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${path}:`, error.message);
    return path.includes('projects_list') || path.includes('certificates_list') ? [] : {};
  }
}

// Generate slugs for URLs
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Structured Data (JSON-LD) for SEO
function generateStructuredData(heroData, aboutData, projectsList, certificatesList) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Pankaj Singh",
        jobTitle: "Mobile App Developer",
        description: aboutData.description || "An aspiring mobile app developer crafting innovative mobile experiences.",
        url: "https://codeverb.in", // Replace with your actual domain
        image: heroData.imageLink || "/Pankaj_Singh_Profile_Image.png",
        sameAs: [
          "https://instagram.com/pankaj_rawat_991",
          "https://github.com/PankajSingh1work",
          "https://www.linkedin.com/in/pankajsingh1work/",
        ],
      },
      {
        "@type": "WebSite",
        url: "https://codeverb.in", // Replace with your actual domain
        name: "Pankaj Singh Portfolio",
        description: heroData.description || "Portfolio of Pankaj Singh, mobile app developer.",
      },
      {
        "@type": "CollectionPage",
        name: "Projects",
        url: "https://codeverb.in/projects", // Replace with your actual domain
        about: projectsList.map((project) => ({
          "@type": "CreativeWork",
          name: project.hero?.title || "Project",
          description: project.hero?.description || "A mobile app development project.",
          image: project.details?.[0]?.image || "/demo_5.webp",
        })),
      },
      {
        "@type": "CollectionPage",
        name: "Achievements",
        url: "https://codeverb.in/certificates", // Replace with your actual domain
        about: certificatesList.map((cert) => ({
          "@type": "EducationalOccupationalCredential",
          name: cert.hero?.title || "Certificate",
          description: `Issued by ${cert.hero?.issuedBy || "Issuer"}`,
          image: cert.details?.imageLink || "/demo_4.webp",
        })),
      },
    ],
  };
}

export default async function Home() {
  // Fetch data using the API route
  const heroData = await fetchData("homepage/hero");
  const aboutData = await fetchData("homepage/about");
  const servicesData = await fetchData("homepage/services");
  const projectsData = await fetchData("homepage/projects");
  const achievementsData = await fetchData("homepage/achievements");
  const contactData = await fetchData("homepage/contact");
  const projectsListRaw = await fetchData("projectspage/projects_list");
  const certificatesListRaw = await fetchData("certificatespage/certificates_list");

  const projectsList = Array.isArray(projectsListRaw) ? projectsListRaw.slice(0, 4) : [];
  const certificatesList = Array.isArray(certificatesListRaw) ? certificatesListRaw.slice(0, 3) : [];

  const structuredData = generateStructuredData(heroData, aboutData, projectsList, certificatesList);

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
          className="fixed top-0 left-0 w-full bg-[#181818] bg-opacity-95 shadow-sm p-4 z-50"
          aria-label="Main Navigation"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
            <div className="flex items-center space-x-4">
              <Link href="/" aria-label="Home">
                <Image
                  src="/Logo_1024w_white.svg"
                  alt="Pankaj Singh Logo"
                  width={32}
                  height={32}
                  priority
                />
              </Link>
              <span className="text-xl sm:text-2xl font-semibold text-[#FFFFFF]">
                Pankaj Singh
              </span>
            </div>
            <div className="hidden md:flex space-x-4 lg:space-x-6 mt-2 md:mt-0">
              <Link href="/#home" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-sm lg:text-base">
                Home
              </Link>
              <Link href="/#about" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-sm lg:text-base">
                About Me
              </Link>
              <Link href="/#services" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-sm lg:text-base">
                Services
              </Link>
              <Link href="/#projects" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-sm lg:text-base">
                Projects
              </Link>
              <Link href="/#achievements" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-sm lg:text-base">
                Achievements
              </Link>
              <Link href="/#contact" className="text-[#E0E0E0] hover:text-[#F0F0F0] text-sm lg:text-base">
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
          className="min-h-[80vh] flex items-center justify-center bg-[#121212] py-16 sm:py-20 md:py-28 lg:py-40 px-4 pt-[calc(4rem+20px)] sm:pt-[4rem]"
        >
          <div className="text-center max-w-4xl">
            <Image
              src={heroData.imageLink || "/PankaJ_Singh_Profile_Image.png"}
              alt="Pankaj Singh - Mobile App Developer"
              width={120}
              height={120}
              className="mx-auto rounded-full object-cover border-0 shadow-lg sm:w-32 sm:h-32 md:w-40 md:h-40"
              priority
            />
            <h1 className="mt-6 text-[#FFFFFF] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              {heroData.title || "Hi, I’m Pankaj Singh"}
            </h1>
            <h2 className="mt-2 text-[#E0E0E0] text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
              {heroData.subtitle || "Crafting the Future of Mobile Experiences"}
            </h2>
            <p className="mt-4 text-[#B0B0B0] text-sm sm:text-base md:text-lg leading-relaxed px-2">
              {heroData.description ||
                "An aspiring mobile app developer creating innovative solutions for modern challenges."}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-xs sm:max-w-sm mx-auto">
              {/* <Link
                href={heroData.primaryButtonLink || "/Pankaj_Singh_Resume.pdf"}
                className="bg-[#222222] text-[#E0E0E0] text-sm md:text-base hover:bg-[#333333] py-2 px-6 rounded-lg shadow transition"
                download={heroData.primaryButtonLink?.endsWith(".pdf") ? "Pankaj_Singh_Resume.pdf" : undefined}
                aria-label="Download Pankaj Singh's Resume"
              >
                {heroData.primaryButtonText || "Get Resume"}
              </Link> */}
              <a
                href={heroData.primaryButtonLink || "/Pankaj_Singh_Resume.pdf"}
                className="bg-[#222222] text-[#E0E0E0] text-sm md:text-base hover:bg-[#333333] py-2 px-6 rounded-lg shadow transition"
                download={heroData.primaryButtonLink?.endsWith(".pdf") ? "Pankaj_Singh_Resume.pdf" : undefined}
                aria-label="Download Pankaj Singh's Resume"
                target="_blank"
                rel="noopener noreferrer"
              >
                {heroData.primaryButtonText || "Get Resume"}
              </a>
              <Link
                href={heroData.secondaryButtonLink || "/projects"}
                className="bg-[#222222] text-[#E0E0E0] text-sm md:text-base hover:bg-[#333333] py-2 px-6 rounded-lg shadow transition flex items-center justify-center space-x-2"
                aria-label="View Pankaj Singh's Projects"
              >
                <span>{heroData.secondaryButtonText || "Projects"}</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-12 sm:py-16 bg-[#121212] flex items-center justify-center px-4 scroll-mt-20"
        >
          <div className="max-w-5xl flex flex-col items-center text-center md:flex-row md:text-left space-y-8 md:space-y-0 md:space-x-8">
            <Image
              src={aboutData.imageLink || "/PankaJ_Singh_Profile_Image.png"}
              alt="About Pankaj Singh - Mobile App Developer"
              width={280}
              height={360}
              className="object-cover rounded-lg shadow-lg w-full max-w-[320px] md:w-auto"
              loading="lazy"
            />
            <div className="flex-1">
              <h2 className="text-[#FFFFFF] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {aboutData.title || "About Me"}
              </h2>
              <p className="text-[#E0E0E0] text-sm sm:text-base md:text-lg leading-relaxed">
                {aboutData.description ||
                  "I’m Pankaj Singh, a passionate mobile app developer with a focus on creating user-friendly and innovative applications."}
              </p>
              <div className="mt-6">
                <Link
                  href={aboutData.buttonLink || "/about"}
                  className="bg-[#222222] text-[#E0E0E0] text-sm md:text-base hover:bg-[#333333] py-2 px-6 rounded-lg shadow transition"
                  aria-label="Learn More About Pankaj Singh"
                >
                  {`${aboutData.buttonText || "Know More"} →`}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-12 sm:py-16 bg-[#121212] flex flex-col items-center justify-center px-4 sm:px-6 scroll-mt-20"
        >
          <header className="text-center mb-8 sm:mb-12">
            <h2 className="text-[#FFFFFF] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              {servicesData.title || "Services"}
            </h2>
            <p className="text-[#E0E0E0] text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mt-2">
              {servicesData.subtitle || "What I Offer"}
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl w-full">
            {servicesData.cards?.map((service, index) => (
              <article
                key={index}
                className="bg-[#1E1E1E] hover:bg-[#2E2E2E] p-6 rounded-lg shadow-lg text-center"
              >
                <div
                  className="text-4xl sm:text-5xl mb-4"
                  style={{
                    color: ["#16A34A", "#2563EB", "#9333EA", "#CA8A04", "#DC2626", "#4F46E5"][index % 6],
                  }}
                  aria-hidden="true"
                >
                  <i className={service.iconLink || "fa-solid fa-question"}></i>
                </div>
                <h3 className="text-[#E0E0E0] text-base sm:text-lg md:text-xl font-semibold mb-2">
                  {service.title || "Service Title"}
                </h3>
                <p className="text-[#B0B0B0] text-sm sm:text-base md:text-lg leading-relaxed">
                  {service.description || "Service description goes here..."}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-12 sm:py-16 bg-[#121212] flex flex-col items-center justify-center scroll-mt-20"
        >
          <div className="max-w-7xl w-full px-4 sm:px-6">
            <header className="text-center mb-8 sm:mb-12">
              <h2 className="text-[#FFFFFF] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                {projectsData.title || "My Projects"}
              </h2>
              <p className="text-[#E0E0E0] text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                {projectsData.subtitle || "Some of My Work"}
              </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {projectsList.map((project, index) => (
                <article
                  key={index}
                  className="relative group w-full h-80 sm:h-96 rounded-lg shadow-xl overflow-hidden"
                >
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-2 z-10">
                    {project.techStack?.items?.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="bg-[#222222] text-[#E0E0E0] text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full"
                      >
                        {tech.techName || "Tech"}
                      </span>
                    ))}
                  </div>
                  <Image
                    src={project.details?.[0]?.image || "/demo_5.webp"}
                    alt={`${project.hero?.title || "Project"} by Pankaj Singh`}
                    width={400}
                    height={400}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 p-4 sm:p-6 w-full">
                    <h3 className="text-[#FFFFFF] text-base sm:text-lg font-semibold">
                      {project.hero?.title || "Project Title"}
                    </h3>
                    <p className="mt-1 sm:mt-2 line-clamp-3 text-[#E0E0E0] text-xs sm:text-sm">
                      {project.hero?.description || "Project description..."}
                    </p>
                    <Link
                      href={`/project/${generateSlug(project.hero?.title || "project")}/${index}`}
                      className="mt-2 sm:mt-4 inline-block text-[#e2cd2d] text-xs sm:text-sm font-semibold"
                      aria-label={`View details of ${project.hero?.title || "Project"}`}
                    >
                      View Project →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-8 sm:mt-12">
              <Link
                href={projectsData.buttonLink || "/projects"}
                className="bg-[#222222] text-[#E0E0E0] text-sm md:text-base hover:bg-[#333333] py-2 px-6 rounded-lg shadow transition inline-flex items-center space-x-2"
                aria-label="View All Projects by Pankaj Singh"
              >
                <span>{projectsData.buttonText || "Show All Projects"}</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section
          id="achievements"
          className="py-12 sm:py-16 bg-[#121212] flex flex-col items-center justify-center px-4 scroll-mt-20"
        >
          <div className="max-w-7xl w-full">
            <header className="text-center mb-8 sm:mb-12">
              <h2 className="text-[#FFFFFF] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                {achievementsData.title || "My Achievements"}
              </h2>
              <p className="text-[#E0E0E0] text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mt-2 max-w-3xl mx-auto">
                {achievementsData.subtitle || "A showcase of my skills and certifications"}
              </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {certificatesList.map((cert, index) => (
                <article
                  key={index}
                  className="group relative rounded-lg overflow-hidden shadow-xl transform transition duration-300 hover:scale-105"
                >
                  <Image
                    src={cert.details?.imageLink || "/demo_4.webp"}
                    alt={`${cert.hero?.title || "Certificate"} by Pankaj Singh`}
                    width={400}
                    height={288}
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 w-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                    <h3 className="text-base sm:text-lg font-semibold text-[#FFFFFF]">
                      {cert.hero?.title || "Certificate Title"}
                    </h3>
                    <p className="text-xs sm:text-sm mt-1 text-[#E0E0E0]">
                      Issued by: {cert.hero?.issuedBy || "Issuer"}
                    </p>
                    <p className="text-xs sm:text-sm mt-1 text-[#E0E0E0]">
                      Skills: {cert.skillsGained?.skills?.[0]?.skillTitle || "Skill"}
                    </p>
                    <Link
                      href={`/certificate/${generateSlug(cert.hero?.title || "certificate")}/${index}`}
                      className="mt-2 sm:mt-4 inline-block text-xs sm:text-sm font-semibold text-[#e2cd2d] hover:underline"
                      aria-label={`View details of ${cert.hero?.title || "Certificate"}`}
                    >
                      View Certificate →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={achievementsData.buttonLink || "/certificates"}
                className="bg-[#222222] text-[#E0E0E0] text-sm md:text-base hover:bg-[#333333] py-2 px-6 rounded-lg shadow transition inline-flex items-center space-x-2"
                aria-label="View All Certificates by Pankaj Singh"
              >
                <span>{achievementsData.buttonText || "Show All Certificates"}</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-12 sm:py-16 bg-[#121212] flex flex-col items-center justify-center px-4 sm:px-6 scroll-mt-20"
        >
          <header className="text-center mb-8 sm:mb-12">
            <h2 className="text-[#FFFFFF] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              {contactData.title || "Get in Touch"}
            </h2>
            <p className="text-[#E0E0E0] text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mt-2 max-w-3xl">
              {contactData.subtitle ||
                "Contact me for mobile app development services or collaboration opportunities."}
            </p>
          </header>
          <div className="w-full max-w-4xl">
            <ContactForm contactData={contactData} />
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