import Image from "next/image";
import Button from "@/components/ui/Button";

export default function AppCtaSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Split background: top half white, bottom half #E5EDEE */}
      <div className="absolute inset-0 flex flex-col">
        <div className="h-1/2 bg-white" />
        <div className="h-1/2" style={{ backgroundColor: "#E5EDEE" }} />
      </div>

      {/* Full width grid — no padding on left */}
      <div className="relative grid lg:grid-cols-2 items-end  min-h-125">

        {/* Left: image — bilkul left edge se, bottom aligned */}
        <div className="relative z-10 flex items-end justify-start -ml-36 lg:-ml-50">
          <Image
            src="/images/mobile-mockup-image.svg"
            alt="oneMi app"
            width={520}
            height={620}
            className="object-contain object-bottom w-full h-auto max-h-155"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right: copy — bottom aligned */}
        <div className="flex flex-col gap-5 relative z-10 px-12 pb-4 pt-0">
          {/* Heading — Manrope 600, 40px, 56px lh, rgb(37,37,37) */}
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "56px",
              color: "rgb(37, 37, 37)",
            }}
          >
            Healthcare that actually delivers value
          </h2>

          {/* Subtext — Montserrat 500, 20px, 30px lh, rgb(101,101,101) */}
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "30px",
              color: "rgb(101, 101, 101)",
            }}
          >
            No stress. No confusion. Quick solutions. Easy use.
          </p>

          <div>
            <Button href="#">Get the App</Button>
          </div>

          {/* oneMi logo — bottom right */}
          <div className="flex justify-end mt-8">
            <Image
              src="/images/logo-onemi.svg"
              alt="oneMi"
              width={110}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
}