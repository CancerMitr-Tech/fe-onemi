import DotPattern from "./DotPattern";
import { ABOUT } from "@/constants/about";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <DotPattern />
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] leading-tight mb-8 whitespace-pre-line">
          {ABOUT.headingPlain}{" "}
          <span className="text-[#E85D04]">{ABOUT.headingHighlight}</span>
        </h1>
        <div className="space-y-5">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i} className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
