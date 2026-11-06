import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getSiteContent } from "@/lib/api/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const body = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  return {
    title: { default: site.metadataTitle, template: site.metadataTemplate },
    description: site.metadataDescription,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSiteContent();
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Navbar content={site.nav} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer content={site.footer} brand={site.nav.brand} />
        <ChatWidget content={site.chat} />
      </body>
    </html>
  );
}
