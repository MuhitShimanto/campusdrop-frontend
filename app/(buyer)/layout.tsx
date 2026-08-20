import { Navbar } from "@/components/navbar/navbar";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="mx-auto container">
      <Navbar />
      {children}
    </div>
  );
}
