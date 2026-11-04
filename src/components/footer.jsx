import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

const linkColumns = [
  {
    title: "Quicklinks",
    links: [
      { label: "Home", href: "#" },
      { label: "Destinations", href: "#destinations" },
      { label: "My Bookings", href: "#bookings" },
      { label: "My Profile", href: "#profile" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#help" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
];

const contactLinks = [
  { label: "786 901 1622", href: "tel:+17869011622" },
  { label: "info@wandariand.com", href: "mailto:info@wandariand.com" },
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
      <h3 className="text-sm uppercase tracking-wide text-white/90">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterSignUp() {
  return (
    <div data-slot="footer-newsletter">
      <h3 className="text-sm uppercase tracking-wide text-white/90">
        Newsletter
      </h3>
      <p className="mt-3 text-xs text-white/60">
        Subscribe for exclusive travel deals and inspiration.
      </p>
      <form className="relative mt-4 max-w-60">
        <Input
          type="email"
          placeholder="Enter email"
          className="h-11 border-transparent bg-white/10 pr-10 text-white placeholder:text-white/50 focus-visible:bg-white/15"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute right-1 top-1 flex size-8 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
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
      className={cn("bg-[#0c0d0d] text-white", className)}
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div>
          <p className="text-5xl font-bold tracking-tight md:text-6xl">
            Wanderlast
          </p>
          <p className="mt-3 text-sm text-white/70">
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

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
          <p className="text-xs text-white/50">
            &copy; 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-white/70 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
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
