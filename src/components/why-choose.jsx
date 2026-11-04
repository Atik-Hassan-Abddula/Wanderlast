import Image from "next/image";
import { cn } from "cn";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    alt: "Shield with checkmark",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    alt: "Folded map",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    alt: "Headset",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

function WhyChoose({ className }) {
  return (
    <section
      data-slot="why-choose"
      className={cn("bg-[#e2f5fa] py-20 md:py-24", className)}
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-4xl font-normal tracking-tight text-balance md:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-foreground/60">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              data-slot="feature-card"
              className="rounded-md bg-background p-8"
            >
              <Image
                src={feature.icon}
                alt={feature.alt}
                width={40}
                height={40}
                className="size-10"
              />
              <h3 className="mt-6 text-2xl font-normal text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { WhyChoose };
