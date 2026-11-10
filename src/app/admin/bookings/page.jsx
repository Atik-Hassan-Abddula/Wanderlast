
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  RefreshCw,
  Users,
  X,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all bookings
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
        throw new Error(data.message || "Failed to fetch bookings");
      }

      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Open confirmation popup
  const openConfirmModal = (booking) => {
    setSelectedBooking(booking);
    setMessage("");
    setError("");
  };

  // Close confirmation popup
  const closeConfirmModal = () => {
    if (confirming) return;
    setSelectedBooking(null);
  };

  // Confirm booking
  const handleConfirm = async () => {
    if (!selectedBooking?._id) return;

    try {
      setConfirming(true);
      setError("");

      const response = await fetch(
        `/api/admin/bookings/${encodeURIComponent(selectedBooking._id)}/confirm`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to confirm booking");
      }

      // Update UI immediately
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === selectedBooking._id
            ? {
                ...booking,
                status: "confirmed",
                confirmedAt: new Date().toISOString(),
              }
            : booking
        )
      );

      setMessage(data.message || "Booking confirmed successfully!");
      setSelectedBooking(null);
    } catch (err) {
      setError(err.message || "Failed to confirm booking");
    } finally {
      setConfirming(false);
    }
  };

  // Only pending bookings
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  );

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              Admin Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Pending Bookings
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Review and confirm customer booking requests.
            </p>
          </div>

          <button
            onClick={fetchBookings}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Bookings
                </p>
                <h2 className="mt-2 text-3xl font-bold text-amber-600">
                  {pendingBookings.length}
                </h2>
              </div>
              <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                <Clock size={25} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Confirmed Bookings
                </p>
                <h2 className="mt-2 text-3xl font-bold text-green-600">
                  {confirmedBookings.length}
                </h2>
              </div>
              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <CheckCircle2 size={25} />
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
            <CheckCircle2 size={19} />
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={19} />
            {error}
          </div>
        )}

        {/* Pending Booking Table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-bold text-slate-900">
              Booking Requests
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              All bookings waiting for admin confirmation.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center gap-3 text-slate-500">
              <Loader2 size={25} className="animate-spin" />
              Loading pending bookings...
            </div>
          ) : pendingBookings.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
              <CheckCircle2 size={45} className="text-green-500" />
              <h3 className="mt-4 text-lg font-bold text-slate-800">
                No Pending Bookings
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                All booking requests have been processed.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Destination</th>
                    <th className="px-5 py-4">Travel Details</th>
                    <th className="px-5 py-4">Total Price</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {pendingBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50">

                      {/* Customer */}
                      <td className="px-5 py-5">
                        <p className="font-semibold text-slate-900">
                          {booking.customerName}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {booking.email}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {booking.phone}
                        </p>
                      </td>

                      {/* Destination */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          {booking.destinationImage ? (
                            <img
                              src={booking.destinationImage}
                              alt={booking.destinationName || "Destination"}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                              <MapPin className="text-slate-400" />
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-slate-800">
                              {booking.destinationName}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              ID: {booking._id?.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Travel Details */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Users size={15} />
                          {booking.travelers} Travelers
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                          <CalendarDays size={15} />
                          {formatDate(booking.departureDate)}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-5 font-bold text-slate-900">
                        ৳{Number(booking.totalPrice || 0).toLocaleString()}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-5">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold capitalize text-amber-700">
                          {booking.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-5">
                        <button
                          onClick={() => openConfirmModal(booking)}
                          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                          <CheckCircle2 size={16} />
                          Confirm
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Confirmation Popup */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeConfirmModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="w-full max-w-md animate-in zoom-in-95 rounded-2xl bg-white p-6 shadow-2xl duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <ShieldCheck size={29} />
              </div>

              <button
                onClick={closeConfirmModal}
                disabled={confirming}
                aria-label="Close popup"
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={21} />
              </button>
            </div>

            <h2
              id="confirm-title"
              className="mt-5 text-2xl font-bold text-slate-900"
            >
              Confirm Booking?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to confirm this booking? This action will
              update the booking status.
            </p>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">
                {selectedBooking.destinationName}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Customer: {selectedBooking.customerName}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Travelers: {selectedBooking.travelers}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                Total: ৳
                {Number(selectedBooking.totalPrice || 0).toLocaleString()}
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                onClick={closeConfirmModal}
                disabled={confirming}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={confirming}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {confirming ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Confirming...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={17} />
                    Yes, Confirm
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
