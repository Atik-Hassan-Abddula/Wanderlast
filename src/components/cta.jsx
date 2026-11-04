import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

function CallToAction({ className }) {
  return (
    <section
      data-slot="cta"
      className={cn("relative overflow-hidden", className)}
    >
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-28 text-center text-white md:py-36">
        <h2 className="text-4xl font-normal tracking-tight text-balance md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/85 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <a
          href="#bookings"
          className={cn(
            buttonVariants(),
            "mt-10 h-12 gap-3 bg-white px-8 text-sm font-semibold tracking-wide text-foreground hover:bg-white/90"
          )}
        >
          BOOK YOUR TRIP TODAY
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}

export { CallToAction };
