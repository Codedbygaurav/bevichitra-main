import ContactClient from "@/components/section/contact/ContactClient";

export const metadata = {
  title: "Contact | BeVichitra",
  description:
    "Start your project with BeVichitra. Get clear direction and strategy for your brand.",

  openGraph: {
    title: "Contact | BeVichitra",
    description: "Let’s build something meaningful together.",
    url: "https://bevichitra.com/contact-us", // ✅ absolute
    siteName: "BeVichitra",
    images: [
      {
        url: "https://bevichitra.com/images/URLimages/contact.jpg", // ✅ absolute + JPG
        width: 1200,
        height: 630,
        alt: "Contact BeVichitra",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact | BeVichitra",
    description: "Start your project with BeVichitra.",
    images: ["https://bevichitra.com/images/URLimages/contact.jpg"], // ✅ same image
  },
};

export default function ContactPage() {
  return <ContactClient />;
}