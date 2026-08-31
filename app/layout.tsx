import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Roboto_Condensed,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Inter,
  Roboto,
  JetBrains_Mono,
  Fira_Code
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

// Style - 1
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow-condensed",
});
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-roboto-condensed",
});

// Style - 2
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-roboto",
});

// Style - 3
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "CampusDrop | Your Campus Marketplace",
  description:
    "This is a marketplace for Brac University students to buy and sell items on campus. It helps students to connect and trade items with each other.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        barlowCondensed.variable,
        robotoCondensed.variable,
        plexSans.variable,
        inter.variable,
        roboto.variable,
        plexMono.variable,
        jetBrainsMono.variable,
        firaCode.variable
      )}
    >
      <body className="min-h-full flex flex-col pb-10 sm:pb-0">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
