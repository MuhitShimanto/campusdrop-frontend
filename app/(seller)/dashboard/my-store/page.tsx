import getStore from "@/lib/get-store";
import { redirect } from "next/navigation";
import StoreProfileForm from "./store-profile-form";

const Page = async () => {
  const store = await getStore();
  if (!store) {
    redirect(`/dashboard/my-store/setup`);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Store Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your store information and how customers see your business.
        </p>
      </div>

      <StoreProfileForm store={store} />
    </div>
  );
};

export default Page;