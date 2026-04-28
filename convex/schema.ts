import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { ROLES } from "./chat";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    phone: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  }),

  rooms: defineTable({
    name: v.string(),
  }),

  messages: defineTable({
    roomId: v.id("rooms"),
    userId: v.id("users"),
    body: v.string(),
  }).index("by_room", ["roomId"]),

  members: defineTable({
    roomId: v.id("rooms"),
    userId: v.id("users"),
    role: v.union(...ROLES.map((r) => v.literal(r))),
    lastSeen: v.number(),
  })
    .index("by_room", ["roomId"])
    .index("by_user", ["userId"])
    .index("by_room_user", ["roomId", "userId"]),
});
