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
      className="flex h-full flex-col gap-6 rounded-md border border-border/60 bg-background p-7 sm:flex-row sm:items-stretch"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-lg leading-normal tracking-tight text-foreground md:text-xl">
          &quot;{quote}&quot;
        </p>
        <footer className="mt-auto pt-6">
          <p className="text-sm text-[#1d9cb2]">&mdash; {name}</p>
          <p className="mt-1 text-xs text-foreground/50">{location}</p>
        </footer>
      </div>

      {photo ? (
        <Image
          src={photo}
          alt={`Photo of ${name}`}
          width={176}
          height={176}
          className="size-40 shrink-0 self-center object-cover sm:self-auto"
        />
      ) : (
        <div className="flex size-40 shrink-0 self-center items-center justify-center rounded-sm bg-gradient-to-br from-[#bfe8f0] to-[#5fbdd1] text-3xl font-semibold text-white sm:self-auto">
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
      className={cn("bg-background py-20 md:py-24", className)}
    >
      <div className="mx-auto max-w-6xl px-4">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-normal tracking-tight text-balance md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-foreground/60">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CarouselPrevious
                variant="outline"
                size="icon"
                className="static inset-auto size-10 rounded-full"
              >
                <ArrowLeftIcon />
                <span className="sr-only">Previous slide</span>
              </CarouselPrevious>
              <CarouselNext
                variant="outline"
                size="icon"
                className="static inset-auto size-10 rounded-full"
              >
                <ArrowRightIcon />
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
