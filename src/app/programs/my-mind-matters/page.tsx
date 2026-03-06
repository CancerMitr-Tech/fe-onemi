import type { Metadata } from "next";
import ProgramHero from "@/components/programs/ProgramHero";
import { PROGRAMS } from "@/constants/programs";

const program = PROGRAMS["my-mind-matters"];

export const metadata: Metadata = {
  title: `${program.title} | oneMi`,
  description: program.description,
};

export default function MyMindMattersPage() {
  return <ProgramHero {...program} />;
}
