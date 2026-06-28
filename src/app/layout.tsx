import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer, Header, FloatingActions } from "@/components/site-shell";
import { SmoothScroll } from "@/components/smooth-scroll";
import { PreloaderWrapper } from "@/components/preloader";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Dr. Shaheen's Dental Clinic | Dentist in Habra", template: "%s | Dr. Shaheen's Dental Clinic" },
  description: "Dr. Shaheen's Dental Clinic provides modern dental care at Swamiji Road, Jorasirishtala, Habra, West Bengal 743233. Open until 11:30 pm.",
  keywords: ["Dr. Shaheen's Dental Clinic", "dentist Habra", "dental clinic Jorasirishtala", "Swamiji Road dentist", "emergency dental care", "teeth whitening", "oral surgery"],
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
