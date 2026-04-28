"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Login } from "./login";
import { Register } from "./register";

export const AuthContent = () => {
  const params = useSearchParams();
  const isRegister = params.get("mode") === "register";

  return (
    <section className="relative w-full h-full max-w-4xl overflow-hidden md:rounded-xl border bg-card shadow-2xl">
      <div className="hidden md:grid grid-cols-2 h-full min-h-192">
        <div className="flex flex-col justify-start p-8 md:p-12 h-full">
          <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-foreground/70">Sign in to your account to continue where you left off.</p>
          <GoBack />
        </div>

        <div className="flex flex-col justify-start p-8 md:p-12">
          <h2 className="text-2xl font-bold tracking-tight">New Here?</h2>
          <p className="mt-2 text-foreground/70">Create an account and start shipping your projects faster.</p>
          <GoBack side="right" />
        </div>
      </div>

      {/* Sliding panel */}
      <div
        className={cn(
          "absolute inset-y-2 left-2 hidden w-[calc(50%-0.5rem)] md:block",
          "transform transition-transform duration-500 ease-in-out",
          isRegister ? "translate-x-0" : "translate-x-full",
        )}>
        <div className="rounded-lg border bg-background p-8 shadow-sm h-full">
          <AuthCard isRegister={isRegister} />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden h-dvh md:h-full p-4">
        <AuthCard isRegister={isRegister} />
      </div>
    </section>
  );
};

export const AuthCard = ({ isRegister }: { isRegister: boolean }) => {
  return (
    <div className="flex h-full flex-col gap-4 md:gap-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">{isRegister ? "Create account" : "Sign in"}</h1>
        <NavigationSwitch isRegister={isRegister} />
      </div>

      <div className="grid relative">
        {/* Login */}
        <div
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-300 ease-in-out",
            isRegister ? "opacity-0 pointer-events-none hidden md:block" : "opacity-100",
          )}>
          <Login />
        </div>

        {/* Register */}
        <div
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-300 ease-in-out",
            isRegister ? "opacity-100" : "opacity-0 pointer-events-none hidden md:block",
          )}>
          <Register />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs uppercase text-foreground/70 md:mt-auto">
        <span className="grow border-t-2" />
        <span className="px-2">Or</span>
        <span className="grow border-t-2" />
      </div>
    </div>
  );
};

export const NavigationSwitch = ({ isRegister }: { isRegister: boolean }) => {
  return isRegister ? (
    <nav className="flex gap-1 text-sm text-foreground/70">
      Already have an account?
      <Link href="/auth?mode=login" className="font-medium text-primary underline-offset-4 hover:underline">
        Login
      </Link>
    </nav>
  ) : (
    <nav className="flex gap-1 text-sm text-foreground/70">
      No account yet?
      <Link href="/auth?mode=register" className="font-medium text-primary underline-offset-4 hover:underline">
        Register
      </Link>
    </nav>
  );
};

export const GoBack = ({ side = "left" }: { side?: "left" | "right" }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center flex-row text-sm gap-1.5 absolute bottom-12 text-foreground/70 font-semibold",
        "transition-transform duration-200",
        "hover:text-foreground focus:text-foreground focus:scale-105 hover:scale-105",
        side === "left" ? "left-12" : "right-12",
      )}>
      <ArrowLeft size={16} />
      Go back
    </Link>
  );
};
