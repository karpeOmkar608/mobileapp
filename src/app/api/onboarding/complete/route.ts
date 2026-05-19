import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (!role) {
      return NextResponse.json({ error: "No role selected" }, { status: 400 });
    }
    
    // Parse the payload if provided
    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      // Ignore if body is empty or invalid
    }
    
    const { roleData } = body as any;

    // Use nested writes to ensure atomicity without requiring an interactive transaction
    const updateData: any = {
      onboardingCompleted: true,
    };

    if (roleData) {
      if (role === "CREATOR") {
        updateData.creatorProfile = {
          upsert: { update: roleData, create: roleData }
        };
      } else if (role === "BRAND") {
        updateData.brandProfile = {
          upsert: { update: roleData, create: roleData }
        };
      } else if (role === "AGENCY") {
        updateData.agencyProfile = {
          upsert: { update: roleData, create: roleData }
        };
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    });

    const redirectUrl = `/dashboard/${role.toLowerCase()}`;
    return NextResponse.json({ success: true, redirectUrl });
  } catch (error) {
    console.error("Onboarding completion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
