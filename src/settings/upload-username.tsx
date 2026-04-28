"use client";

//#region
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

//#endregion

const NameSettingsSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
});

export const UploadUsername = () => {
  const user = useQuery(api.users.getProfile, {});
  const update = useMutation(api.users.updateUserName);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof NameSettingsSchema>>({
    resolver: zodResolver(NameSettingsSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { name: user?.name ?? "" },
  });

  useEffect(() => {
    if (!user) return;
    reset({ ...user });
  }, [user, reset]);

  const onSubmit = handleSubmit(async ({ name }) => {
    await update({ name });
    toast.success("Successfully set new username");
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="settings-name" className="text-sm font-medium text-foreground/80">
          Name
        </label>
        <p className="text-xs text-foreground/60">This name appears in your profile.</p>
      </div>

      <div className="mt-4 flex w-full gap-2 items-start">
        <div className="grow">
          <Input
            id="settings-name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            disabled={isLoading}
            {...register("name")}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <Button type="submit" disabled={isLoading || watch("name") === user?.name}>
          {isLoading ? "Saving..." : "Save name"}
        </Button>
      </div>
    </form>
  );
};
