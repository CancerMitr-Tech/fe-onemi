import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { MEMBERSHIP, MEMBERSHIP_FEATURES } from "@/constants/home";

export default function MembershipSection() {
  return (
    <SectionWrapper id="membership" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: copy */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E]">
            {MEMBERSHIP.heading}
          </h2>
          <p className="text-xl font-semibold text-[#E85D04]">{MEMBERSHIP.subheading}</p>
          <p className="text-[#6B7280] text-lg">{MEMBERSHIP.body}</p>
          <div>
            <Button href="/#membership">{MEMBERSHIP.cta}</Button>
          </div>
        </div>

        {/* Right: 2×3 grid of feature cards */}
        <div className="grid grid-cols-2 gap-4">
          {MEMBERSHIP_FEATURES.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-2">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="font-semibold text-sm text-[#1A1A2E]">{feature.title}</h3>
              <p className="text-xs text-[#6B7280]">{feature.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
