import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer, Header, FloatingActions } from "@/components/site-shell";
import { SmoothScroll } from "@/components/smooth-scroll";
import { PreloaderWrapper } from "@/components/preloader";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Saha Clinic Family Dental Care Center | Dentist in Basirhat", template: "%s | Saha Clinic" },
  description: "Saha Clinic Family Dental Care Center provides emergency care, online dentist booking, cosmetic procedures, check-ups and family dental services at Bagati Rd, Bhyabla, Basirhat, West Bengal 743412.",
  keywords: ["Saha Clinic Family Dental Care Center", "dentist Basirhat", "dental clinic Bhyabla", "Bagati Road dentist", "emergency dental care", "teeth whitening", "oral surgery"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jakarta.variable}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <PreloaderWrapper>
          <SmoothScroll>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <FloatingActions />
          </SmoothScroll>
        </PreloaderWrapper>
      </body>
    </html>
  );
}
