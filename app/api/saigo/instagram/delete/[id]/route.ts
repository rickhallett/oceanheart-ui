import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";
import { InstagramService } from "@/libs/instagram-service";

interface DeleteParams {
  params: {
    id: string;
  };
}

/**
 * DELETE /api/saigo/instagram/delete/[id]
 * Delete an Instagram check by ID
 */
export async function DELETE(request: Request, { params }: DeleteParams) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Instagram check ID is required" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const instagramService = new InstagramService(supabase);

    const success = await instagramService.deleteInstagramCheck(id);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete Instagram check" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Instagram check deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting Instagram check:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete Instagram check" },
      { status: 500 }
    );
  }
} 