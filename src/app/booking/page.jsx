import { Suspense } from "react";
import BookingForm from "@/components/booking-form";

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted-foreground animate-pulse">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          <p className="text-sm font-medium">Loading booking form...</p>
        </div>
      }
    >
      <BookingForm />
    </Suspense>
  );
}