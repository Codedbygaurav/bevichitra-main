import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Us | BeVichitra",
  description:
    "Start your project with BeVichitra. Book a call and get clear next steps.",
  keywords: [
    "BeVichitra contact",
    "book consultation",
    "branding agency",
    "website development",
    "UI UX services",
  ],
  openGraph: {
    title: "Contact Us | BeVichitra",
    description: "Let’s build something meaningful together.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}