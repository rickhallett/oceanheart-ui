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

    // Look up the corresponding saigo_users record using auth user id stored in user_id column
    const { data: profile, error: profileError } = await supabase
      .from("saigo_users")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "User not registered in saigo_users" },
        { status: 400 }
      );
    }

    // Insert a new record into the practices table.
    // Note: The comment field is not inserted as the table does not support it yet.
    const { error } = await supabase.from("practices").insert({
      type: activityType,
      points: minutes,
      user_id: profile.id,
      created_at: new Date().toISOString(),
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
