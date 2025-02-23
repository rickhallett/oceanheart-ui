import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";

export async function POST(request: Request) {
  const supabase = createServiceClient();

  try {
    const { activityType, minutes, comment } = await request.json();

    // Retrieve the logged-in user; adjust as needed for your auth.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Insert a new record into the practices table.
    // Note: The comment field is not inserted as the table does not support it yet.
    const { error } = await supabase.from("practices").insert({
      type: activityType,
      points: minutes,
      user_id: user.id,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Practice submitted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
