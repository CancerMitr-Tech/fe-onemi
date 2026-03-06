import SectionWrapper from "@/components/ui/SectionWrapper";
import { PROBLEM } from "@/constants/home";

export default function ProblemSection() {
  return (
    <SectionWrapper className="bg-white text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">
        {PROBLEM.heading}{" "}
        <span className="text-[#E85D04]">{PROBLEM.highlight}</span>
      </h2>
      <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">{PROBLEM.subtitle}</p>
    </SectionWrapper>
  );
}
