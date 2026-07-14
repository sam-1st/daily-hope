import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Daily Hope",
  description: "Get in touch with the Daily Hope team.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-lg text-center">
        <span className="section-eyebrow justify-center">Contact</span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl dark:text-white">
          We'd love to hear from you
        </h1>
        <p className="mt-3 text-ink-soft">
          Questions, feedback, or just want to say hello — send a message below.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-lg">
        <ContactForm />
      </div>
    </div>
  );
}
