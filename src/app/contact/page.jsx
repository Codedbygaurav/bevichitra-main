import ContactClient from "@/components/section/contact/ContactClient";

export const metadata = {
  title: "Contact | BeVichitra",
  description:
    "Start your project with BeVichitra. Get clear direction and strategy for your brand.",
  openGraph: {
    title: "Contact | BeVichitra",
    description:
      "Let’s build something meaningful together.",
    url: "/contact",
    images: [
      {
        url: "/images/banner/Contact.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}