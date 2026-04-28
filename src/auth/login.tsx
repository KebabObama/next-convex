"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { type LoginData, LoginSchema } from "./types";

export const Login = () => {
  const { signIn } = useAuthActions();
  const { replace } = useRouter();
  const [showPassowrd, setShowPassowrd] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: LoginData) => {
    await signIn("password", { ...data, flow: "signUp" });
    replace("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="mb-1 block text-sm text-slate-700">
          Email
        </label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          placeholder="someone@example.com"
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="login-password" className="mb-1 block text-sm text-slate-700">
          Password
        </label>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassowrd ? "text" : "password"}
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassowrd((p) => !p)}
            className="absolute top-1/2 -translate-y-1/2 right-2 z-1 cursor-pointer">
            {showPassowrd ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  );
};
