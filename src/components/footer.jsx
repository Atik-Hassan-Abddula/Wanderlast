"use client";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

const linkColumns = [
  {
    title: "Quicklinks",
    links: [
      { label: "Home", href: "/" },
      { label: "Destinations", href: "/destination" },
      { label: "My Bookings", href: "/my-bookings" },
      { label: "Add Destination", href: "/add-destination" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/destination" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
];

const contactLinks = [
  { label: "786 901 1622", href: "tel:+17869011622" },
  { label: "info@wanderlast.com", href: "mailto:info@wanderlast.com" },
];

const socials = [
  {
    label: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.126 2.062 2.062 0 0 1 0 4.126zM6.9 20.452H3.773V9H6.9v11.452z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.616-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
];

function LinkColumn({ title, links }) {
  return (
    <div data-slot="footer-links">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 dark:text-foreground">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3 text-sm">
        {links.map((link) => {
          const isInternal = link.href.startsWith("/");
          return (
            <li key={link.label}>
              {isInternal ? (
                <Link
                  href={link.href}
                  className="text-slate-400 dark:text-muted-foreground transition-all duration-200 hover:text-cyan-400 dark:hover:text-cyan-300 hover:translate-x-0.5 inline-block"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="text-slate-400 dark:text-muted-foreground transition-all duration-200 hover:text-cyan-400 dark:hover:text-cyan-300 hover:translate-x-0.5 inline-block"
                >
                  {link.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function NewsletterSignUp() {
  return (
    <div data-slot="footer-newsletter">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 dark:text-foreground">
        Newsletter
      </h3>
      <p className="mt-3 text-xs text-slate-400 dark:text-muted-foreground leading-relaxed">
        Subscribe for exclusive travel deals and seasonal inspiration.
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative mt-4 max-w-68"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          className="h-11 rounded-xl border-slate-700/80 bg-white/5 pr-11 text-xs text-slate-100 placeholder:text-slate-400 focus-visible:border-cyan-500 focus-visible:bg-white/10 dark:bg-card/40"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute right-1.5 top-1.5 flex size-8 items-center justify-center rounded-lg bg-cyan-600 text-white transition-all duration-200 hover:bg-cyan-500 hover:scale-105 active:scale-95"
        >
          <ArrowUpRight className="size-4" />
        </button>
      </form>
    </div>
  );
}

function Footer({ className }) {
  return (
    <footer
      data-slot="footer"
      className={cn(
        "border-t border-slate-800/80 bg-[#0b0f19] text-slate-100 dark:border-border dark:bg-[#0c0e14] dark:text-foreground transition-colors duration-300",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div>
          <p className="text-4xl font-bold tracking-tight text-white md:text-5xl font-serif">
            Wanderlast
          </p>
          <p className="mt-3 max-w-md text-sm text-slate-400 dark:text-muted-foreground leading-relaxed">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <NewsletterSignUp />
          {linkColumns.map((column) => (
            <LinkColumn key={column.title} {...column} />
          ))}
          <LinkColumn title="Contact Us" links={contactLinks} />
        </div>
      </div>

      <div className="border-t border-slate-800/60 dark:border-border/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
          <p className="text-xs text-slate-400 dark:text-muted-foreground">
            &copy; 2026 WanderLast. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="size-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 dark:text-muted-foreground transition-all duration-200 hover:scale-110 hover:bg-cyan-600 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-3.5"
                  aria-hidden="true"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
