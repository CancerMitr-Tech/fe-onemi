import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorks from "@/components/home/HowItWorks";
import YellowBanner from "@/components/home/YellowBanner";
import MembershipSection from "@/components/home/MembershipSection";
import PricingSection from "@/components/home/PricingSection";
import TrustSection from "@/components/home/TrustSection";
import Testimonials from "@/components/home/Testimonials";
import FaqSection from "@/components/home/FaqSection";
import AppCtaSection from "@/components/home/AppCtaSection";
import PartnersSection from "@/components/home/PartnersSection";
import MedicalDisclaimer from "@/components/home/MedicalDisclaimer";

export const metadata: Metadata = {
  title: "oneMi — My Health in My Hands",
  description:
    "India's first AI-powered Health Management Platform. Empowering health with clinical insights, curated solutions & personalised care.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <HowItWorks />
      <YellowBanner />
      <MembershipSection />
      <PricingSection />
      <TrustSection />
      <Testimonials />
      <FaqSection />
      <AppCtaSection />
      <PartnersSection />
      <MedicalDisclaimer />
    </>
  );
}
