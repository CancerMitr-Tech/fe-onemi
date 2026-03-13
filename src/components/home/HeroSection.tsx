import Image from "next/image";
import Button from "@/components/ui/Button";
import RotatingPill from "./RotatingPill";
import { HERO } from "@/constants/home";

export default function HeroSection() {
  return (
    <div className="px-4 sm:px-6 lg:px-12 pt-3">
      <section className="relative overflow-hidden rounded-2xl" style={{ minHeight: "520px" }}>

        {/* Background Image */}
        <Image
          src="/images/hero-phone.webp"
          alt="oneMi app on smartphone"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />

        {/* Gradient overlay */}
        {/* <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(201,168,124,1) 0%, rgba(201,168,124,0.95) 30%, rgba(201,168,124,0.6) 50%, rgba(201,168,124,0.2) 68%, transparent 82%)",
          }}
        /> */}

        {/* Text content */}
        <div className="relative z-10 flex items-center h-full min-h-130">
          <div className="px-8 sm:px-12 lg:px-16 py-16 flex flex-col gap-5 max-w-150">

            {/* Heading */}
            <h1 className="text-[32px] sm:text-[36px] leading-[1.3] font-semibold text-[#252525]">
              {HERO.heading1}
              <br />
              <span className="whitespace-nowrap">{HERO.heading2}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] sm:text-[18px] leading-[1.6] font-normal text-[#3a3a3a]">
              {HERO.subtitle1}
              <br />
              {HERO.subtitle2}
            </p>

            {/* Rotating pill */}
            <RotatingPill />

            {/* CTA */}
            <div className="pt-1">
              <Button href="#">{HERO.cta}</Button>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}