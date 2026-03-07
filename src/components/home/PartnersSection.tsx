import SectionWrapper from "@/components/ui/SectionWrapper";

export default function PartnersSection() {
  return (
    <SectionWrapper className="bg-white border-t border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-brand-dark">
          Our Trusted Partners,{" "}
          <span className="text-brand-orange">For Your Health Journey</span>
        </h2>
      </div>
      {/* Placeholder partner logos — replace with actual logos in public/images/partners/ */}
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        {["Partner 1", "Partner 2", "Partner 3", "Partner 4", "Partner 5"].map(
          (p) => (
            <div
              key={p}
              className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500 font-medium"
            >
              {p}
            </div>
          )
        )}
      </div>
    </SectionWrapper>
  );
}
