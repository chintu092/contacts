/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";

// export function middleware(req: any) {
//   const token = req.cookies.get("usercookie")?.value;

//   console.log("Middleware running");

//   const { pathname } = req.nextUrl;


//   if (!token && pathname === "/") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }


//   if (token && pathname === "/login") {
//     return NextResponse.redirect(new URL("http://localhost:3000/", req.url));
//   }

//   return NextResponse.next();
// }


// export const config = {
//   matcher: ["/", "/login"],
// };


/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export function middleware(req: any) {
  const token = req.cookies.get("usercookie")?.value;
  const { pathname } = req.nextUrl;

  console.log("Middleware running");

  // Public routes accessible only when NOT logged in
  const publicRoutes = ["/login", "/signup"];

  // If user is NOT logged in and trying to access a restricted page, redirect to login
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user IS logged in and trying to access login or signup, force redirect to home
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply middleware to all pages except Next.js internals
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
