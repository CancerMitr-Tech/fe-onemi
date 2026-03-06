import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";

export const metadata: Metadata = {
  title: "About Us | oneMi",
  description:
    "Learn why oneMi was built — to connect fragmented healthcare with AI-powered longitudinal care.",
};

export default function AboutPage() {
  return <AboutHero />;
}
