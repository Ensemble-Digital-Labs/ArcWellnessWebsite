import type { ArcFaqItem } from "@/components/arc/ArcFaqSection";

export const liveSiteFaqs: readonly ArcFaqItem[] = [
  {
    id: "first-visit",
    question: "What happens during my first visit?",
    answer:
      "Your first visit begins with a free consultation and, where needed, a Styku 3D body scan. Together, we’ll discuss your goals, lifestyle, and budget to create a plan that’s realistic and personal.",
  },
  {
    id: "safety",
    question: "Are your treatments safe?",
    answer:
      "Yes. Our technologies—including ExoMind, Emsella, and EmSculpt Neo—are FDA-cleared and clinically supported. For IV infusions, peptides, and supplements, each protocol is dosage-monitored and quality-verified. Your medical provider reviews your history before any treatment begins.",
  },
  {
    id: "financing",
    question: "Do you offer financing or payment plans?",
    answer:
      "Yes. We offer in-house payment options and third-party financing via PatientFi and Cherry—begin your journey now and pay over time.",
  },
  {
    id: "mens-services",
    question: "What services are available for men?",
    answer:
      "All of them. For men, we focus on core strength, pelvic floor health, energy levels, and mental performance through customized, non-invasive therapies.",
  },
] as const;
