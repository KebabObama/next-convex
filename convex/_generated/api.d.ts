/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as chat from "../chat.js";
import type * as helpers_cascade from "../helpers/cascade.js";
import type * as helpers_email from "../helpers/email.js";
import type * as helpers_middlewares from "../helpers/middlewares.js";
import type * as http from "../http.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  chat: typeof chat;
  "helpers/cascade": typeof helpers_cascade;
  "helpers/email": typeof helpers_email;
  "helpers/middlewares": typeof helpers_middlewares;
  http: typeof http;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  convexCascadingDelete: import("@00akshatsinha00/convex-cascading-delete/_generated/component.js").ComponentApi<"convexCascadingDelete">;
  resend: import("@convex-dev/resend/_generated/component.js").ComponentApi<"resend">;
};
