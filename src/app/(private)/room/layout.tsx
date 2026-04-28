import type { ReactNode } from "react";
import { Sidebar } from "@/chat/sidebar";

export default ({ children }: { readonly children: ReactNode }) => {
  return (
    <div className="relative grid h-dvh grid-rows-[auto_1fr] gap-3 md:grid-cols-[18rem_1fr] md:grid-rows-1 md:gap-4">
      <Sidebar />
      <main className="min-h-0 overflow-hidden rounded-3xl border border-muted/70 bg-card/85 shadow-xl backdrop-blur-sm">
        {children}
      </main>
    </div>
  );
};
