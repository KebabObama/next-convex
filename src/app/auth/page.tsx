import { AuthContent } from "@/auth/content";

export default () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background md:p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-secondary/50 blur-[120px]" />
      </div>
      <AuthContent />
    </main>
  );
};
