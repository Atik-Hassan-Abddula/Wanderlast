
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  Clock,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";
import { notFound } from "next/navigation";

async function getDestination(id) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    console.error("BACKEND_URL environment variable is missing");
    throw new Error("Backend URL is not configured");
  }

  if (!id) {
    throw new Error("Destination ID is missing");
  }

  const apiUrl = `${backendUrl.replace(/\/+$/, "")}/destination/${encodeURIComponent(id)}`;

  console.log("Fetching destination:", apiUrl);

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      const errorText = await res.text();

      console.error("Destination API Error:", {
        status: res.status,
        response: errorText,
      });

      throw new Error(`Backend API failed with status ${res.status}`);
    }

    const result = await res.json();

    const destination = result?.data ?? result;

    if (!destination || !destination._id) {
      console.error("Invalid destination response:", result);
      throw new Error("Invalid destination data received");
    }

    return destination;
  } catch (error) {
    console.error("Destination fetch error:", error);
    throw error;
  }
}

function ErrorPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-5xl">😕</div>

        <h1 className="text-2xl font-bold text-red-500">
          Something went wrong!
        </h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Unable to load destination details. Please try again.
        </p>

        <Link
          href="/destination"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Destinations
        </Link>
      </div>
    </main>
  );
}

export default async function DestinationDetails({ params }) {
  const { id } = await params;

  let destination;

  try {
    destination = await getDestination(id);
  } catch (error) {
    console.error("DESTINATION PAGE ERROR:", error);

    return <ErrorPage />;
  }

  if (!destination) {
    notFound();
  }

  const {
    _id,
    name,
    country,
    category,
    price,
    duration,
    departureDate,
    imageUrl,
    description,
    rating,
    reviews,
  } = destination;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          href="/destination"
          className="mb-7 inline-flex items-center gap-2 font-medium text-gray-600 transition hover:text-blue-600 dark:text-gray-300"
        >
          <ArrowLeft size={18} />
          Back to Destinations
        </Link>

        {/* Destination Content */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-900">

          {/* Destination Image */}
          <div className="relative h-[280px] w-full sm:h-[400px] lg:h-[500px]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name || "Destination"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-200 text-gray-500 dark:bg-gray-800">
                No Image Available
              </div>
            )}

            {category && (
              <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                {category}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_300px] lg:p-10">

            {/* Main Information */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-blue-600">
                <MapPin size={18} />
                {country || "Location not specified"}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                {name || "Untitled Destination"}
              </h1>

              {/* Rating */}
              {rating && (
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold">{rating}</span>
                  {reviews && <span>({reviews} reviews)</span>}
                </div>
              )}

              {/* Information Cards */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <Clock className="text-blue-600" size={22} />

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Duration
                    </p>

                    <p className="font-semibold text-gray-900 dark:text-white">
                      {duration || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <CalendarDays className="text-blue-600" size={22} />

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Departure Date
                    </p>

                    <p className="font-semibold text-gray-900 dark:text-white">
                      {departureDate
                        ? new Date(departureDate).toLocaleDateString("en-GB")
                        : "Flexible"}
                    </p>
                  </div>
                </div>

              </div>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  About This Destination
                </h2>

                <p className="mt-3 leading-8 text-gray-600 dark:text-gray-300">
                  {description || "No description available."}
                </p>
              </div>
            </div>

            {/* Booking Card */}
            <aside className="h-fit rounded-2xl border border-gray-200 p-6 dark:border-gray-700">

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Starting From
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                ৳{Number(price || 0).toLocaleString("en-BD")}
              </h2>

              <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

              <div className="mb-5 flex items-center gap-2 text-sm text-green-600">
                <BadgeCheck size={18} />
                Available for booking
              </div>

              <Link
                href={`/booking?destinationId=${encodeURIComponent(_id)}`}
                className="block w-full rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Book Now
              </Link>

              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                Plan your next adventure with WanderLast.
              </p>

            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
