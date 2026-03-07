import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function AppCtaSection() {
  return (
    <SectionWrapper className="bg-brand-mint overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: phones */}
        <div className="flex justify-center">
          <Image
            src="/images/app-cta-phone.webp"
            alt="oneMi app showing health dashboard"
            width={480}
            height={340}
            className="object-contain w-full max-w-sm drop-shadow-xl"
            sizes="(max-width: 1024px) 80vw, 40vw"
          />
        </div>

        {/* Right: copy */}
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
            Healthcare that actually delivers value
          </h2>
          <p className="text-brand-muted text-lg">
            No stress. No confusion. Quick solutions. Easy use.
          </p>
          <div>
            <Button href="#">Get the App</Button>
          </div>
          <div className="mt-2">
            <Image
              src="/images/logo-onemi.svg"
              alt="oneMi"
              width={90}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
