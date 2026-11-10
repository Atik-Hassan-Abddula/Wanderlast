
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import {
  Loader2,
  User,
  Settings,
  CalendarDays,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import SignOutButton from "@/components/sign-out-button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Navigation Links
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destination" },
  { label: "Add Destinations", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
];

// Active Link
function isLinkActive(pathname, href) {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Dark / Light Mode Button
function ThemeToggle({ className }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/50",
          className
        )}
      >
        <Moon size={18} className="text-muted-foreground" />
      </div>
    );
  }

  const isDark = (theme || resolvedTheme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light Mode" : "Dark Mode"}
      className={cn(
        "group relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background/80 text-foreground shadow-xs backdrop-blur-xs transition-all duration-300 hover:scale-105 hover:border-cyan-500/40 hover:bg-accent active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-500/30",
        className
      )}
    >
      <span className="sr-only">Toggle theme</span>
      <div
        className={cn(
          "flex items-center justify-center transition-all duration-500 ease-out",
          isDark ? "rotate-180 scale-100" : "rotate-0 scale-100"
        )}
      >
        {isDark ? (
          <Sun
            size={19}
            className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-transform duration-300 group-hover:rotate-45"
          />
        ) : (
          <Moon
            size={19}
            className="text-cyan-600 transition-transform duration-300 group-hover:-rotate-12"
          />
        )}
      </div>
    </button>
  );
}

function Navbar({ className }) {
  const { data: session, isPending } = authClient.useSession();

  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const user = session?.user;

  // Close mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // User Initials
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
      className={cn(
        "relative z-50 border-b border-border bg-background text-foreground shadow-sm",
        className
      )}
    >
      {/* Main Navbar */}
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground/80 transition-all duration-200 hover:bg-accent hover:text-foreground active:scale-95 md:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <div className="transition-transform duration-300 ease-out">
            {menuOpen ? (
              <X className="size-6 transition-transform duration-300 rotate-90 animate-scale-in" />
            ) : (
              <Menu className="size-6 transition-transform duration-300" />
            )}
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3.5 py-2 font-medium transition-all duration-200",
                  active
                    ? "font-semibold text-cyan-600 dark:text-cyan-400"
                    : "text-foreground/75 hover:bg-muted/70 hover:text-foreground"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-cyan-600 dark:bg-cyan-400 transition-all duration-300 animate-scale-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logo */}
        <Link
          href="/"
          aria-label="Wanderlast home"
          onClick={() => setMenuOpen(false)}
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

        {/* Mobile Theme Toggle */}
        <div className="absolute right-4 md:hidden">
          <ThemeToggle />
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-5 text-sm sm:flex">

          {/* Desktop Theme Toggle */}
          <ThemeToggle />

          {isPending ? (
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          ) : user ? (
            <Popover>

              {/* Avatar Trigger */}
              <PopoverTrigger
                render={
                  <Button
                    variant="ghost"
                    className="flex h-auto items-center gap-2 rounded-full px-2 py-1"
                  />
                }
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
              </PopoverTrigger>

              {/* Profile Popover */}
              <PopoverContent align="end" className="w-72 p-0">

                {/* User Information */}
                <div className="p-4">
                  <div className="flex items-center gap-3">

                    <Avatar className="size-12">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />

                      <AvatarFallback className="bg-[#1d9cb2] font-semibold text-white">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <h4 className="truncate font-semibold">
                        {user.name || "User"}
                      </h4>

                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Profile Links */}
                <div className="border-t p-2">

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                  >
                    <User className="size-4" />
                    My Profile
                  </Link>

                  <Link
                    href="/destination"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                  >
                    <CalendarDays className="size-4" />
                    My Destinations
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                  >
                    <Settings className="size-4" />
                    Settings
                  </Link>

                </div>

                {/* Sign Out */}
                <div className="border-t p-3">
                  <SignOutButton />
                </div>

              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/loging"
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

      {/* Mobile Menu Panel */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out md:hidden",
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none border-t-transparent"
        )}
      >
        <div className="py-2">
          {/* Mobile Navigation Links */}
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {navLinks.map((link) => {
              const active = isLinkActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent",
                    active
                      ? "font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/30"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="size-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Authentication */}
          <div className="border-t border-border mt-2 sm:hidden">
            <div className="mx-auto max-w-7xl px-4 py-3">
              {isPending ? (
                <div className="flex h-10 items-center justify-center">
                  <Loader2 className="size-5 animate-spin text-muted-foreground" />
                </div>
              ) : user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-10 border border-border">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback className="bg-cyan-600 font-semibold text-white">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {user.name || "User"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <SignOutButton />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/loging"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex flex-1 items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-accent hover:text-foreground active:scale-95"
                  >
                    Login
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex flex-1 items-center justify-center rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-cyan-700 active:scale-95"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Navbar };
