import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, IDLE_MINUTES } from "@/lib/access";

/** Pass the path to the layout (for the access gate) and slide the unlock window on every page view. */
export function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: new Headers([...req.headers, ["x-pathname", req.nextUrl.pathname]]) } });
  res.headers.set("x-pathname", req.nextUrl.pathname);
  const token = req.cookies.get(ACCESS_COOKIE)?.value;
  if (token) res.cookies.set(ACCESS_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: req.nextUrl.protocol === "https:", path: "/", maxAge: IDLE_MINUTES * 60 });
  return res;
}
export const config = { matcher: ["/((?!_next|api|icons|sw.js|manifest.webmanifest|favicon).*)"] };
