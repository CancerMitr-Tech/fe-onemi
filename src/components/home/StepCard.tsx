import Image from "next/image";
import Link from "next/link";
import type { StepData } from "@/constants/home";

interface StepCardProps {
  data: StepData;
  reverse?: boolean;
}

export default function StepCard({ data, reverse = false }: StepCardProps) {
  return (
    <div
      className={`grid lg:grid-cols-2 gap-0 items-stretch ${
        reverse ? "lg:grid-flow-col-dense" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative h-72 lg:h-auto rounded-2xl overflow-hidden ${
          reverse ? "lg:col-start-2" : ""
        }`}
      >
        <Image
          src={data.image}
          alt={`${data.title} ${data.highlight}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Divider + Content */}
      <div className={`flex ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
        {!reverse && (
          <div className="hidden lg:block w-0.5 bg-brand-orange mx-8 shrink-0" />
        )}

        <div className="flex flex-col justify-center py-8 px-4 lg:px-0 w-full">
          {/* Step label */}
          <p className="text-sm font-semibold text-brand-orange mb-1">{data.step}</p>

          {/* Title */}
          <h3 className="text-3xl font-bold text-brand-dark mb-2 leading-tight">
            {data.title}{" "}
            <span className="text-brand-orange">{data.highlight}</span>
          </h3>

          {/* Subtitle */}
          <p className="text-brand-muted mb-5">{data.subtitle}</p>

          {/* Feature list — orange filled circle check */}
          <ul className="space-y-3 mb-6">
            {data.items.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Image src="/images/tick.png" width={20} height={20} alt="" className="shrink-0" />
                <span className="text-brand-dark text-sm">{item}</span>
              </li>
            ))}
          </ul>

          {/* Grey divider line */}
          <svg width="100%" height="1" viewBox="0 0 600 1" preserveAspectRatio="none" className="mb-4">
            <line x1="0" y1="0.5" x2="600" y2="0.5" stroke="#D1D5DB" strokeWidth="1" />
          </svg>

          {/* Tagline */}
          <p className="text-sm text-brand-muted italic text-center mb-6">
            {data.tagline}
          </p>

          {/* Program cards — Step 3 only */}
          {data.programs && data.programs.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {data.programs.map((prog) => (
                <div
                  key={prog.title}
                  className="border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-1"
                >
                  <p className="text-sm font-semibold text-brand-dark text-center leading-snug">
                    {prog.title}
                  </p>
                  <p className="text-xs text-brand-muted text-center mb-2">
                    {prog.subtitle}
                  </p>
                  <Link
                    href={prog.href}
                    className="w-full text-center text-sm font-semibold text-white py-2.5 rounded-lg transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#E05C1A" }}
                  >
                    Read more
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {reverse && (
          <div className="hidden lg:block w-0.5 bg-brand-orange mx-8 shrink-0" />
        )}
      </div>
    </div>
  );
}