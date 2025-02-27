// src/app/certificates/page.js
import Link from "next/link";
import Image from "next/image";
import ClientMobileMenu from "../../components/ClientMobileMenu";

// Fetch data from API route with ISR
async function fetchData(path) {
  try {
    const res = await fetch(`http://codeverb.in/api/fetchData?path=${encodeURIComponent(path)}`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${path}:`, error.message);
    return path.includes('projects_list') || path.includes('certificates_list') ? [] : {};
  }
}

// Function to generate a slug from a string
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Generate structured data for SEO
function generateStructuredData(certificatesList) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: "https://codeverb.in/certificates",
        name: "Pankaj Singh - Certifications",
        description: "A collection of certifications earned by Pankaj Singh, showcasing expertise in mobile app development and related fields.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: certificatesList.map((cert, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "EducationalOccupationalCredential",
              name: cert.hero?.title || "Certificate",
              description: cert.hero?.description || "A certificate earned by Pankaj Singh.",
              url: `https://codeverb.in/certificate/${generateSlug(cert.hero?.title || "certificate")}/${index}`,
              image: cert.details?.imageLink || "/demo_4.webp",
              issuer: {
                "@type": "Organization",
                name: cert.hero?.issuedBy || "Issuer",
              },
            },
          })),
        },
      },
      {
        "@type": "Person",
        name: "Pankaj Singh",
        jobTitle: "Mobile App Developer",
        url: "https://codeverb.in",
        sameAs: [
          "https://instagram.com/pankaj_rawat_991",
          "https://linkedin.com/in/pankajsingh1work",
          "https://github.com/PankajSingh1work",
        ],
      },
    ],
  };
}

export default async function Certificates() {
  // Fetch the entire certificatespage data
  const certificatesPageData = await fetchData("certificatespage");
  console.log('Runtime Certificates Page Data:', certificatesPageData);

  // Extract hero data for the Hero section
  const heroData = certificatesPageData.hero || {};

  // Extract certificates data for the Certificates section
  const certificatesData = certificatesPageData.certificates || {};
  const certificatesListRaw = certificatesPageData.certificates_list || [];
  const certificatesList = Array.isArray(certificatesListRaw) ? certificatesListRaw : [];
  console.log('Certificates List:', certificatesList);

  const structuredData = generateStructuredData(certificatesList);

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
                {heroData.title || "Certifications of Excellence"}
              </h1>
              <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed max-w-xl md:max-w-2xl text-center md:text-left">
                {heroData.description || "Highlighting achievements and certifications earned through dedication, continuous learning, and a commitment to excellence across diverse fields."}
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

        {/* Certificate List Section */}
        <section id="certificates" className="py-16 bg-[#121212] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold">
                {certificatesData.title || "My Achievements"}
              </h2>
              <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed mt-4 max-w-3xl mx-auto">
                {certificatesData.description || "A showcase of my certifications from renowned platforms and the skills I’ve mastered along the way."}
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
                    className="w-full h-72 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 md:opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-semibold text-[#FFFFFF]">
                      {cert.hero?.title || "Certificate Title"}
                    </h3>
                    <p className="text-sm mt-1 text-[#E0E0E0]">
                      Issued by: {cert.hero?.issuedBy || "Issuer"}
                    </p>
                    <p className="text-sm mt-1 text-[#E0E0E0]">
                      Skills: {cert.skillsGained?.skills?.[0]?.skillTitle || "Skill"}
                    </p>
                    <Link
                      href={`/certificate/${generateSlug(cert.hero?.title || "certificate")}/${index}`}
                      className="mt-4 inline-block text-sm font-semibold text-[#e2cd2d] hover:underline"
                      aria-label={`View details of ${cert.hero?.title || "Certificate"}`}
                    >
                      View Certificate →
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
  title: "Pankaj Singh - Certifications and Achievements",
  description: "Explore Pankaj Singh's certifications, showcasing expertise in mobile app development, UI/UX, and more from renowned platforms.",
  keywords: "Pankaj Singh, certifications, achievements, mobile app development, UI/UX, skills , Pankaj Singh, mobile app developer, portfolio, app development, projects, services, achievements , Pankaj Singh Rawat , Pankaj Singh Dehradun , Pankaj Singh Kashipur , Pankaj Singh Mobile Application Developer , Software Engineer , Shivalik College of Engineering , Government Polytechnic Kashipur , Codeverb by Pankaj Singh , Codeverb , Full Stack Developer in India, Web Developer Portfolio, Mobile App Developer in India, Next.js Developer Portfolio, Freelance Web Developer in India, UI/UX Designer & Developer, Best Web Developer in Uttarakhand, Full Stack App Developer in Dehradun, Professional Web Development Services, Hire a Freelance Web Developer, React.js Developer Portfolio, Next.js SEO Optimization Services, Firebase Database Integration, Web App Development Expert, CodeVerb Web Development, UI/UX Designer for Hire, Affordable Website Development India, Frontend Developer in Uttarakhand, Custom Website Development Services, Expert in Mobile App UI/UX, Pankaj Singh Rawat Developer Portfolio, CodeVerb Web & App Development, Hire Pankaj Singh for Web Projects, Best Freelancer Developer in Dehradun, CodeVerb Freelance Services, Pankaj Singh Rawat Full Stack Developer, CodeVerb YouTube Channel, Instagram Web Developer Codever.in, Hire CodeVerb for Custom Web Apps, Dehradun Based App Developer, Web Developer from Shivalik College of Engineering, Dehradun Web & App Development, Uttarakhand Full Stack Developer, Kashipur Website Development Services, Best Developer in Shivalik College, Web & App Solutions in Uttarakhand, Freelancer App Developer Kashipur, Mobile App UI/UX in Uttarakhand, CodeVerb India – Custom Development, Affordable Web Development in Dehradun , certificates page of CODEVERB.IN codeverb.in , certificates landing page codeverb.in , pankaj singh website certificates listing page , sections of codeverb.in services achievments projects contact rawatpanku991@gmail.com pankajsingh1work@gmail.com , know all certifications of pankaj singh codeverb.in , youtube @codeberb-in , instgram @pankaj_rawat_991 , instagram @codeverb.in linkedin @pankajsingh1work , github @PankajSingh1work , codeverb.in",
  openGraph: {
    title: "Pankaj Singh - Certifications and Achievements",
    description: "A showcase of certifications earned by Pankaj Singh, highlighting skills in mobile app development and beyond.",
    url: "https://codeverb.in/certificates",
    type: "website",
    images: [
      {
        url: "/demo_4.webp",
        width: 400,
        height: 288,
        alt: "Pankaj Singh Certifications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Singh - Certifications and Achievements",
    description: "Explore Pankaj Singh's certifications and achievements in mobile app development and related fields.",
    image: "/demo_4.webp",
  },
  alternates: {
    canonical: "https://codeverb.in/certificates",
  },
};