"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";

// export const metadata = {
//   title: "Admin Dashboard - Pankaj Singh",
//   description: "Dashboard for managing Pankaj Singh's portfolio content.",
//   robots: "noindex, nofollow", // Prevent indexing by search engines
// };

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        setUserEmail(user.email);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212]">
        <p className="text-[#E0E0E0] text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#121212] p-4">
      <h1 className="text-4xl font-bold text-[#e2cd2d] mb-4">Admin Dashboard</h1>
      <p className="text-[#E0E0E0] mb-8">Welcome, {userEmail || "Admin"}!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        <Link href="/admin/home" className="p-6 bg-[#1E1E1E] rounded-lg shadow-md hover:bg-[#2E2E2E] transition">
          <h2 className="text-xl font-semibold text-[#e2cd2d]">Control Home Page</h2>
          <p className="mt-2 text-[#E0E0E0]">Manage homepage content.</p>
        </Link>
        <Link href="/admin/about" className="p-6 bg-[#1E1E1E] rounded-lg shadow-md hover:bg-[#2E2E2E] transition">
          <h2 className="text-xl font-semibold text-[#e2cd2d]">Control About Page</h2>
          <p className="mt-2 text-[#E0E0E0]">Edit about page details.</p>
        </Link>
        <Link href="/admin/certificates" className="p-6 bg-[#1E1E1E] rounded-lg shadow-md hover:bg-[#2E2E2E] transition">
          <h2 className="text-xl font-semibold text-[#e2cd2d]">Control Certificates</h2>
          <p className="mt-2 text-[#E0E0E0]">Manage certificates list.</p>
        </Link>
        <Link href="/admin/projects" className="p-6 bg-[#1E1E1E] rounded-lg shadow-md hover:bg-[#2E2E2E] transition">
          <h2 className="text-xl font-semibold text-[#e2cd2d]">Control Projects</h2>
          <p className="mt-2 text-[#E0E0E0]">Update project details.</p>
        </Link>
        <Link href="/admin/add-certificate" className="p-6 bg-[#1E1E1E] rounded-lg shadow-md hover:bg-[#2E2E2E] transition">
          <h2 className="text-xl font-semibold text-[#e2cd2d]">Add New Certificate</h2>
          <p className="mt-2 text-[#E0E0E0]">Create a new certificate.</p>
        </Link>
        <Link href="/admin/add-project" className="p-6 bg-[#1E1E1E] rounded-lg shadow-md hover:bg-[#2E2E2E] transition">
          <h2 className="text-xl font-semibold text-[#e2cd2d]">Add New Project</h2>
          <p className="mt-2 text-[#E0E0E0]">Add a new project entry.</p>
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 py-2 px-6 bg-[#DC2626] text-[#FFFFFF] font-semibold rounded-md hover:bg-[#b91c1c] transition disabled:bg-[#666666] disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}