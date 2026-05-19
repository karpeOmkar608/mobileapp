import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Protects specific routes, leaves static files/api untouched
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
