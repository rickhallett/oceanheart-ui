import { getContentByType } from "@/lib/content";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await getContentByType("blog");
    return NextResponse.json(posts);
  } catch (_error) {
    
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
