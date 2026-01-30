import { NextRequest, NextResponse } from "next/server";

const KITSU_BASE_URL = "https://kitsu.io/api/edge";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const res = await fetch(`${KITSU_BASE_URL}/anime/${id}`);

    if (!res.ok) {
      return NextResponse.json({ message: "Anime not found" }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
