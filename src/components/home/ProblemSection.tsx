import SectionWrapper from "@/components/ui/SectionWrapper";
import { PROBLEM } from "@/constants/home";

export default function ProblemSection() {
  return (
    <SectionWrapper className="bg-white text-center">
      {/* Manrope 600, 40px, line-height 60px — matches production */}
      <h2
        className="font-semibold text-brand-dark mb-4"
        style={{ fontFamily: "'Manrope', sans-serif", fontSize: "40px", lineHeight: "60px" }}
      >
        {PROBLEM.heading}{" "}
        <span className="text-brand-orange whitespace-nowrap">{PROBLEM.highlight}</span>
      </h2>
      {/* Montserrat 400, 20px — matches production subtitle */}
      <p
        className="text-[#454545] mx-auto text-center whitespace-nowrap"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "18px",  // 20px → 18px, thoda chhota karo taaki ek line mein aaye
          lineHeight: "30px",
        }}
      >
        {PROBLEM.subtitle}
      </p>
    </SectionWrapper>
  );
}