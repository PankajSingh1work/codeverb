// src/lib/sitemapUtils.js
import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase'; // Adjust the import path to your lib/firebase.js

// Initialize Firebase app
initializeApp(firebaseConfig);

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