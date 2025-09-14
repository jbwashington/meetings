import { NextResponse } from "next/server";
import { getAllDocs } from "@/lib/mdx";

export async function GET() {
  try {
    const docs = await getAllDocs();
    return NextResponse.json(docs);
  } catch (error) {
    console.error("Error fetching docs:", error);
    return NextResponse.json([], { status: 500 });
  }
}