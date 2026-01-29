import { NextResponse } from "next/server";

const KITSU_BASE_URL = "https://kitsu.io/api/edge";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || "";

    const res = await fetch(
      `${KITSU_BASE_URL}/anime?page[limit]=${limit}&page[offset]=${offset}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch anime");
    }

    const data = await res.json();

    return NextResponse.json({
      anime: data.data,
      meta: data.meta,
    });
  } catch {
    return NextResponse.json(
      { message: "Error fetching anime" },
      { status: 500 }
    );
  }
}
