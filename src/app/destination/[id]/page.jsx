
import Link from "next/link";
import Image from "next/image";

import {
  MapPin,
  Star,
  CalendarDays,
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

import EditDestinationDialog from "@/components/EdditDestinationDaialog";
import DeleteDestinationButton from "@/components/DeleteDestinationButton";
import DestinationBookingCard from "@/components/destination-booking-card";

// Loading Skeleton
function DestinationLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 h-8 w-40 rounded-lg bg-muted" />

        <div className="h-[350px] rounded-3xl bg-muted md:h-[480px]" />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="h-10 w-1/2 rounded bg-muted" />
            <div className="h-5 w-full rounded bg-muted" />
            <div className="h-5 w-4/5 rounded bg-muted" />
          </div>

          <div className="h-80 rounded-2xl bg-muted" />
        </div>
      </div>
    </main>
  );
}

export default async function DestinationDetails({ params }) {
  const { id } = await params;

  let data = null;
  let fetchError = null;

  try {
    const res = await fetch(
      `http://localhost:8000/destination/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      fetchError = res.status === 404 ? "not-found" : "error";
    } else {
      const result = await res.json();
      data = result?.data ?? result;

      if (!data || typeof data !== "object") {
        fetchError = "error";
      }
    }
  } catch (error) {
    console.error("Destination fetch error:", error);
    fetchError = "error";
  }

  if (fetchError === "not-found") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-foreground font-serif">
          Destination Not Found
        </h2>

        <p className="mt-3 text-muted-foreground">
          The destination you are looking for does not exist.
        </p>

        <Link
          href="/destination"
          className="mt-6 flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-xs transition hover:bg-cyan-700 active:scale-95"
        >
          <ArrowLeft size={18} />
          Back to Destinations
        </Link>
      </div>
    );
  }

  if (fetchError === "error") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-destructive font-serif">
          Something went wrong!
        </h2>

        <p className="mt-3 text-muted-foreground">
          Unable to load destination details. Please try again.
        </p>

        <Link
          href="/destination"
          className="mt-6 flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-xs transition hover:bg-cyan-700 active:scale-95"
        >
          <ArrowLeft size={18} />
          Back to Destinations
        </Link>
      </div>
    );
  }

  if (!data) {
    return <DestinationLoading />;
  }

  const destinationName =
    data.name || data.title || "Untitled Destination";

  const destinationImage =
    data.imageUrl || data.image || "";

  const highlights = Array.isArray(data.highlights)
    ? data.highlights
    : [];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">

        {/* Top Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/destination"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Destinations
          </Link>

          {/* Edit and Delete */}
          <div className="flex items-center gap-3">
            <EditDestinationDialog
              destination={data}
              id={id}
            />

            <DeleteDestinationButton id={id} />
          </div>
        </div>

        {/* Hero Image */}
        <section className="relative overflow-hidden rounded-3xl bg-muted shadow-xl">
          {destinationImage ? (
            <div className="relative h-[280px] w-full sm:h-[380px] lg:h-[480px]">
              <Image
                src={destinationImage}
                alt={destinationName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-[280px] items-center justify-center text-muted-foreground sm:h-[380px] lg:h-[480px]">
              No image available
            </div>
          )}

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Image Content */}
          <div className="absolute bottom-0 left-0 p-6 text-white sm:p-10">
            {data.country && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
                <MapPin size={14} />
                {data.country}
              </div>
            )}

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-serif drop-shadow-sm">
              {destinationName}
            </h1>

            <p className="mt-3 max-w-xl text-sm text-white/90 sm:text-base leading-relaxed">
              Discover beautiful places and create unforgettable memories.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">

            {/* Destination Overview Card */}
            <section className="rounded-2xl border border-border/80 bg-card text-card-foreground p-6 shadow-xs sm:p-8">

              {/* Rating and Duration */}
              <div className="flex flex-wrap items-center gap-5">

                {data.rating != null && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/40">
                      <Star
                        size={19}
                        className="fill-amber-400 text-amber-400"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {data.rating}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {data.reviews ?? 0} reviews
                      </p>
                    </div>
                  </div>
                )}

                {data.duration && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-950/40">
                      <CalendarDays
                        size={19}
                        className="text-cyan-600 dark:text-cyan-400"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {data.duration}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Trip Duration
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="my-7 border-t border-border/60" />

              {/* Overview */}
              <div className="mt-2">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-950/40">
                    <Sparkles
                      size={21}
                      className="text-cyan-600 dark:text-cyan-400"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground font-serif">
                      Overview
                    </h2>

                    <p className="text-xs text-muted-foreground">
                      Discover this amazing destination
                    </p>
                  </div>
                </div>

                <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {data.description ||
                    data.overview ||
                    "No overview available for this destination."}
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-9 border-t border-border/60 pt-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 dark:bg-green-950/40">
                    <Check
                      size={21}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-foreground font-serif">
                      Destination Highlights
                    </h2>

                    <p className="text-xs text-muted-foreground">
                      What makes this destination special
                    </p>
                  </div>
                </div>

                {highlights.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {highlights.map((item, index) => (
                      <div
                        key={index}
                        className="group flex items-start gap-3 rounded-xl border border-border/70 bg-muted/30 p-4 transition duration-300 hover:border-cyan-500/40 hover:bg-muted/60"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950/50 transition group-hover:bg-cyan-100 dark:group-hover:bg-cyan-950/50">
                          <Check
                            size={16}
                            className="text-green-600 dark:text-green-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                          />
                        </div>

                        <p className="pt-1 text-sm font-medium leading-6 text-foreground/90">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl bg-muted/40 p-5 text-sm text-muted-foreground">
                    No highlights available for this destination.
                  </p>
                )}
              </div>
            </section>

            {/* Location Card */}
            {data.location && (
              <section className="rounded-2xl border border-border/80 bg-card text-card-foreground p-6 shadow-xs sm:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin
                    size={21}
                    className="text-cyan-600 dark:text-cyan-400"
                  />

                  <h2 className="text-xl font-bold text-foreground font-serif">
                    Location
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground">
                  {data.location}
                </p>
              </section>
            )}

          </div>

          {/* Right Booking Card */}
          <aside className="lg:col-span-1">
            <DestinationBookingCard
              data={data}
              id={id}
            />
          </aside>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <Link
            href="/destination"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-cyan-600 hover:text-cyan-600 dark:hover:border-cyan-400 dark:hover:text-cyan-400 shadow-xs active:scale-95"
          >
            <ArrowLeft size={17} />
            All Destinations
          </Link>

          <Link
            href="/add-destination"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-cyan-700 active:scale-95"
          >
            Add Destination
            <ArrowRight size={17} />
          </Link>
        </div>

      </div>
    </main>
  );
}
