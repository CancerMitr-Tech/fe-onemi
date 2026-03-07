import SectionWrapper from "@/components/ui/SectionWrapper";
import { PROBLEM } from "@/constants/home";

export default function ProblemSection() {
  return (
    <SectionWrapper className="bg-white text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
        {PROBLEM.heading}{" "}
        <span className="text-brand-orange">{PROBLEM.highlight}</span>
      </h2>
      <p className="text-lg text-brand-muted max-w-2xl mx-auto">{PROBLEM.subtitle}</p>
    </SectionWrapper>
  );
}
