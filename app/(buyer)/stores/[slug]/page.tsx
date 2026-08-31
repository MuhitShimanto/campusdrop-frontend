import { fetchPublicStoreDetails } from "@/api/stores/fetchPublicStoreDetails";
import StorePublicView from "@/components/store/store-public-view";
import StorePublicViewNotFound from "@/components/store/store-public-view-notfound";
import { StorePublicViewData } from "@/types/store";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const storeDataWithUser: StorePublicViewData | null = await fetchPublicStoreDetails(slug);

  if (!storeDataWithUser) {
    return <StorePublicViewNotFound/>;
  }
  return (
    <StorePublicView
      store={storeDataWithUser.store}
      user={storeDataWithUser.user}
    />
  );
};

export default page;
