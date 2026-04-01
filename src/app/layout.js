import { NavProvider } from "../context/NavContext";
import "./globals.css";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import localFont from "next/font/local"

const myFont = localFont({
  src:'../../public/fonts/wildborn-Black.woff2',
  variable:'--font-logo'
})

export default function RootLayout({ children }) {

  
  return (
    <html lang="en" className={myFont.variable}>
      <body>
        
        <NavProvider>
          <Navbar/>
        {children}
        </NavProvider>
        <Footer/>
        
        
      </body>
    </html>
  );
}

