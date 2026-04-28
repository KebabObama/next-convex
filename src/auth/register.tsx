"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { type RegistrationData, RegistrationSchema } from "./types";

export const Register = () => {
  const { signIn } = useAuthActions();
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationData>({
    resolver: zodResolver(RegistrationSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: RegistrationData) => {
    await signIn("password", { ...data, flow: "signUp" });
    replace("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="register-name" className="mb-1 block text-sm text-slate-700">
          Full name
        </label>
        <Input
          id="register-name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
          placeholder="John Doe"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="register-email" className="mb-1 block text-sm text-slate-700">
          Email
        </label>
        <Input
          id="register-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
          placeholder="someone@example.com"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="register-password" className="mb-1 block text-sm text-slate-700">
          Password
        </label>
        <Input
          id="register-password"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="register-password-confirmation" className="mb-1 block text-sm text-slate-700">
          Confirm password
        </label>
        <Input
          id="register-password-confirmation"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.passwordConfirmation)}
          {...register("passwordConfirmation")}
          placeholder="Confirm password"
        />
        {errors.passwordConfirmation && <p className="text-sm text-red-500">{errors.passwordConfirmation.message}</p>}
      </div>

      <p className="text-xs text-slate-500">Use 8-64 characters with at least one uppercase letter and one number.</p>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          className="size-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
          {...register("acceptToS")}
        />
        Accept
        <Link href="/" className="text-blue-500 flex items-center gap-1.5">
          Terms of service <ExternalLink size={16} />
        </Link>
      </label>

      <div>
        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </div>
    </form>
  );
};
