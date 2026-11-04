import Image from "next/image";


import { Banner } from "@/components/banner";
import { WhyChoose } from "@/components/why-choose";
import { Testimonials } from "@/components/testimonials";
import { CallToAction } from "@/components/cta";


export default function Home() {
  return (
    <>
      <main>
      
        <Banner />
        <WhyChoose />
        <Testimonials />
        <CallToAction />
      </main>
 
    </>
  );
}
