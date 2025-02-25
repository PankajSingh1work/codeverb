// src/lib/sitemapUtils.js
import { database } from './firebase'; // Import the initialized database instance
import { ref, get } from 'firebase/database';

export async function fetchProjects() {
  const projectsRef = ref(database, 'projectspage/projects_list');
  const snapshot = await get(projectsRef);
  return snapshot.val() || [];
}

export async function fetchCertificates() {
  const certificatesRef = ref(database, 'certificatespage/certificates_list');
  const snapshot = await get(certificatesRef);
  return snapshot.val() || [];
}