
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";

// Loading Component
function DestinationLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-80 animate-pulse rounded-xl bg-gray-200"
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
      "http://localhost:8000/destination",
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
      <div className="px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-red-500">
          Failed to load destinations
        </h2>

        <p className="mt-2 break-words text-sm text-gray-500">
          {error.message}
        </p>
      </div>
    );
  }

  // Empty State
  if (data.length === 0) {
    return (
      <div className="px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">
          No Destinations Found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          No destinations are available right now.
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-5 sm:py-10">

      {/* Heading */}
      <div className="mb-7 sm:mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Explore Destinations
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Discover amazing places around the world.
        </p>
      </div>

      {/* Responsive Destination Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

        {data.map((destination) => (
          <div
            key={destination._id}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >

            {/* Image */}
            <div className="w-full overflow-hidden">
              <img
                src={destination.imageUrl}
                alt={destination.name || "Destination"}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">

              {/* Country */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={15} className="shrink-0" />

                <span className="truncate">
                  {destination.country}
                </span>
              </div>

              {/* Destination Name */}
              <h2 className="mt-2 line-clamp-1 text-lg font-bold text-gray-900 sm:text-xl">
                {destination.name}
              </h2>

              {/* Rating and Price */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">

                <div className="flex items-center gap-1">
                  <Star
                    size={16}
                    className="shrink-0 fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm text-gray-700">
                    {destination.rating || "4.5"}
                  </span>
                </div>

                <p className="text-base font-bold text-cyan-600 sm:text-lg">
                  ${destination.price}
                </p>

              </div>

              {/* Duration */}
              <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                {destination.duration}
              </p>

              {/* View Details Button */}
              <Link
                href={`/destination/${destination._id}`}
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 sm:mt-5"
              >
                View Details
                <ArrowRight size={16} />
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
