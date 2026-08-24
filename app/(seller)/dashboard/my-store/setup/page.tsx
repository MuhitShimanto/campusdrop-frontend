import StoreSetup from "@/components/store/setup";
import getSession from "@/lib/get-session";
import getStore from "@/lib/get-store";
import { redirect } from "next/navigation";


const page = async () => {
  const session = await getSession();
  const store = await getStore();
  if (!session) {
    redirect("/login");
  }
  if (store) {
    redirect("/dashboard");
  }
  return <StoreSetup />;
};

export default page;
