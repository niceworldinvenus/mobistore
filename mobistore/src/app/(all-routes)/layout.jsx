
import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata = {
  title: "Mobistore",
  description: "Next Generation Mobile Store",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
  
        <link rel="icon" href="/favicon.ico" sizes="any" />     
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
