import type { Metadata } from "next";
import SupportSection from "@/components/SupportSection";

export const metadata: Metadata = {
  title: "Support This Project — Daily Hope",
  description: "Help keep Daily Hope online, completely optional.",
};

export default function SupportPage() {
  return (
    <div className="container-page py-16">
      <SupportSection />
    </div>
  );
}
