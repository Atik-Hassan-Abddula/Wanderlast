
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  RefreshCw,
  MapPin,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Plane,
  Check,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

const statusStyles = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-500/10 text-red-600 border-red-500/20",
    icon: XCircle,
  },
};

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  // =====================================
  // FETCH ALL BOOKINGS
  // =====================================

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/bookings", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch bookings"
        );
      }

      if (!Array.isArray(data.bookings)) {
        throw new Error("Invalid booking response from server");
      }

      setBookings(data.bookings);
    } catch (err) {
      console.error("Admin bookings error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // =====================================
  // CONFIRM BOOKING
  // =====================================

  const handleConfirm = async (bookingId) => {
    try {
      setConfirmingId(bookingId);

      const response = await fetch(
        `/api/admin/bookings/${bookingId}/confirm`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Booking confirmation failed"
        );
      }

      toast.success("Booking confirmed successfully!");

      // Refresh booking list
      await fetchBookings();
    } catch (err) {
      console.error("Confirm booking error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setConfirmingId(null);
    }
  };

  // =====================================
  // BOOKING STATISTICS
  // =====================================

  const stats = useMemo(() => {
    return [
      {
        title: "Total Bookings",
        value: bookings.length,
        icon: CalendarDays,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
      },
      {
        title: "Pending",
        value: bookings.filter((b) => b.status === "pending").length,
        icon: Clock,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
      },
      {
        title: "Confirmed",
        value: bookings.filter((b) => b.status === "confirmed").length,
        icon: CheckCircle2,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
      },
      {
        title: "Cancelled",
        value: bookings.filter((b) => b.status === "cancelled").length,
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-500/10",
      },
    ];
  }, [bookings]);

  // =====================================
  // SEARCH AND FILTER
  // =====================================

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchText = search.toLowerCase();

      const matchesSearch = [
        booking.customerName,
        booking.email,
        booking.destinationName,
        booking.phone,
      ].some((value) =>
        String(value || "").toLowerCase().includes(searchText)
      );

      const matchesFilter =
        filter === "all" || booking.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [bookings, search, filter]);

  // =====================================
  // LOADING SCREEN
  // =====================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground font-medium">
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =====================================
  // DASHBOARD
  // =====================================

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-9">

          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              Back to Website
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <LayoutDashboard className="text-primary" size={25} />
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage all your travel bookings
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={fetchBookings}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:bg-muted transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* ADMIN LABEL */}
        <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 mb-7">
          <ShieldCheck className="text-primary" size={22} />
          <div>
            <p className="font-semibold text-sm">Admin Control Panel</p>
            <p className="text-xs text-muted-foreground mt-1">
              Review and manage customer bookings securely.
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 mb-6">
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle size={18} />
              <p className="font-semibold">{error}</p>
            </div>

            <button
              onClick={fetchBookings}
              className="mt-3 text-sm font-semibold text-primary hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* STATISTICS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-3">
                      {stat.value}
                    </h2>
                  </div>

                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={stat.color} size={23} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* BOOKINGS SECTION */}
        <section className="rounded-2xl border border-border bg-card overflow-hidden">

          {/* SECTION HEADER */}
          <div className="p-5 md:p-6 border-b border-border">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              <div>
                <h2 className="text-xl font-bold">
                  Booking Management
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Review customer reservations and confirmation status.
                </p>
              </div>

              {/* SEARCH */}
              <div className="relative w-full lg:max-w-xs">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search bookings..."
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: "All Bookings", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "Confirmed", value: "confirmed" },
                { label: "Cancelled", value: "cancelled" },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    filter === item.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* BOOKING LIST */}
          <div className="p-4 md:p-6">
            {filteredBookings.length === 0 ? (
              <div className="py-16 text-center">
                <Plane
                  size={40}
                  className="mx-auto text-muted-foreground/40 mb-4"
                />

                <h3 className="font-bold text-lg">
                  No bookings found
                </h3>

                <p className="text-sm text-muted-foreground mt-2">
                  There are no bookings matching your search.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => {
                  const status =
                    statusStyles[booking.status] ||
                    statusStyles.pending;

                  const StatusIcon = status.icon;

                  const bookingId =
                    booking._id?.toString();

                  return (
                    <article
                      key={bookingId}
                      className="rounded-2xl border border-border p-4 md:p-5 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row gap-5">

                        {/* DESTINATION IMAGE */}
                        <div className="w-full lg:w-44 h-40 shrink-0 rounded-xl overflow-hidden bg-muted">
                          {booking.destinationImage ? (
                            <Image
                              src={booking.destinationImage}
                              alt={booking.destinationName || "Destination"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Plane
                                size={35}
                                className="text-muted-foreground"
                              />
                            </div>
                          )}
                        </div>

                        {/* BOOKING INFORMATION */}
                        <div className="flex-1 min-w-0">

                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-bold">
                                {booking.destinationName || "Unknown Destination"}
                              </h3>

                              <p className="text-xs text-muted-foreground mt-1 break-all">
                                Booking ID: {bookingId}
                              </p>
                            </div>

                            {/* STATUS */}
                            <span
                              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}
                            >
                              <StatusIcon size={14} />
                              {status.label}
                            </span>
                          </div>

                          {/* CUSTOMER DETAILS */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">

                            <div>
                              <p className="text-xs text-muted-foreground">
                                Customer
                              </p>

                              <p className="text-sm font-semibold mt-1 flex items-center gap-2">
                                <Users size={15} />
                                {booking.customerName || "N/A"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground">
                                Email
                              </p>

                              <p className="text-sm font-semibold mt-1 break-all">
                                {booking.email || "N/A"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground">
                                Phone
                              </p>

                              <p className="text-sm font-semibold mt-1">
                                {booking.phone || "N/A"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground">
                                Departure Date
                              </p>

                              <p className="text-sm font-semibold mt-1 flex items-center gap-2">
                                <CalendarDays size={15} />
                                {formatDate(booking.departureDate)}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground">
                                Travelers
                              </p>

                              <p className="text-sm font-semibold mt-1">
                                {booking.travelers || 1} Person(s)
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground">
                                Total Price
                              </p>

                              <p className="text-lg font-bold text-primary mt-1">
                                {formatPrice(
                                  booking.totalPrice ?? booking.price
                                )}
                              </p>
                            </div>
                          </div>

                          {/* ACTIONS */}
                          <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-border">

                            <p className="text-xs text-muted-foreground">
                              Booked on {formatDate(booking.createdAt)}
                            </p>

                            {booking.status === "pending" && (
                              <button
                                onClick={() => handleConfirm(bookingId)}
                                disabled={
                                  !bookingId ||
                                  confirmingId === bookingId
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {confirmingId === bookingId ? (
                                  <>
                                    <Loader2
                                      size={16}
                                      className="animate-spin"
                                    />
                                    Confirming...
                                  </>
                                ) : (
                                  <>
                                    <Check size={17} />
                                    Confirm Booking
                                  </>
                                )}
                              </button>
                            )}

                            {booking.status === "confirmed" && (
                              <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                                <CheckCircle2 size={17} />
                                Booking Confirmed
                              </span>
                            )}

                            {booking.status === "cancelled" && (
                              <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-500">
                                <XCircle size={17} />
                                Booking Cancelled
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="border-t border-border px-5 py-4">
            <p className="text-xs text-muted-foreground">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
