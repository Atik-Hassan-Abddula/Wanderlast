"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { siGithub } from "simple-icons";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim();
    const image = formData.get("image")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
      });

      if (error) {
        toast.error(error.message || "Signup failed!");
        return;
      }

      console.log("Signup successful:", data);

      toast.success("Account created successfully!");

      form.reset();
      setShowPassword(false);

      // Redirect to Home Page
      router.push("/");
      router.refresh();

    } catch (error) {
      console.error("Signup error:", error);

      toast.error(
        error.message || "Something went wrong. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div className="space-y-2 text-center pb-2">
        <h1 className="text-3xl font-bold font-serif tracking-tight text-foreground">
          Create an account
        </h1>

        <p className="text-sm text-muted-foreground">
          Join WanderLast and start exploring the world.
        </p>
      </div>

      {/* Social Signup */}
      <div className="grid grid-cols-2 gap-3">

        {/* Google */}
        <button
          type="button"
          onClick={() => toast.info("Google OAuth is not connected yet.")}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent active:scale-95"
        >
          <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.1 13.22l7.98 6.19C12.97 13.72 18.03 9.5 24 9.5Z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.27 5.64c4.25-3.92 7.51-9.7 7.51-17.29Z" />
            <path fill="#FBBC05" d="M10.08 28.59a14.4 14.4 0 0 1 0-9.18L2.1 13.22a24 24 0 0 0 0 21.56l7.98-6.19Z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.27-5.64c-2.02 1.36-4.6 2.16-8.64 2.16-5.97 0-11.03-4.22-12.92-9.91L3.1 34.78C6.51 42.62 14.62 48 24 48Z" />
          </svg>
          Google
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={() => toast.info("GitHub OAuth is not connected yet.")}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5 fill-current"
            aria-label="GitHub"
          >
            <path d={siGithub.path} />
          </svg>
          GitHub
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            required
            className="h-12 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium text-foreground">
            Profile Image URL
          </label>

          <input
            id="image"
            name="image"
            type="url"
            placeholder="https://example.com/profile.jpg"
            className="h-12 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            required
            className="h-12 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password (min. 8 characters)"
              autoComplete="new-password"
              minLength={8}
              required
              className="h-12 w-full rounded-xl border border-border bg-background px-3.5 pr-11 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-cyan-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-cyan-600 px-4 text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-cyan-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Sign In */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/loging"
          className="font-semibold text-cyan-600 dark:text-cyan-400 underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}