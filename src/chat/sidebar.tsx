"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { ExternalLink, Hash, MessageCircleMore, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Creator } from "@/chat/creator";
import { Joiner } from "@/chat/joiner";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Avatar } from "@/ui/avatar";
import { Dropdown } from "@/ui/dropdown-menu";

export const Sidebar = () => {
  const roomIds = useQuery(api.chat.roomIds);

  return (
    <aside className="h-dvh flex min-h-0 flex-col overflow-hidden rounded-3xl border border-muted/70 bg-card/90 p-3 shadow-lg backdrop-blur-sm">
      <header className="border-b border-muted/70 pb-3">
        <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/50">Rooms</p>
        <h2 className="mt-1 text-lg font-semibold tracking-tight">Lobbies</h2>
        <div className="mt-3 flex flex-col gap-2">
          <Creator />
          <Joiner />
        </div>
      </header>
      <section className="py-3 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {roomIds === undefined &&
          ["room-loading-a", "room-loading-b", "room-loading-c", "room-loading-d"].map((key) => (
            <div key={key} className="h-12 animate-pulse rounded-xl bg-muted/70" />
          ))}
        {roomIds?.map((roomId) => (
          <RoomButton roomId={roomId} key={roomId} />
        ))}
      </section>
      <Footer />
    </aside>
  );
};

const Footer = () => {
  const user = useQuery(api.users.getProfile, {});
  const { replace } = useRouter();
  const { signOut } = useAuthActions();

  const handleLogout = async () => {
    await signOut();
    replace("/auth?mode=login");
  };

  return (
    <footer className="mt-3 border-t border-muted/70 pt-3">
      <Dropdown>
        <Dropdown.Trigger className={"grid items-center w-full justify-center gap-2 grid-cols-[auto_1fr]"}>
          <Avatar src={user?.image} fallback={user?.name} />
          <h1 className="text-lg font-semibold text-end truncate">{user?.name ?? user?.email}</h1>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item asChild>
            <Link href="/settings">
              <Settings /> Settings
            </Link>
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item onClick={handleLogout} variant={"destructive"}>
            <ExternalLink /> Logout
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </footer>
  );
};

const RoomButton = ({ roomId }: { roomId: Id<"rooms"> }) => {
  const router = useRouter();
  const pathname = usePathname();
  const destroy = useMutation(api.chat.destroy);
  const room = useQuery(api.chat.room, { roomId });

  const deleteHandle = useCallback(() => {
    void destroy({ roomId });
    router.replace("/roon");
  }, [destroy, roomId, router]);

  if (!room) return null;
  const href = `/room/${room._id}`;

  return (
    <Dropdown>
      <Dropdown.Trigger
        key={room._id}
        className={cn(
          "flex flex-row items-center gap-3 px-3 py-2 rounded-xl border border-transparent bg-background/60 transition-all hover:border-muted hover:bg-background",
          pathname === href && "border-primary/35 bg-primary/10",
        )}>
        <Hash />
        <p className="truncate font-medium">{room.name}</p>
        <p className="ml-auto rounded-full bg-primary/20 size-6 text-xs flex justify-center items-center font-semibold">
          {room.unread > 9 ? "9+" : room.unread}
        </p>
      </Dropdown.Trigger>
      <Dropdown.Content side={"bottom"}>
        <Dropdown.Item asChild>
          <Link href={href}>
            <MessageCircleMore /> Chat
          </Link>
        </Dropdown.Item>
        <Dropdown.Item variant={"destructive"} disabled={room.membership.role !== "owner"} onClick={deleteHandle}>
          <Trash2 /> Delete
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
};
