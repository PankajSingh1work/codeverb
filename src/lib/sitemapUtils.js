// src/lib/sitemapUtils.js
export async function fetchProjects() {
  try {
    const res = await fetch(`http://codeverb.in/api/fetchData?path=projectspage/projects_list`, {
      next: { revalidate: 7200 },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching projects:', error.message, { stack: error.stack });
    return []; // Always an array
  }
}

export async function fetchCertificates() {
  try {
    const res = await fetch(`http://codeverb.in/api/fetchData?path=certificatespage/certificates_list`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching certificates:', error.message, { stack: error.stack });
    return []; // Always an array
  }
}