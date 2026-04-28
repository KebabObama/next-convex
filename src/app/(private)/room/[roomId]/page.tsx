import { Room } from "@/chat/room";
import { Sender } from "@/chat/sender";
import type { Id } from "@/convex/_generated/dataModel";

type Props = {
  params: Promise<{ roomId: Id<"rooms"> }>;
};

export default async ({ params }: Props) => {
  const { roomId } = await params;

  return (
    <main className="flex h-full min-h-0 flex-col">
      <header className="border-b border-muted/70 bg-background/70 px-4 py-3 backdrop-blur-sm md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Active Room</p>
        <h1 className="mt-1 truncate text-sm font-semibold text-foreground/90 md:text-base">{roomId}</h1>
      </header>
      <Room roomId={roomId} />
      <Sender roomId={roomId} />
    </main>
  );
};
