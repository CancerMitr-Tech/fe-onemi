import Image from "next/image";

interface StepData {
  step: string;
  title: string;
  highlight: string;
  subtitle: string;
  items: string[];
  tagline: string;
  image: string;
}

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
      <div
        className={`flex ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}
      >
        {!reverse && (
          <div className="hidden lg:block w-0.5 bg-brand-orange mx-8 shrink-0" />
        )}
        <div className="flex flex-col justify-center py-8 px-4 lg:px-0">
          <p className="text-sm text-brand-muted mb-1">{data.step}</p>
          <h3 className="text-3xl font-bold text-brand-dark mb-2 leading-tight">
            {data.title}{" "}
            <span className="text-brand-orange">{data.highlight}</span>
          </h3>
          <p className="text-brand-muted mb-4">{data.subtitle}</p>
          <ul className="space-y-2 mb-4">
            {data.items.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-brand-dark text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-brand-muted italic">{data.tagline}</p>
        </div>
        {reverse && (
          <div className="hidden lg:block w-0.5 bg-brand-orange mx-8 shrink-0" />
        )}
      </div>
    </div>
  );
}