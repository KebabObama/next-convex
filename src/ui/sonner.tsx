"use client";

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export const Toaster = () => {
  const { theme } = useTheme();

  const icons = {
    success: <CircleCheckIcon className="size-4" />,
    info: <InfoIcon className="size-4" />,
    warning: <TriangleAlertIcon className="size-4" />,
    error: <OctagonXIcon className="size-4" />,
    loading: <Loader2Icon className="size-4 animate-spin" />,
  } as const as ToasterProps["icons"];

  const style = {
    "--normal-bg": "var(--card)",
    "--normal-text": "var(--foreground)",
    "--normal-border": "var(--muted)",
    "--border-radius": "var(--radius)",
  } as const as React.CSSProperties;

  return (
    <Sonner
      swipeDirections={["left", "right"]}
      richColors={true}
      position={"bottom-right"}
      theme={theme as ToasterProps["theme"]}
      toastOptions={{ classNames: { toast: "cn-toast" } }}
      className="toaster group"
      icons={icons}
      style={style}
    />
  );
};
