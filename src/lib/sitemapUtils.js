// src/lib/sitemapUtils.js
import { database } from './firebase'; // Import the initialized database instance
import { ref, get } from 'firebase/database';

export async function fetchProjects() {
  try {
    const projectsRef = ref(database, 'projectspage/projects_list');
    const snapshot = await get(projectsRef);
    const data = snapshot.val();
    // Convert to array if it's an object with numeric keys, or return empty array if null
    return data ? Object.values(data) : [];
  } catch (error) {
    console.error('Error fetching projects from Firebase:', error);
    return []; // Return empty array on error to prevent sitemap failure
  }
}

export async function fetchCertificates() {
  try {
    const certificatesRef = ref(database, 'certificatespage/certificates_list');
    const snapshot = await get(certificatesRef);
    const data = snapshot.val();
    // Convert to array if it's an object with numeric keys, or return empty array if null
    return data ? Object.values(data) : [];
  } catch (error) {
    console.error('Error fetching certificates from Firebase:', error);
    return []; // Return empty array on error to prevent sitemap failure
  }
}