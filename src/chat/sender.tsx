"use client";

import { useMutation } from "convex/react";
import { Send } from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

export const Sender = memo(({ roomId }: { roomId: Id<"rooms"> }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);
  const sendMessage = useMutation(api.chat.send);

  const onSend = useCallback(async () => {
    try {
      const input = inputRef.current;
      if (!input || isSending) return;
      const body = input.value.trim();
      if (!body) return;
      setIsSending(true);
      await sendMessage({ body, roomId });
      input.value = "";
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    } finally {
      setIsSending(false);
    }
  }, [sendMessage, roomId, isSending]);

  return (
    <div className="sticky bottom-0 border-t border-muted/70 bg-card/80 px-4 py-3 backdrop-blur-sm md:px-6 md:py-4">
      <div className="flex items-center gap-3 rounded-2xl border border-muted/70 bg-background/70 p-2 shadow-sm">
        <Input
          ref={inputRef}
          className="h-10 grow border-transparent bg-transparent text-sm shadow-none focus-visible:ring-0"
          type="text"
          placeholder="Type a message"
          disabled={isSending}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSend();
            }
          }}
        />

        <Button className="size-10 rounded-xl" onClick={onSend} disabled={isSending}>
          <Send className="size-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
});
