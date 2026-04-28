export default () => {
  return (
    <main className="grid h-full min-h-0 place-items-center p-5 md:p-8">
      <section className="w-full max-w-2xl rounded-3xl border border-muted/70 bg-background/80 p-6 shadow-lg backdrop-blur-sm md:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">Welcome</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          Choose a room and start the conversation
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/70 md:text-base">
          Open one of your existing lobbies from the left panel, create a new room, or join using a room ID.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-muted/70 bg-card/70 p-4">
            <h3 className="text-sm font-medium">Create</h3>
            <p className="mt-1 text-xs text-foreground/65">Spin up a dedicated space for your team in one click.</p>
          </div>
          <div className="rounded-2xl border border-muted/70 bg-card/70 p-4">
            <h3 className="text-sm font-medium">Join</h3>
            <p className="mt-1 text-xs text-foreground/65">Enter a room ID and jump straight into an existing lobby.</p>
          </div>
          <div className="rounded-2xl border border-muted/70 bg-card/70 p-4">
            <h3 className="text-sm font-medium">Collaborate</h3>
            <p className="mt-1 text-xs text-foreground/65">
              Messages stream live so your room always stays up to date.
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-3">
          <div className="h-2 w-1/2 animate-pulse rounded-full bg-muted" />
          <div className="h-2 w-3/4 animate-pulse rounded-full bg-muted" />
          <div className="h-2 w-2/3 animate-pulse rounded-full bg-muted" />
        </div>
      </section>
    </main>
  );
};
