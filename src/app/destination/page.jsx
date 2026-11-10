
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ArrowRight } from "lucide-react";

// Loading Component
function DestinationLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-88 animate-pulse rounded-2xl border border-border/60 bg-muted/40"
          />
        ))}
      </div>
    </div>
  );
}

// Destination List Component
async function DestinationList() {
  // Prevent prerender-time API fetching
  await connection();

  let data = [];

  try {
    const res = await fetch(
      `https://wander-last-server-dun.vercel.app/destination`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error(
        "Invalid destination data received from server."
      );
    }
  } catch (error) {
    console.error("Destination Fetch Error:", error);

    return (
      <div className="px-4 py-20 text-center animate-fade-in">
        <h2 className="text-xl font-bold text-destructive">
          Failed to load destinations
        </h2>

        <p className="mt-2 break-words text-sm text-muted-foreground">
          {error.message}
        </p>
      </div>
    );
  }

  // Empty State
  if (data.length === 0) {
    return (
      <div className="px-4 py-20 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-foreground">
          No Destinations Found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          No destinations are available right now. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-5 sm:py-12 animate-fade-in">

      {/* Heading */}
      <div className="mb-8 sm:mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
          Handpicked Getaways
        </span>
        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl font-serif">
          Explore Destinations
        </h1>

        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Discover breathtaking places and curated travel experiences around the world.
        </p>
      </div>

      {/* Responsive Destination Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {data.map((destination) => (
          <div
            key={destination._id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-900/5 dark:hover:shadow-black/40"
          >

            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              {destination.imageUrl ? (
                <Image
                  src={destination.imageUrl}
                  alt={destination.name || "Destination"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  No preview available
                </div>
              )}
              {destination.category && (
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  {destination.category}
                </span>
              )}
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-5">

              {/* Country */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MapPin size={14} className="shrink-0 text-cyan-600 dark:text-cyan-400" />
                <span className="truncate">
                  {destination.country}
                </span>
              </div>

              {/* Destination Name */}
              <h2 className="mt-2 line-clamp-1 text-lg font-bold text-foreground sm:text-xl font-serif">
                {destination.name}
              </h2>

              {/* Rating and Price */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3">

                <div className="flex items-center gap-1.5">
                  <Star
                    size={16}
                    className="shrink-0 fill-amber-400 text-amber-400"
                  />

                  <span className="text-sm font-semibold text-foreground">
                    {destination.rating || "4.5"}
                  </span>
                </div>

                <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                  ${destination.price}
                  <span className="text-xs font-normal text-muted-foreground ml-1">/ person</span>
                </p>

              </div>

              {/* Duration */}
              {destination.duration && (
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                  {destination.duration}
                </p>
              )}

              {/* View Details Button */}
              <Link
                href={`/destination/${destination._id}`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-cyan-700 active:scale-95"
              >
                View Details
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

// Default Page Component
export default function DestinationPage() {
  return (
    <Suspense fallback={<DestinationLoading />}>
      <DestinationList />
    </Suspense>
  );
}
