"use client";

import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/ui/button";
import { Dialog } from "@/ui/dialog";
import { Input } from "@/ui/input";

export const Creator = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [creating, startJoining] = useTransition();
  const createRoom = useMutation(api.chat.create);

  const onClick = () =>
    startJoining(async () => {
      const trimmedName = name.trim();
      if (!trimmedName) return;
      await createRoom({ name: trimmedName });
      setName("");
      setOpen(false);
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="w-full justify-center">
          <Plus /> Room
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Create new chat</Dialog.Title>
          <Dialog.Description>Add name of the chat that you want to create.</Dialog.Description>
        </Dialog.Header>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void onClick();
            }
          }}
          placeholder="Chat name"
          disabled={creating}
        />
        <Dialog.Footer>
          <Button
            variant={"secondary"}
            onClick={() => {
              setOpen(false);
              setName("");
            }}
            disabled={creating}>
            Close
          </Button>
          <Button variant={"default"} onClick={() => void onClick()} disabled={!name.trim() || creating}>
            {creating ? "Creating..." : "Create"}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
