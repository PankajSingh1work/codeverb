// src/lib/sitemapUtils.js
import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfigExport } from './firebase'; // Import the exported config

// Initialize Firebase app
initializeApp(firebaseConfigExport);

export async function fetchProjects() {
  const db = getDatabase();
  const projectsRef = ref(db, 'projectspage/projects_list');
  const snapshot = await get(projectsRef);
  return snapshot.val() || [];
}

export async function fetchCertificates() {
  const db = getDatabase();
  const certificatesRef = ref(db, 'certificatespage/certificates_list');
  const snapshot = await get(certificatesRef);
  return snapshot.val() || [];
}