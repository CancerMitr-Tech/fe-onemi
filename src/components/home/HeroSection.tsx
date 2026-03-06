import Image from "next/image";
import Button from "@/components/ui/Button";
import RotatingPill from "./RotatingPill";
import { HERO } from "@/constants/home";

export default function HeroSection() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-0 bg-white">
      <section className="relative rounded-3xl overflow-hidden
                          min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]
                          bg-[#C9A87C]">

        {/* Full-card phone image */}
        <Image
          src="/images/hero-phone.webp"
          alt="oneMi app on smartphone"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 95vw"
          className="object-cover object-right"
        />

        {/* Solid-left → transparent-right gradient so text stays readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #C9A87C 0%, #C9A87C 38%, rgba(201,168,124,0.85) 52%, rgba(201,168,124,0.3) 68%, transparent 82%)",
          }}
        />

        {/* Text — left side, z-10 so it sits above gradient */}
        <div className="relative z-10 flex items-center
                        min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]">
          <div className="px-8 sm:px-10 lg:px-14 py-12 flex flex-col gap-5
                          w-full max-w-[520px] lg:max-w-[560px]">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem]
font-bold text-[#1A1A2E] leading-tight whitespace-pre-line">
  {HERO.heading}
</h1>
            <p className="text-sm sm:text-base lg:text-lg
                          text-[#3D3D3D] leading-relaxed max-w-[400px]">
              {HERO.subtitle}
            </p>
            <RotatingPill />
            <div>
              <Button href="#">{HERO.cta}</Button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
