import getStore from "@/lib/get-store";
import { redirect } from "next/navigation";
import StoreProfileForm from "./store-profile-form";
import SellerDashboardItemTitle from "@/components/seller-dashboard/title";

const Page = async () => {
  const store = await getStore();
  if (!store) {
    redirect(`/dashboard/my-store/setup`);
  }

  return (
    <div className="mx-auto  space-y-6 pb-24">
      <SellerDashboardItemTitle
        title="Store Profile"
        description="Manage your store information and how customers see your business."
      />

      <StoreProfileForm store={store} />
    </div>
  );
};

export default Page;
