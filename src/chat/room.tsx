"use client";

import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { memo, useCallback, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export const Room = memo(({ roomId }: { roomId: Id<"rooms"> }) => {
  const { results, status } = usePaginatedQuery(api.chat.messages, { roomId }, { initialNumItems: 20 });
  const room = useQuery(api.chat.room, { roomId });
  const markLastRead = useMutation(api.chat.markLastRead);

  const handleMark = useCallback(() => {
    if (!room || !results[0] || results[0]._creationTime <= room.membership._creationTime) return;
    void markLastRead({ roomId });
  }, [markLastRead, results, room, roomId]);

  useEffect(() => handleMark(), [handleMark]);

  return (
    <section className="flex h-full min-h-0 flex-col bg-background/30">
      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 md:p-6">
        {status === "LoadingFirstPage" && (
          <div className="space-y-2">
            <div className="h-14 animate-pulse rounded-2xl bg-muted/70" />
            <div className="h-14 animate-pulse rounded-2xl bg-muted/60" />
            <div className="h-14 animate-pulse rounded-2xl bg-muted/50" />
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <ul className="flex flex-col-reverse gap-3">
            {results.map((msg) => (
              <li key={msg._id} className="rounded-2xl border border-muted/70 bg-card/80 p-3 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-semibold tracking-tight">
                    {msg.sender?.name ?? msg.sender?.email}
                  </span>
                  <span className="shrink-0 text-[11px] text-foreground/55">
                    {new Date(msg._creationTime).toLocaleTimeString()}
                  </span>
                </div>
                <p className="mt-1.5 whitespace-pre-wrap text-sm text-foreground/85">{msg.body}</p>
              </li>
            ))}
          </ul>
        </div>

        {results.length === 0 && status !== "LoadingFirstPage" && (
          <p className="text-center text-sm text-foreground/55">No messages yet. Start the conversation.</p>
        )}
      </div>
    </section>
  );
});
