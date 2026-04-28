"use client";

import { useMutation } from "convex/react";
import { useState, useTransition } from "react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/ui/button";
import { Dialog } from "@/ui/dialog";
import { Input } from "@/ui/input";

export const Joiner = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");
  const [joining, startJoining] = useTransition();
  const joinRoom = useMutation(api.chat.join);

  const trimmed = roomId.trim() as Id<"rooms">;

  const onClick = () => {
    startJoining(async () => {
      if (!trimmed) return;
      await joinRoom({ roomId: trimmed });
      setRoomId("");
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="w-full justify-center" variant="secondary">
          Join lobby
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Join lobby</Dialog.Title>
          <Dialog.Description>Paste the room ID to join an existing chat.</Dialog.Description>
        </Dialog.Header>
        <Input
          value={roomId}
          onChange={(event) => setRoomId(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onClick();
            }
          }}
          placeholder="Room ID"
          disabled={joining}
        />
        <Dialog.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setOpen(false);
              setRoomId("");
            }}
            disabled={joining}>
            Close
          </Button>
          <Button variant="default" onClick={() => void onClick()} disabled={!roomId.trim() || joining}>
            {joining ? "Joining..." : "Join"}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
