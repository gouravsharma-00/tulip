import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Allow your extension and localhost by default
  res.headers.set("Access-Control-Allow-Origin", "*"); 
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: res.headers,
    });
  }

  return res;
}

// Only run this middleware for API routes
export const config = {
  matcher: ["/api/:path*"],
};
