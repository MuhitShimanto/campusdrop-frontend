import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return <>{children}</>;
}
