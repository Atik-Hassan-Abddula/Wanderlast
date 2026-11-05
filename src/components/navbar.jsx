"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2, User } from "lucide-react";
import { cn } from "@/lib/utils";

import { authClient } from "@/lib/auth-client";
import SignOutButton from "@/components/sign-out-button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destination" },
  { label: "Add Destinations", href: "/add-destination" },
  { label: "My Bookings", href: "#bookings" },
];

function Navbar({ className }) {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <header
      data-slot="navbar"
      className={cn("relative z-50 bg-background shadow-sm", className)}
    >
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4">

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              data-active={link.active || undefined}
              className={cn(
                "transition-colors hover:text-foreground",
                link.active
                  ? "text-[#1d9cb2] underline decoration-[#1d9cb2] decoration-2 underline-offset-[6px] hover:text-[#17869a]"
                  : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link
          href="/"
          aria-label="Wanderlast home"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={110}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Authentication */}
        <div className="hidden items-center gap-5 text-sm sm:flex">
          {isPending ? (
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          ) : user ? (
            <>
              {/* User Avatar and Profile */}
              <Link
                href="/profile"
                className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
              >
                <Avatar className="size-9 border">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                  />

                  <AvatarFallback className="bg-[#1d9cb2] font-semibold text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                <span className="max-w-28 truncate font-medium">
                  {user.name || "Profile"}
                </span>
              </Link>

              {/* Sign Out */}
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export { Navbar };