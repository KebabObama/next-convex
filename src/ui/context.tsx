"use client";

import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { ContextMenu } from "radix-ui";
import type React from "react";
import { cn } from "@/lib/utils";

const ContextRoot = (props: React.ComponentProps<typeof ContextMenu.Root>) => {
  return <ContextMenu.Root data-slot="context-menu" {...props} />;
};

const Trigger = ({ className, ...props }: React.ComponentProps<typeof ContextMenu.Trigger>) => {
  return <ContextMenu.Trigger data-slot="context-menu-trigger" className={cn("select-none", className)} {...props} />;
};

const Group = (props: React.ComponentProps<typeof ContextMenu.Group>) => {
  return <ContextMenu.Group data-slot="context-menu-group" {...props} />;
};

const Portal = (props: React.ComponentProps<typeof ContextMenu.Portal>) => {
  return <ContextMenu.Portal data-slot="context-menu-portal" {...props} />;
};

const Sub = (props: React.ComponentProps<typeof ContextMenu.Sub>) => {
  return <ContextMenu.Sub data-slot="context-menu-sub" {...props} />;
};

const RadioGroup = (props: React.ComponentProps<typeof ContextMenu.RadioGroup>) => {
  return <ContextMenu.RadioGroup data-slot="context-menu-radio-group" {...props} />;
};

const Content = ({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenu.Content> & {
  side?: "top" | "right" | "bottom" | "left";
}) => {
  return (
    <ContextMenu.Portal>
      <ContextMenu.Content
        data-slot="context-menu-content"
        className={cn(
          "z-50 max-h-(--radix-context-menu-content-available-height) min-w-36 origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-card p-1 text-foreground shadow-md ring-1 ring-muted/60 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
      />
    </ContextMenu.Portal>
  );
};

const Item = ({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenu.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) => {
  return (
    <ContextMenu.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/context-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-secondary focus:text-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-foreground data-[variant=destructive]:*:[svg]:text-destructive",
        className,
      )}
      {...props}
    />
  );
};

const SubTrigger = ({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenu.SubTrigger> & {
  inset?: boolean;
}) => {
  return (
    <ContextMenu.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-secondary focus:text-foreground data-inset:pl-7 data-open:bg-secondary data-open:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}>
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenu.SubTrigger>
  );
};

const SubContent = ({ className, ...props }: React.ComponentProps<typeof ContextMenu.SubContent>) => {
  return (
    <ContextMenu.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "z-50 min-w-32 origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-lg border border-muted/60 bg-card p-1 text-foreground shadow-lg duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className,
      )}
      {...props}
    />
  );
};

const CheckboxItem = ({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenu.CheckboxItem> & {
  inset?: boolean;
}) => {
  return (
    <ContextMenu.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-secondary focus:text-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}>
      <span className="pointer-events-none absolute right-2">
        <ContextMenu.ItemIndicator>
          <CheckIcon />
        </ContextMenu.ItemIndicator>
      </span>
      {children}
    </ContextMenu.CheckboxItem>
  );
};

const RadioItem = ({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenu.RadioItem> & {
  inset?: boolean;
}) => {
  return (
    <ContextMenu.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-secondary focus:text-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}>
      <span className="pointer-events-none absolute right-2">
        <ContextMenu.ItemIndicator>
          <CheckIcon />
        </ContextMenu.ItemIndicator>
      </span>
      {children}
    </ContextMenu.RadioItem>
  );
};

const Label = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenu.Label> & {
  inset?: boolean;
}) => {
  return (
    <ContextMenu.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn("px-1.5 py-1 text-xs font-medium text-foreground/70 data-inset:pl-7", className)}
      {...props}
    />
  );
};

const Separator = ({ className, ...props }: React.ComponentProps<typeof ContextMenu.Separator>) => {
  return (
    <ContextMenu.Separator
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-muted/80", className)}
      {...props}
    />
  );
};

const Shortcut = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-foreground/60 group-focus/context-menu-item:text-foreground",
        className,
      )}
      {...props}
    />
  );
};

export const Context = Object.assign(ContextRoot, {
  Trigger,
  Content,
  Item,
  CheckboxItem,
  RadioItem,
  Label,
  Separator,
  Shortcut,
  Group,
  Portal,
  Sub,
  SubContent,
  SubTrigger,
  RadioGroup,
});
