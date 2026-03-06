import type { Metadata } from "next";
import ProgramHero from "@/components/programs/ProgramHero";
import { PROGRAMS } from "@/constants/programs";

const program = PROGRAMS["my-metabolic-detox"];

export const metadata: Metadata = {
  title: `${program.title} | oneMi`,
  description: program.description,
};

export default function MyMetabolicDetoxPage() {
  return <ProgramHero {...program} />;
}
