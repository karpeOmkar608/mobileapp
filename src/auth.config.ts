import type { NextAuthConfig } from "next-auth";

// Edge-compatible config (no Prisma or bcrypt here)
export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  providers: [
    // Providers array will be defined in auth.ts
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const user = auth?.user as any;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnboarding = nextUrl.pathname.startsWith("/onboarding");
      const isRoleSelect = nextUrl.pathname === "/role-select";
      const isAuthRoute = nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

      if (isAuthRoute) {
        if (isLoggedIn) {
          if (!user.role) return Response.redirect(new URL("/role-select", nextUrl));
          if (!user.onboardingCompleted) return Response.redirect(new URL(`/onboarding/${user.role.toLowerCase()}`, nextUrl));
          return Response.redirect(new URL(`/dashboard/${user.role.toLowerCase()}`, nextUrl));
        }
        return true;
      }

      if (isRoleSelect) {
        if (!isLoggedIn) return false; // redirect to login
        if (user.role && user.onboardingCompleted) {
          return Response.redirect(new URL(`/dashboard/${user.role.toLowerCase()}`, nextUrl));
        }
        return true;
      }

      if (isOnboarding) {
        if (!isLoggedIn) return false;
        if (!user.role) return Response.redirect(new URL("/role-select", nextUrl));
        if (user.onboardingCompleted) return Response.redirect(new URL(`/dashboard/${user.role.toLowerCase()}`, nextUrl));
        
        // Prevent cross-role onboarding access
        const pathRole = nextUrl.pathname.split("/")[2]; // /onboarding/creator -> creator
        if (pathRole && pathRole !== user.role.toLowerCase()) {
          return Response.redirect(new URL(`/onboarding/${user.role.toLowerCase()}`, nextUrl));
        }
        return true;
      }

      if (isOnDashboard) {
        if (!isLoggedIn) return false;
        if (!user.role) return Response.redirect(new URL("/role-select", nextUrl));
        if (!user.onboardingCompleted) return Response.redirect(new URL(`/onboarding/${user.role.toLowerCase()}`, nextUrl));

        // Prevent cross-role dashboard access
        const pathRole = nextUrl.pathname.split("/")[2]; // /dashboard/creator -> creator
        if (pathRole && pathRole !== user.role.toLowerCase()) {
          return Response.redirect(new URL(`/dashboard/${user.role.toLowerCase()}`, nextUrl));
        }
        return true;
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.onboardingCompleted = (user as any).onboardingCompleted;
      }
      if (trigger === "update" && session) {
        token.role = session.role ?? token.role;
        token.onboardingCompleted = session.onboardingCompleted ?? token.onboardingCompleted;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
        (session.user as any).onboardingCompleted = token.onboardingCompleted;
      }
      return session;
    }
  },
} satisfies NextAuthConfig;
