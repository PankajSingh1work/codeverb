// src/app/certificate/[certificateSlug]/[index]/page.js
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
function generateStructuredData(certificate, certificateSlug, index) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOccupationalCredential",
        name: certificate.hero?.title || "Certificate",
        description: certificate.hero?.description || "A certificate earned by Pankaj Singh.",
        url: `https://codeverb.in/certificate/${certificateSlug}/${index}`, // Replace with your actual domain
        image: certificate.details?.imageLink || "/demo_5.webp",
        issuer: {
          "@type": "Organization",
          name: certificate.hero?.issuedBy || "Issuer",
        },
        awardedTo: {
          "@type": "Person",
          name: "Pankaj Singh",
          sameAs: [
            "https://instagram.com/pankaj_rawat_991",
            "https://linkedin.com/in/pankajsingh1work",
            "https://github.com/PankajSingh1work",
          ],
        },
        educationalLevel: "Professional Certification",
        about: certificate.skillsGained?.skills?.map((skill) => ({
          "@type": "DefinedTerm",
          name: skill.skillTitle || "Skill",
          description: skill.skillDescription || "Skill description...",
        })),
      },
      {
        "@type": "WebPage",
        url: `https://codeverb.in/certificate/${certificateSlug}/${index}`,
        name: `${certificate.hero?.title || "Certificate"} - Pankaj Singh`,
        description: certificate.hero?.description || "Detailed view of a certificate earned by Pankaj Singh.",
        mainEntity: {
          "@type": "EducationalOccupationalCredential",
          name: certificate.hero?.title || "Certificate",
        },
      },
    ],
  };
}

export default async function CertificateDetail({ params }) {
  const { certificateSlug, index } = await params;
  const indexNum = parseInt(index, 10);

  if (!certificateSlug || isNaN(indexNum)) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center">
        <p className="text-[#E0E0E0] text-base">Invalid certificate URL.</p>
      </div>
    );
  }

  const certificatesPageData = await fetchFirebaseData("certificatespage");
  const certificatesList = Array.isArray(certificatesPageData.certificates_list)
    ? certificatesPageData.certificates_list
    : [];

  if (indexNum < 0 || indexNum >= certificatesList.length) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center">
        <p className="text-[#E0E0E0] text-base">Certificate not found.</p>
      </div>
    );
  }

  const certificate = certificatesList[indexNum];
  const expectedSlug = generateSlug(certificate.hero?.title || "certificate");

  if (certificateSlug !== expectedSlug) {
    console.log("Slug mismatch:", { received: certificateSlug, expected: expectedSlug });
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center">
        <p className="text-[#E0E0E0] text-base">Certificate not found.</p>
      </div>
    );
  }

  const structuredData = generateStructuredData(certificate, certificateSlug, index);

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

      {/* Hero Section */}
      <main>
        <section
          id="hero"
          className="relative h-max w-full mx-auto bg-cover bg-center bg-no-repeat pt-[calc(4rem+40px)] md:pt-40 lg:pt-40"
          style={{ backgroundImage: `url(${certificate.hero?.backgroundImageLink || "/main_hero_bg.webp"})` }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#121212]/60"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold">
                {certificate.hero?.title || "Certificate Title"}
              </h1>
              <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed">
                {certificate.hero?.description || "Certificate description..."}
              </p>
              <p className="text-sm mt-4 text-[#B0B0B0]">
                Issued by: <span className="font-semibold text-[#B0B0B0]">{certificate.hero?.issuedBy || "Issuer"}</span>
              </p>
              <div className="flex items-center mt-6">
                <Link
                  href={certificate.hero?.certificateLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-[#222222] text-[#E0E0E0] hover:bg-[#333333] py-2 px-6 rounded-lg transition duration-300"
                  aria-label={`View ${certificate.hero?.title || "Certificate"} on Google Drive`}
                >
                  <i className="fab fa-google-drive text-2xl mr-2"></i>
                  <span className="text-xs">View Certificate</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Details Section */}
        <section id="certificate-details" className="py-16 bg-[#121212]">
          <div className="max-w-6xl mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold">
                {certificate.details?.title || "Certificate Details"}
              </h2>
            </header>
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <Image
                  src={certificate.details?.imageLink || "/demo_4.webp"}
                  alt={`${certificate.hero?.title || "Certificate"} by Pankaj Singh`}
                  width={400}
                  height={400}
                  className="w-auto h-[400px] object-cover rounded-lg shadow-lg border-0 border-[#E0E0E0]"
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-2/3 text-[#E0E0E0] space-y-6">
                <p className="text-base lg:text-lg leading-relaxed">
                  {certificate.details?.description1 || "This certificate recognizes the successful completion of the course."}
                </p>
                <p className="text-base lg:text-lg leading-relaxed">
                  {certificate.details?.description2 || "The course focuses on hands-on learning and practical applications."}
                </p>
                <p className="text-base lg:text-lg leading-relaxed">
                  {certificate.details?.description3 || "Participants demonstrate proficiency in real-world scenarios."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Gained Section */}
        <section id="skills-gained" className="py-16 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4">
            <header className="text-center mb-12">
              <h2 className="text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-bold">
                {certificate.skillsGained?.title || "Skills Gained"}
              </h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-x-12">
              {certificate.skillsGained?.skills?.map((skill, idx) => (
                <article key={idx} className="space-y-4">
                  <div className="w-20 h-20 flex items-center justify-center bg-[#1E1E1E] text-[#E0E0E0] rounded-full mx-auto md:mx-0">
                    <i className={`${skill.iconLink || "fas fa-cogs"} text-3xl`} aria-hidden="true"></i>
                  </div>
                  <div className="bg-[#222222] p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#FFFFFF]">
                      {skill.skillTitle || "Skill Title"}
                    </h3>
                    <p className="text-sm text-[#E0E0E0] mt-2">
                      {skill.skillDescription || "Skill description..."}
                    </p>
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

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { certificateSlug, index } = await params;
  const indexNum = parseInt(index, 10);
  const certificatesPageData = await fetchFirebaseData("certificatespage");
  const certificatesList = Array.isArray(certificatesPageData.certificates_list) ? certificatesPageData.certificates_list : [];

  if (isNaN(indexNum) || indexNum < 0 || indexNum >= certificatesList.length) {
    return {
      title: "Certificate Not Found - Pankaj Singh",
      description: "The requested certificate could not be found.",
      robots: "noindex",
    };
  }

  const certificate = certificatesList[indexNum];
  const expectedSlug = generateSlug(certificate.hero?.title || "certificate");

  if (certificateSlug !== expectedSlug) {
    return {
      title: "Certificate Not Found - Pankaj Singh",
      description: "The requested certificate could not be found.",
      robots: "noindex",
    };
  }

  const skillsKeywords = certificate.skillsGained?.skills?.map(skill => skill.skillTitle).join(", ") || "skills";

  return {
    title: `${certificate.hero?.title || "Certificate"} - Pankaj Singh`,
    description: certificate.hero?.description || "Detailed view of a certificate earned by Pankaj Singh showcasing skills and achievements.",
    keywords: `${certificate.hero?.title}, Pankaj Singh, certificate, ${skillsKeywords}, ${certificate.hero?.issuedBy}, achievement , Pankaj Singh, mobile app developer, portfolio, app development, projects, services, achievements , Pankaj Singh Rawat , Pankaj Singh Dehradun , Pankaj Singh Kashipur , Pankaj Singh Mobile Application Developer , Software Engineer , Shivalik College of Engineering , Government Polytechnic Kashipur , Codeverb by Pankaj Singh , Codeverb ,Full Stack Developer in India, Web Developer Portfolio, Mobile App Developer in India, Next.js Developer Portfolio, Freelance Web Developer in India, UI/UX Designer & Developer, Best Web Developer in Uttarakhand, Full Stack App Developer in Dehradun, Professional Web Development Services, Hire a Freelance Web Developer, React.js Developer Portfolio, Next.js SEO Optimization Services, Firebase Database Integration, Web App Development Expert, CodeVerb Web Development, UI/UX Designer for Hire, Affordable Website Development India, Frontend Developer in Uttarakhand, Custom Website Development Services, Expert in Mobile App UI/UX, Pankaj Singh Rawat Developer Portfolio, CodeVerb Web & App Development, Hire Pankaj Singh for Web Projects, Best Freelancer Developer in Dehradun, CodeVerb Freelance Services, Pankaj Singh Rawat Full Stack Developer, CodeVerb YouTube Channel, Instagram Web Developer Codever.in, Hire CodeVerb for Custom Web Apps, Dehradun Based App Developer, Web Developer from Shivalik College of Engineering, Dehradun Web & App Development, Uttarakhand Full Stack Developer, Kashipur Website Development Services, Best Developer in Shivalik College, Web & App Solutions in Uttarakhand, Freelancer App Developer Kashipur, Mobile App UI/UX in Uttarakhand, CodeVerb India – Custom Development, Affordable Web Development in Dehradun`,
    robots: "index, follow",
    openGraph: {
      title: `${certificate.hero?.title || "Certificate"} - Pankaj Singh`,
      description: certificate.hero?.description || "Detailed view of a certificate earned by Pankaj Singh.",
      url: `https://codeverb.in/certificate/${certificateSlug}/${index}`,
      type: "article",
      images: [
        {
          url: certificate.details?.imageLink || "/demo_4.webp",
          width: 400,
          height: 400,
          alt: `${certificate.hero?.title || "Certificate"} by Pankaj Singh`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${certificate.hero?.title || "Certificate"} - Pankaj Singh`,
      description: certificate.hero?.description || "Detailed view of a certificate earned by Pankaj Singh.",
      image: certificate.details?.imageLink || "/demo_4.webp",
    },
    alternates: {
      canonical: `https://codeverb.in/certificate/${certificateSlug}/${index}`,
    },
  };
}