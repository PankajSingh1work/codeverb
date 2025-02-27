import { NextResponse } from "next/server";
import { database } from "../../../lib/firebase"; // Adjust path if needed
import { ref, get } from "firebase/database";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }

  try {
    const dataRef = ref(database, path);
    const snapshot = await get(dataRef);
    const data = snapshot.val() || {};

    // Set caching headers
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=10, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error(`Error fetching ${path}:`, error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}