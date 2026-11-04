import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "cn";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destination" },
  { label: "Add Destinations", href: "/add-destination" },
  { label: "My Bookings", href: "#bookings" },
  // { label: "Admin", href: "#admin" },
];

function Navbar({ className }) {
  return (
    <header
      data-slot="navbar"
      className={cn("relative z-50 bg-background shadow-sm", className)}
    >
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
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

        <a
          href="#"
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
        </a>

        <div className="hidden items-center gap-5 text-sm sm:flex">
          <a
            href="#profile"
            className="flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-foreground"
          >
            <User className="size-4" />
            Profile
          </a>
          <a
            href="#login"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Login
          </a>
          <a
            href="#signup"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}

export { Navbar };
