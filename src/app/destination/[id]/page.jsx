
import { Suspense } from "react";

import {
  MapPin,
  Star,
  CalendarDays,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";

import Link from "next/link";

import EditDestinationDialog from "@/components/EdditDestinationDaialog";
import DeleteDestinationButton from "@/components/DeleteDestinationButton";

// Loading Component
function DestinationLoading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="animate-pulse space-y-5">
        <div className="h-8 w-40 rounded bg-gray-200" />
        <div className="h-[300px] w-full rounded-xl bg-gray-200" />
        <div className="h-8 w-2/3 rounded bg-gray-200" />
        <div className="h-24 w-full rounded bg-gray-200" />
      </div>
    </div>
  );
}

// Destination Details Component
async function DestinationDetails({ params }) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:8000/destination/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">
          Destination Not Found
        </h2>

        <Link
          href="/destination"
          className="mt-4 inline-block text-cyan-600"
        >
          Back to Destinations
        </Link>
      </div>
    );
  }

  const data = await res.json();

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">

      {/* Back Button + Edit and Delete */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <Link
          href="/destination"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-600"
        >
          <ArrowLeft size={17} />
          Back to Destinations
        </Link>

        {/* Edit and Delete Buttons */}
        <div className="flex items-center gap-3">

          <EditDestinationDialog 
            destination={data}
            id={id}
          />

          <DeleteDestinationButton id={id} />

        </div>

      </div>

      {/* Destination Image */}
      <div className="overflow-hidden rounded-2xl">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="h-[250px] w-full object-cover sm:h-[400px]"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Left Side */}
        <div className="lg:col-span-2">

          {/* Country */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={17} />
            {data.country}
          </div>

          {/* Destination Name */}
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            {data.name}
          </h1>

          {/* Rating and Duration */}
          <div className="mt-4 flex flex-wrap items-center gap-5">

            <div className="flex items-center gap-2">
              <Star
                className="fill-yellow-400 text-yellow-400"
                size={18}
              />

              <span className="font-semibold">
                {data.rating || "4.5"}
              </span>

              <span className="text-sm text-gray-500">
                ({data.reviews || 0} reviews)
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays size={17} />
              {data.duration}
            </div>

          </div>

          {/* Overview */}
          <section className="mt-8">

            <h2 className="text-xl font-bold">
              Overview
            </h2>

            <p className="mt-3 leading-7 text-gray-500">
              {data.description}
            </p>

          </section>

          {/* Highlights */}
          <section className="mt-8">

            <h2 className="text-xl font-bold">
              Highlights
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              {[
                "Luxury accommodation",
                "Beautiful tourist attractions",
                "Local cultural experience",
                "Private travel experience",
                "Explore local food",
                "Amazing natural views",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <Check
                    size={17}
                    className="text-green-500"
                  />
                  {item}
                </div>
              ))}

            </div>

          </section>

        </div>

        {/* Right Side Booking Card */}
        <div>

          <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Starting from
            </p>

            <h2 className="mt-2 text-3xl font-bold text-cyan-600">
              ${data.price}
            </h2>

            <p className="text-sm text-gray-500">
              Per person
            </p>

            <div className="my-5 border-t" />

            {/* Departure Date */}
            <p className="mb-2 text-sm font-medium">
              Departure Date
            </p>

            <div className="flex items-center gap-2 rounded-lg border p-3 text-sm">
              <CalendarDays size={17} />

              {data.departureDate
                ? new Date(data.departureDate).toLocaleDateString()
                : "Date not specified"}
            </div>

            {/* Book Now */}
            <Link
              href={`/booking?destinationId=${id}`}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700"
            >
              Book Now
              <ArrowRight size={17} />
            </Link>

            {/* Benefits */}
            <div className="mt-5 space-y-3">

              {[
                "Free cancellation",
                "Travel insurance included",
                "24/7 customer support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <Check
                    size={16}
                    className="text-green-500"
                  />
                  {item}
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

// Main Page
export default function DestinationDetailsPage({ params }) {
  return (
    <Suspense fallback={<DestinationLoading />}>
      <DestinationDetails params={params} />
    </Suspense>
  );
}
