import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import type { MiddlewareConfig } from "next/server";

const isAuth = createRouteMatcher(["/signin"]);
const isProtected = createRouteMatcher(["/dashboard(.*)", "/room(.*)"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (isAuth(request) && (await convexAuth.isAuthenticated())) return nextjsMiddlewareRedirect(request, "/dashboard");
  if (isProtected(request) && !(await convexAuth.isAuthenticated())) return nextjsMiddlewareRedirect(request, "/auth");
});

export const config: MiddlewareConfig = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
