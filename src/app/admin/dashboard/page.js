"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-green-600 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        <Link href="/admin/home" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-600">Control Home Page</h2>
          <p className="mt-2 text-gray-600">Manage homepage content.</p>
        </Link>
        <Link href="/admin/about" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-600">Control About Page</h2>
          <p className="mt-2 text-gray-600">Edit about page details.</p>
        </Link>
        <Link href="/admin/certificates" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-600">Control Certificates</h2>
          <p className="mt-2 text-gray-600">Manage certificates list.</p>
        </Link>
        <Link href="/admin/projects" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-600">Control Projects</h2>
          <p className="mt-2 text-gray-600">Update project details.</p>
        </Link>
        <Link href="/admin/add-certificate" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-600">Add New Certificate</h2>
          <p className="mt-2 text-gray-600">Create a new certificate.</p>
        </Link>
        <Link href="/admin/add-project" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-600">Add New Project</h2>
          <p className="mt-2 text-gray-600">Add a new project entry.</p>
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 py-2 px-6 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}