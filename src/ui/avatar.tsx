import { Avatar as AvatarPrimitive } from "radix-ui";
import type React from "react";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg";
  src?: string | null;
  fallback?: React.ReactNode;
  alt?: string;
  fallbackProps?: React.ComponentProps<typeof AvatarPrimitive.Fallback>;
};

const Avatar = ({ className, size = "default", src, fallback, alt, fallbackProps, ...props }: AvatarProps) => {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-muted data-[size=lg]:size-10 data-[size=sm]:size-6",
        className,
      )}
      {...props}>
      <AvatarPrimitive.Image
        key={src ?? "avatar-empty"}
        data-slot="avatar-image"
        className="aspect-square size-full rounded-full object-cover"
        src={src ?? undefined}
        alt={alt}
      />
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className={cn(
          "flex size-full items-center justify-center rounded-full bg-muted text-sm text-foreground/70 group-data-[size=sm]/avatar:text-xs",
          fallbackProps?.className,
        )}
        {...fallbackProps}>
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

export { Avatar, type AvatarProps };
