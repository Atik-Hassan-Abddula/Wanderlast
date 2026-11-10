
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  Trash2,
  Loader2,
  Plane,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

import { toast } from "react-toastify";

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    className: "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300 border border-green-200/60 dark:border-green-800/40",
    Icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40",
    Icon: Clock,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200/60 dark:border-red-800/40",
    Icon: XCircle,
  },
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Load bookings
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await fetch("/api/bookings", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            toast.error("Please login to view your bookings.");
            return;
          }

          throw new Error(data.message || "Could not load bookings");
        }

        setBookings(
          Array.isArray(data) ? data : data.bookings || []
        );
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  // Delete Booking
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking permanently?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const response = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not delete booking"
        );
      }

      // Remove deleted booking from the list
      setBookings((previousBookings) =>
        previousBookings.filter(
          (booking) =>
            String(booking._id || booking.id) !== String(id)
        )
      );

      toast.success("Booking deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete booking");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10 sm:py-14 transition-colors duration-300">
      <div className="mx-auto max-w-5xl animate-fade-in">

        {/* Page Heading */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            Trip Manager
          </span>
          <h1 className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">
            My Bookings
          </h1>

          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Manage and view your upcoming travel plans.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="h-9 w-9 animate-spin text-cyan-600 dark:text-cyan-400" />
          </div>
        ) : bookings.length === 0 ? (

          /* Empty State */
          <div className="rounded-2xl border border-border/80 bg-card px-6 py-16 text-center shadow-xs">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
              <Plane size={30} />
            </div>

            <h2 className="font-serif text-2xl font-semibold text-foreground">
              No bookings yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              You have not booked any destinations yet. Explore
              destinations and plan your next adventure.
            </p>

            <Link
              href="/destination"
              className="mt-6 inline-flex items-center rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-cyan-700 active:scale-95"
            >
              Explore destinations
            </Link>
          </div>

        ) : (

          /* Booking Cards */
          <ul className="space-y-6">
            {bookings.map((booking) => {
              const id = booking._id || booking.id;
              const destination = booking.destination || {};

              const image =
                booking.destinationImage ||
                destination.image ||
                destination.imageUrl ||
                "/placeholder.jpg";

              const name =
                booking.destinationName ||
                destination.name ||
                destination.title ||
                "Travel destination";

              const destinationId =
                booking.destinationId ||
                destination._id ||
                destination.id ||
                null;

              const viewHref = destinationId
                ? `/destination/${destinationId}`
                : "/destination";

              const status = String(
                booking.status || "pending"
              ).toLowerCase();

              const {
                label: statusLabel,
                className: statusClassName,
                Icon: StatusIcon,
              } = statusConfig[status] || statusConfig.pending;

              return (
                <li
                  key={id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-900/5 dark:hover:shadow-black/40 sm:flex-row"
                >

                  {/* Destination Image */}
                  <div className="relative h-52 w-full shrink-0 overflow-hidden bg-muted sm:h-auto sm:min-h-[230px] sm:w-64">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 100vw, 256px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      unoptimized
                    />
                  </div>

                  {/* Booking Information */}
                  <div className="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-6">

                    <div>
                      {/* Status */}
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusClassName}`}
                      >
                        <StatusIcon size={14} />
                        {statusLabel}
                      </span>

                      {/* Destination Name */}
                      <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground">
                        {name}
                      </h2>

                      {/* Booking Details */}
                      <div className="mt-4 space-y-2.5 text-sm text-muted-foreground">

                        <div className="flex items-center gap-2">
                          <CalendarDays
                            size={16}
                            className="shrink-0 text-cyan-600 dark:text-cyan-400"
                          />

                          <span>
                            Departure:{" "}
                            {booking.departureDate
                              ? new Date(
                                  booking.departureDate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "Date not available"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin
                            size={16}
                            className="shrink-0 text-cyan-600 dark:text-cyan-400"
                          />

                          <span>
                            Booking ID: {String(id).slice(-8)}
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5">

                      {/* Total Price */}
                      <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                        ${Number(
                          booking.totalPrice || 0
                        ).toLocaleString("en-US")}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(id)}
                          disabled={deletingId === id}
                          className="inline-flex items-center gap-2 rounded-xl border border-destructive/30 bg-background px-4 py-2.5 text-sm font-medium text-destructive transition-all duration-200 hover:bg-destructive/10 dark:hover:bg-destructive/20 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
                        >
                          {deletingId === id ? (
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}

                          {deletingId === id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                        {/* View Button */}
                        <Link
                          href={viewHref}
                          className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-cyan-700 active:scale-95"
                        >
                          <Eye size={16} />
                          View
                        </Link>

                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
