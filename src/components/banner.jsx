import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime / 3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

function BannerSearch({ className }) {
  return (
    <form
      data-slot="banner-search"
      action="/destination"
      className={cn(
        "flex w-full flex-col bg-black/55 backdrop-blur-md border-t border-white/10 sm:flex-row transition-all duration-300",
        className
      )}
    >
      <div className="flex w-full flex-col divide-y divide-white/15 sm:flex-row sm:divide-y-0 sm:divide-x">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="group flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-4 py-3 text-white transition-colors duration-200 hover:bg-white/5"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
              {field.label}
            </span>
            <Input
              type="text"
              name={field.label.toLowerCase()}
              placeholder={field.placeholder}
              className="h-7 border-0 bg-transparent px-0 text-xs text-white placeholder:text-white/60 focus-visible:border-transparent focus-visible:ring-0 md:text-xs"
            />
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className="h-14 shrink-0 rounded-none bg-cyan-600 px-8 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-cyan-700 active:scale-95 sm:h-auto sm:flex-1"
      >
        <Search className="mr-2 size-4" />
        Search
      </Button>
    </form>
  );
}

function Banner({ className }) {
  return (
    <section
      data-slot="banner"
      className={cn("group relative flex min-h-[580px] flex-col overflow-hidden", className)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/Banner.png"
          alt="Discover your next adventure"
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-black/75 dark:via-black/55 dark:to-black/85 transition-colors duration-300" />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center text-white">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl font-normal leading-tight tracking-tight text-balance md:text-6xl drop-shadow-sm">
              Discover Your Next Adventure
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/90 md:text-base leading-relaxed">
              Explore breathtaking destinations and create unforgettable memories
              with our curated travel experiences.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
            <Link href="/destination">
              <Button className="h-12 gap-2 rounded-xl bg-cyan-600 px-8 text-sm font-semibold tracking-wide text-white shadow-lg shadow-cyan-900/30 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-700 hover:shadow-cyan-900/50 active:scale-95">
                EXPLORE NOW
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/destination">
              <Button
                variant="outline"
                className="h-12 rounded-xl border-white/30 bg-white/15 px-8 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 hover:border-white/50 active:scale-95"
              >
                VIEW DESTINATION
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 animate-fade-in">
        <BannerSearch />
      </div>
    </section>
  );
}

export { Banner, BannerSearch };
