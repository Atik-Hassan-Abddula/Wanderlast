
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Loader2,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Users,
  MapPin,
  ShieldCheck,
  CreditCard,
  Minus,
  Plus,
  Plane,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

const BACKEND_URL = "http://localhost:8000";

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destinationId = searchParams.get("destinationId");

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    travelers: 1,
    departureDate: "",
  });

  // USD currency formatter
  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  // Fetch destination
  useEffect(() => {
    const fetchDestination = async () => {
      if (!destinationId) {
        toast.error("Destination not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/destination/${destinationId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Destination not found");
        }

        setDestination(data.destination || data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "travelers" ? Number(value) : value,
    }));
  };

  // Traveler counter
  const handleTravelerChange = (amount) => {
    setFormData((previous) => ({
      ...previous,
      travelers: Math.min(
        20,
        Math.max(1, previous.travelers + amount)
      ),
    }));
  };

  // Submit booking
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!destination) {
      toast.error("Destination information is missing");
      return;
    }

    try {
      setSubmitting(true);

      const price = Number(destination.price || 0);
      const totalPrice = price * Number(formData.travelers);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destinationId,
          destinationName: destination.name || destination.title,
          destinationImage:
            destination.image || destination.imageUrl || "",
          customerName: formData.customerName,
          email: formData.email,
          phone: formData.phone,
          travelers: formData.travelers,
          departureDate: formData.departureDate,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      toast.success("Your booking was successful!");

      router.push("/my-bookings");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-600 dark:text-cyan-400" />

          <p className="text-sm font-medium text-muted-foreground">
            Preparing your booking...
          </p>
        </div>
      </div>
    );
  }

  // Destination not found
  if (!destination) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-4 text-center bg-background animate-fade-in">
        <div className="rounded-full bg-cyan-50 dark:bg-cyan-950/40 p-5 text-cyan-600 dark:text-cyan-400">
          <MapPin className="h-10 w-10" />
        </div>

        <h2 className="text-2xl font-bold text-foreground font-serif">
          Destination not found
        </h2>

        <p className="max-w-sm text-sm text-muted-foreground">
          We could not find this destination. Please browse our
          available travel destinations.
        </p>

        <Link
          href="/destination"
          className="rounded-full bg-cyan-600 px-7 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-cyan-700 active:scale-95"
        >
          Browse Destinations
        </Link>
      </div>
    );
  }

  // Price calculations
  const price = Number(destination.price || 0);
  const totalPrice = price * Number(formData.travelers);

  const image =
    destination.image || destination.imageUrl || "/placeholder.jpg";

  const destinationName =
    destination.name || destination.title || "Destination";

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground px-4 py-8 sm:py-12 lg:py-16 transition-colors duration-300">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl animate-fade-in">

        {/* Back Navigation */}
        <Link
          href="/destination"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-xs active:scale-95"
        >
          <ArrowLeft size={17} />
          Back to destinations
        </Link>

        {/* Page Heading */}
        <div className="mb-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/50 dark:border-cyan-800/40 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Sparkles size={15} />
            Your next adventure starts here
          </div>

          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl font-serif">
            Complete Your{" "}
            <span className="text-cyan-600 dark:text-cyan-400">Booking</span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Just a few details stand between you and your next
            unforgettable journey. Fill in your information below.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_390px]">

          {/* Booking Form */}
          <section className="overflow-hidden rounded-3xl border border-border/80 bg-card text-card-foreground shadow-xl">

            {/* Form Header */}
            <div className="border-b border-border bg-muted/40 px-6 py-6 sm:px-9">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-900/20">
                  <Plane size={23} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground font-serif">
                    Traveler Information
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Please provide your correct details
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-7 p-6 sm:p-9"
            >

              {/* Personal Information */}
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-6 w-1 rounded-full bg-cyan-600 dark:bg-cyan-400" />

                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Personal Details
                  </h3>
                </div>

                <div className="space-y-5">

                  {/* Full Name */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={19}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />

                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="h-14 w-full rounded-2xl border border-border bg-background pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={19}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="h-14 w-full rounded-2xl border border-border bg-background pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Phone Number
                    </label>

                    <div className="relative">
                      <Phone
                        size={19}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="h-14 w-full rounded-2xl border border-border bg-background pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Details */}
              <div className="border-t border-border pt-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-6 w-1 rounded-full bg-cyan-600 dark:bg-cyan-400" />

                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Travel Details
                  </h3>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Travelers */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Number of Travelers
                    </label>

                    <div className="flex h-14 items-center justify-between rounded-2xl border border-border bg-background px-3">
                      <button
                        type="button"
                        onClick={() => handleTravelerChange(-1)}
                        disabled={formData.travelers <= 1}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground transition-all hover:bg-cyan-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
                      >
                        <Minus size={16} />
                      </button>

                      <div className="flex items-center gap-2">
                        <Users size={17} className="text-cyan-600 dark:text-cyan-400" />

                        <span className="text-base font-bold tabular-nums text-foreground">
                          {formData.travelers}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleTravelerChange(1)}
                        disabled={formData.travelers >= 20}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground transition-all hover:bg-cyan-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Departure Date */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">
                      Departure Date
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />

                      <input
                        type="date"
                        name="departureDate"
                        min={new Date().toLocaleDateString("en-CA")}
                        value={formData.departureDate}
                        onChange={handleChange}
                        className="h-14 w-full rounded-2xl border border-border bg-background pl-11 pr-3 text-sm text-foreground outline-none transition-all focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-50/50 dark:bg-cyan-950/20 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Estimated Total Price
                    </p>

                    <p className="mt-1 text-2xl font-black text-cyan-600 dark:text-cyan-400 sm:text-3xl">
                      {formatPrice(totalPrice)}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600/10 text-cyan-600 dark:text-cyan-400">
                    <CreditCard size={23} />
                  </div>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  {formatPrice(price)} × {formData.travelers} traveler(s)
                </p>
              </div>

              {/* CONFIRM BOOKING BUTTON */}
              <button
                type="submit"
                disabled={submitting}
                className="group relative flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 px-6 text-sm font-extrabold tracking-wide text-white shadow-lg shadow-cyan-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {/* Shine Effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center justify-center gap-3">
                  {submitting ? (
                    <>
                      <Loader2 size={21} className="animate-spin" />
                      Processing Your Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={21} />
                      Confirm Your Booking
                      <Plane
                        size={19}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </>
                  )}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                <ShieldCheck size={16} className="text-green-500" />
                Your booking information is securely submitted.
              </div>
            </form>
          </section>

          {/* Destination Summary */}
          <aside className="space-y-5 lg:sticky lg:top-8">

            <div className="overflow-hidden rounded-3xl border border-border/80 bg-card text-card-foreground shadow-xl">

              {/* Destination Image */}
              <div className="group relative h-64 overflow-hidden">
                <Image
                  src={image}
                  alt={destinationName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 390px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full border border-white/30 bg-black/40 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                    YOUR DESTINATION
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="mb-1.5 flex items-center gap-1.5 text-white/80">
                    <MapPin size={14} />

                    <span className="text-xs font-medium">
                      Your next adventure
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-white font-serif">
                    {destinationName}
                  </h2>
                </div>
              </div>

              {/* Destination Details */}
              <div className="p-6">

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Price per person
                    </p>

                    <p className="mt-1 text-2xl font-black text-cyan-600 dark:text-cyan-400">
                      {formatPrice(price)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 p-3 text-cyan-600 dark:text-cyan-400">
                    <Plane size={24} />
                  </div>
                </div>

                <div className="space-y-4 border-t border-border/60 pt-5">

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Users size={17} />
                      Travelers
                    </span>

                    <span className="font-bold text-foreground">
                      {formData.travelers}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays size={17} />
                      Departure
                    </span>

                    <span className="font-bold text-foreground">
                      {formData.departureDate
                        ? new Date(
                            formData.departureDate + "T00:00:00"
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "Not selected"}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="mt-6 rounded-2xl bg-muted/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Total Amount
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">
                      Grand Total
                    </span>

                    <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Card */}
            <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
                <ShieldCheck size={23} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Travel With Confidence
                </h3>

                <p className="mt-1 text-xs leading-6 text-muted-foreground">
                  Complete your booking with accurate details and
                  get ready for your next amazing travel experience.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-center text-xs text-muted-foreground">
          Made for travelers. Designed for unforgettable journeys.
        </p>
      </div>
    </main>
  );
}
