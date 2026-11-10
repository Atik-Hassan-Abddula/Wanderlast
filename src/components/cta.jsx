import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

function CallToAction({ className }) {
  return (
    <section
      data-slot="cta"
      className={cn("group relative overflow-hidden", className)}
    >
      <Image
        src="/images/CTA.png"
        alt="Ready to start your journey"
        fill
        sizes="100vw"
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/70 transition-colors duration-300" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-28 text-center text-white md:py-36 animate-fade-in-up">
        <h2 className="text-4xl font-normal tracking-tight text-balance md:text-5xl drop-shadow-sm">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/90 md:text-base leading-relaxed">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destination"
          className={cn(
            buttonVariants(),
            "mt-10 h-13 gap-3 rounded-xl bg-white px-9 text-sm font-semibold tracking-wide text-gray-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/95 hover:shadow-2xl active:scale-95"
          )}
        >
          BOOK YOUR TRIP TODAY
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export { CallToAction };
