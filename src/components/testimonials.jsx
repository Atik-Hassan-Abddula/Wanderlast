import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from "cn";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical: Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    photo: null, // drop a photo into /public/images and set e.g. "/images/traveler-michael.jpg"
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: null,
  },
  {
    quote:
      "Santorini At Sunset Was A Dream Come True. Every Island Hopping Day Was Organized Beautifully. The Local Food Tours Were The Highlight Of Our Honeymoon.",
    name: "Priya Sharma",
    location: "London, UK",
    photo: null,
  },
  {
    quote:
      "Kyoto In Cherry Blossom Season Was Pure Magic. Our Guide Knew Every Hidden Temple And Tea House. Flawless Planning From Start To Finish.",
    name: "David Okafor",
    location: "Toronto, Canada",
    photo: null,
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function TestimonialCard({ quote, name, location, photo }) {
  return (
    <article
      data-slot="testimonial-card"
      className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border/80 bg-card p-8 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-cyan-500/30 sm:flex-row sm:items-stretch"
    >
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <p className="font-serif text-lg leading-relaxed text-foreground md:text-xl">
          &quot;{quote}&quot;
        </p>
        <footer className="mt-6 pt-4 border-t border-border/50">
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">&mdash; {name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{location}</p>
        </footer>
      </div>

      {photo ? (
        <Image
          src={photo}
          alt={`Photo of ${name}`}
          width={176}
          height={176}
          className="size-36 shrink-0 self-center rounded-xl object-cover sm:self-auto shadow-sm"
        />
      ) : (
        <div className="flex size-36 shrink-0 self-center items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-3xl font-semibold text-white shadow-md sm:self-auto">
          {initials(name)}
        </div>
      )}
    </article>
  );
}

function Testimonials({ className }) {
  return (
    <section
      data-slot="testimonials"
      className={cn("bg-background py-20 md:py-24 transition-colors duration-300", className)}
    >
      <div className="mx-auto max-w-6xl px-4">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                Testimonials
              </span>
              <h2 className="mt-2 text-4xl font-normal tracking-tight text-balance text-foreground md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CarouselPrevious
                variant="outline"
                size="icon"
                className="static inset-auto size-11 rounded-full border-border bg-background text-foreground transition-all duration-200 hover:scale-105 hover:bg-accent active:scale-95"
              >
                <ArrowLeftIcon className="size-4" />
                <span className="sr-only">Previous slide</span>
              </CarouselPrevious>
              <CarouselNext
                variant="outline"
                size="icon"
                className="static inset-auto size-11 rounded-full border-border bg-background text-foreground transition-all duration-200 hover:scale-105 hover:bg-accent active:scale-95"
              >
                <ArrowRightIcon className="size-4" />
                <span className="sr-only">Next slide</span>
              </CarouselNext>
            </div>
          </div>

          <CarouselContent className="mt-10">
            {testimonials.map((t) => (
              <CarouselItem key={t.name} className="basis-full md:basis-1/2">
                <TestimonialCard {...t} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export { Testimonials, TestimonialCard };
