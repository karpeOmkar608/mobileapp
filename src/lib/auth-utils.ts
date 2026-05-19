import { Session } from "next-auth";

export function getOnboardingPath(role: Session["user"]["role"] | undefined | null) {
  if (!role) return "/role-select";
  return `/onboarding/${role.toLowerCase()}`;
}

export function getDashboardPath(role: Session["user"]["role"] | undefined | null) {
  if (!role) return "/role-select";
  return `/dashboard/${role.toLowerCase()}`;
}
