import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import type { Id } from "../_generated/dataModel";
import type { MutationCtx, QueryCtx } from "../_generated/server";

export const requireAuthUserId = async (ctx: QueryCtx | MutationCtx) => {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new ConvexError("Unauthorized");
  return userId;
};

export const getMembership = async (ctx: QueryCtx | MutationCtx, roomId: Id<"rooms">) => {
  const userId = await requireAuthUserId(ctx);
  const membership = await ctx.db
    .query("members")
    .withIndex("by_room_user", (q) => q.eq("roomId", roomId).eq("userId", userId))
    .unique();
  if (!membership) throw new ConvexError("Not a room member");
  return membership;
};
