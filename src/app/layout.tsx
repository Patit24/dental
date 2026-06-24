import type { Metadata } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Footer, Header, FloatingActions } from "@/components/site-shell";
import { Dental3DLayer } from "@/components/dental-3d-loader";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const noto = Noto_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Dentazone Clinic | Dentist in Bagjola, West Bengal", template: "%s | Dentazone Clinic" },
  description: "Dentazone Clinic provides complete dental care at Kolsur More, Basirhat Road, Machalandapur, Bagjola, West Bengal. Call 079080 81534.",
  keywords: ["Dentazone Clinic", "dentist Bagjola", "dental clinic Machalandapur", "dentist Basirhat Road", "dental implants", "root canal", "teeth whitening"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${noto.variable}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <Dental3DLayer />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
