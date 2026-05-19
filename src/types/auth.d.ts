import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: "CREATOR" | "BRAND" | "AGENCY";
      onboardingCompleted: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "CREATOR" | "BRAND" | "AGENCY";
    onboardingCompleted: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "CREATOR" | "BRAND" | "AGENCY";
    onboardingCompleted: boolean;
  }
}
