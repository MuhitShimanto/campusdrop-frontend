import { Navbar } from "@/components/navbar/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | CampusDrop",
  description: "Login or Sign up to get started with CampusDrop. This is a marketplace for Brac University students to buy and sell items on campus. It helps students to connect and trade items with each other.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="mx-auto container">
      <Navbar />
      {children}
    </div>
  );
}
