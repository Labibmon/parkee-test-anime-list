import { NextResponse } from "next/server";

const KITSU_BASE_URL = "https://kitsu.io/api/edge";

export async function GET(_: Request) {
  try {
    const res = await fetch(`${KITSU_BASE_URL}/trending/anime`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch trending anime");
    }

    const data = await res.json();

    return NextResponse.json({
      anime: data.data.slice(0, 5),
      meta: data.meta,
    });
  } catch {
    return NextResponse.json(
      { message: "Error fetching trending anime" },
      { status: 500 }
    );
  }
}
