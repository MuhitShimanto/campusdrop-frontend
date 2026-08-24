import SellerSidebar from "@/components/navbar/seller-sidebar";
import getSession from "@/lib/get-session";
import getStore from "@/lib/get-store";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await getSession();
  const store = await getStore();

  if (!session) redirect("/");
  return <SellerSidebar user={session.user} hasStore={store}>{children}</SellerSidebar>;
}
