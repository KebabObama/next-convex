import { AvatarUpload } from "@/settings/upload-avatar";
import { UploadUsername } from "@/settings/upload-username";

export default () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="max-w-2xl text-sm text-foreground/70">
          Update your profile details, change the email on your account, and shape your bio with markdown.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <section className="h-full rounded-2xl border border-muted/60 bg-card p-6 shadow-sm lg:max-w-sm">
            <div className="mb-4">
              <h2 className="font-heading text-xl font-semibold">Avatar</h2>
              <p className="text-sm text-foreground/70">Upload and crop your profile picture.</p>
            </div>
            <AvatarUpload />
          </section>

          <section className="grow h-full rounded-2xl border border-muted/60 bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-xl font-semibold">Account</h2>
              <p className="text-sm text-foreground/70">Manage your public name, login email, and password.</p>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <UploadUsername />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
