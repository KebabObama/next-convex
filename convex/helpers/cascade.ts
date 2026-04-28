import { CascadingDelete, defineCascadeRules, makeBatchDeleteHandler } from "@00akshatsinha00/convex-cascading-delete";
import { components } from "../_generated/api";
import { internalMutation } from "../_generated/server";

export const rules = defineCascadeRules({
  rooms: [
    { to: "messages", via: "by_room", field: "roomId" },
    { to: "members", via: "by_room", field: "roomId" },
  ],
  users: [{ to: "members", via: "by_user", field: "userId" }],
});

export const cd = new CascadingDelete(components.convexCascadingDelete, { rules });
export const _cascadeBatchHandler = makeBatchDeleteHandler(internalMutation, components.convexCascadingDelete);
