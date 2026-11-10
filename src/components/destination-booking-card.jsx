
import Link from "next/link";
import { CalendarDays, ArrowRight, Check } from "lucide-react";

export default function DestinationBookingCard({ data, id }) {
  const departureDate = data.departureDate
    ? new Date(data.departureDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date not specified";

  return (
    <div className="sticky top-24 rounded-2xl border border-border/80 bg-card text-card-foreground p-6 shadow-sm transition-all duration-300">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Starting from</p>

      <div className="mt-2 flex items-baseline gap-1.5">
        <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
          ${data.price}
        </h2>
        <span className="text-xs text-muted-foreground">/ person</span>
      </div>

      <div className="my-5 border-t border-border/60" />

      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Departure Date</p>

      <div className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/40 p-3 text-sm text-foreground">
        <CalendarDays size={17} className="text-cyan-600 dark:text-cyan-400" />
        <span className="font-medium">{departureDate}</span>
      </div>

      <Link
        href={`/booking?destinationId=${id}`}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3.5 font-semibold text-white shadow-md shadow-cyan-900/10 transition-all duration-200 hover:bg-cyan-700 hover:shadow-lg active:scale-95"
      >
        Book Now
        <ArrowRight size={17} />
      </Link>

      <div className="mt-6 space-y-3 border-t border-border/60 pt-5">
        {[
          "Free cancellation up to 48h before departure",
          "Comprehensive travel insurance included",
          "24/7 dedicated customer support",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2.5 text-xs text-muted-foreground"
          >
            <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
              <Check size={12} />
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
