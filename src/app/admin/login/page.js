"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Admin Login - Pankaj Singh",
//   description: "Admin login page for Pankaj Singh's portfolio management.",
//   robots: "noindex, nofollow", // Prevent indexing by search engines
// };

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic client-side email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("The email address is invalid.");
          break;
        case "auth/user-not-found":
          setError("No user found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;
        default:
          setError("Login failed. Please check your credentials.");
          console.error("Login error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] p-4">
      <div className="w-full max-w-md p-8 bg-[#1E1E1E] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#FFFFFF]">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#E0E0E0]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#E0E0E0]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 bg-[#2E2E2E] text-[#E0E0E0] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e2cd2d] disabled:opacity-50"
              required
              disabled={loading}
            />
          </div>
          {error && <p className="text-[#DC2626] text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-[#e2cd2d] text-[#121212] font-semibold rounded-md hover:bg-[#d1bc29] transition disabled:bg-[#666666] disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}