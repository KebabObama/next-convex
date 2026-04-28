import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { cd } from "./helpers/cascade";
import { getMembership, requireAuthUserId } from "./helpers/middlewares";

export const ROLES = ["owner", "admin", "member"] as const;
export type Role = (typeof ROLES)[number];

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await requireAuthUserId(ctx);
    const roomId = await ctx.db.insert("rooms", { name });
    await ctx.db.insert("members", { roomId, userId, lastSeen: Date.now(), role: "owner" });
  },
});

export const join = mutation({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const userId = await requireAuthUserId(ctx);
    const exists = await ctx.db
      .query("members")
      .withIndex("by_room_user", (q) => q.eq("roomId", roomId).eq("userId", userId))
      .first();
    if (exists) throw new ConvexError("User is already member");
    await ctx.db.insert("members", { role: "member", userId, roomId, lastSeen: Date.now() });
  },
});

export const leave = mutation({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const membership = await getMembership(ctx, roomId);
    await ctx.db.delete(membership._id);
    const remaining = await ctx.db
      .query("members")
      .withIndex("by_room", (q) => q.eq("roomId", roomId))
      .first();
    if (!remaining) await ctx.db.delete(roomId);
  },
});

export const destroy = mutation({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const member = await getMembership(ctx, roomId);
    if (member.role !== "owner") throw new ConvexError("Only owner can destroy chat room.");
    await cd.deleteWithCascade(ctx, "rooms", roomId);
  },
});

export const roomIds = query({
  handler: async (ctx) => {
    const userId = await requireAuthUserId(ctx);
    const memberships = await ctx.db
      .query("members")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .take(99);
    return memberships.map((m) => m.roomId);
  },
});

export const room = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const room = await ctx.db.get(roomId);
    if (!room) throw new ConvexError("No such room exists.");
    const membership = await getMembership(ctx, roomId);
    const msgs = await ctx.db
      .query("messages")
      .withIndex("by_room", (q) => q.eq("roomId", roomId).gt("_creationTime", membership.lastSeen))
      .take(10);
    return { unread: msgs.length, ...room, membership };
  },
});

export const messages = query({
  args: { roomId: v.id("rooms"), paginationOpts: paginationOptsValidator },
  handler: async (ctx, { roomId, paginationOpts }) => {
    const msgs = await ctx.db
      .query("messages")
      .withIndex("by_room", (q) => q.eq("roomId", roomId))
      .order("desc")
      .paginate(paginationOpts);
    const page = await Promise.all(msgs.page.map(async (m) => ({ ...m, sender: await ctx.db.get(m.userId) })));
    return { ...msgs, page };
  },
});

export const send = mutation({
  args: { body: v.string(), roomId: v.id("rooms") },
  handler: async (ctx, { roomId, body }) => {
    const membership = await getMembership(ctx, roomId);
    await ctx.db.insert("messages", { roomId, userId: membership.userId, body });
    await ctx.db.patch("members", membership._id, { lastSeen: Date.now() });
  },
});

export const markLastRead = mutation({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const membership = await getMembership(ctx, roomId);
    await ctx.db.patch(membership._id, { lastSeen: Date.now() });
  },
});
