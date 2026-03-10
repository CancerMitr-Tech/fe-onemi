import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    // className is on <section> itself so scroll-mt-* Tailwind classes work correctly
    <section id={id} className={cn("py-16 px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}