import Button from "@/components/ui/Button";

interface ProgramHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function ProgramHero({ title, subtitle, description }: ProgramHeroProps) {
  return (
    <section className="bg-brand-sand min-h-[60vh] flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-brand-orange font-semibold mb-3 text-sm uppercase tracking-wider">
          OneMi Program
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-4">{title}</h1>
        <p className="text-xl text-[#3D3D3D] mb-4">{subtitle}</p>
        <p className="text-[#4A4A4A] max-w-2xl mb-8 leading-relaxed">{description}</p>
        <Button href="/#membership">Join OneMi Pro</Button>
      </div>
    </section>
  );
}