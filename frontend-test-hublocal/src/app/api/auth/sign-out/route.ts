import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  (await cookies()).delete("token");

  const redirectUrl = new URL(
    "/auth/sign-in",
    process.env.NEXT_PUBLIC_FRONTEND_URL
  );

  return NextResponse.redirect(redirectUrl);
}
