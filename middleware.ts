import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionUser } from "./app/actions";
import { getSession } from "next-auth/react";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}
