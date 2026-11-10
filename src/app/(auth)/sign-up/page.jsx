import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background text-foreground p-6 md:p-10 transition-colors duration-300">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 self-center font-serif text-lg font-bold tracking-tight text-foreground transition hover:opacity-80"
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-cyan-600 text-white shadow-xs">
            <GalleryVerticalEnd className="size-4" />
          </div>
          WanderLast
        </Link>

        <div className="rounded-3xl border border-border/80 bg-card text-card-foreground p-7 sm:p-9 shadow-2xl animate-scale-in">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}