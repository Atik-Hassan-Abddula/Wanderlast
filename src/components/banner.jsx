import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
      className={cn(
        "flex w-full flex-col bg-black/45 backdrop-blur-sm sm:flex-row",
        className
      )}
    >
      <div className="flex w-full flex-col divide-y divide-white/20 sm:flex-row sm:divide-y-0 sm:divide-x">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-4 py-2.5 text-white"
          >
            <span className="text-sm font-semibold">{field.label}</span>
            <Input
              type="text"
              placeholder={field.placeholder}
              className="h-6 border-0 bg-transparent px-0 text-xs text-white placeholder:text-white/70 focus-visible:border-transparent focus-visible:ring-0 md:text-xs"
            />
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className="h-12 shrink-0 rounded-none bg-[#1d9cb2] text-sm font-semibold tracking-wide text-white hover:bg-[#17869a] sm:h-auto sm:flex-1"
      >
        Search
      </Button>
    </form>
  );
}

function Banner({ className }) {
  return (
    <section
      data-slot="banner"
      className={cn("relative flex min-h-[560px] flex-col overflow-hidden", className)}
    >
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h1 className="text-5xl font-normal leading-tight tracking-tight text-balance md:text-6xl">
            Discover Your Next Adventure
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/85 md:text-base">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button className="h-11 gap-2 bg-[#1d9cb2] px-7 text-sm font-semibold tracking-wide text-white hover:bg-[#17869a]">
              EXPLORE NOW
              <ArrowRight className="size-4" />
            </Button>
            <Button className="h-11 bg-white/25 px-7 text-sm font-semibold tracking-wide text-white backdrop-blur-sm hover:bg-white/35">
              VIEW DESTINATION
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <BannerSearch />
      </div>
    </section>
  );
}

export { Banner, BannerSearch };
