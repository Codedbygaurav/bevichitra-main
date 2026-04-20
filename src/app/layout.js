import { NavProvider } from "../context/NavContext";
import "./globals.css";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";


const wildborn = localFont({
  src: "../../public/fonts/wildborn-Black.woff2",
  variable: "--font-logo",
});

const fredokaLight = localFont({
  src: "../../public/fonts/Fredoka-Light.ttf",
  variable: "--font-ui",
});

const fredokaBold = localFont({
  src: "../../public/fonts/Fredoka-Bold.ttf",
  variable: "--font-heading",
});

const fredokaRegular = localFont({
  src: "../../public/fonts/Fredoka-Regular.ttf",
  variable: "--font-body",
});

export const metadata = {
  metadataBase: new URL("https://bevichitra.com"),

  openGraph: {
    siteName: "BeVichitra",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${wildborn.variable} ${fredokaLight} ${fredokaBold} ${fredokaRegular}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <NavProvider>
            <Navbar />
            {children}
            <Footer />
          </NavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
