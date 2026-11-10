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
      className={cn(
        "bg-cyan-50/70 dark:bg-card/40 border-y border-cyan-100/60 dark:border-border/60 py-20 md:py-24 transition-colors duration-300",
        className
      )}
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            Our Commitment
          </span>
          <h2 className="mt-2 text-4xl font-normal tracking-tight text-balance text-foreground md:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              data-slot="feature-card"
              style={{ animationDelay: `${idx * 100}ms` }}
              className="group rounded-2xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-900/5 dark:hover:shadow-black/40"
            >
              <div className="flex size-14 items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-950/50 p-2.5 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={feature.icon}
                  alt={feature.alt}
                  width={40}
                  height={40}
                  className="size-9 object-contain"
                />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-foreground tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
