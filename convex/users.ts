import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAuthUserId } from "./helpers/middlewares";

export const getProfile = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, { userId }) => {
    const resolvedUserId = userId ?? (await requireAuthUserId(ctx));
    return await ctx.db.get("users", resolvedUserId);
  },
});

export const getUploadAvatarUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveUserAvatar = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    await ctx.db.patch(userId, { image: imageUrl ?? undefined });
    return imageUrl;
  },
});

export const updateUserName = mutation({
  args: { name: v.optional(v.string()) },
  handler: async (ctx, { name }) => {
    const userId = await requireAuthUserId(ctx);
    await ctx.db.patch("users", userId, { name });
  },
});
