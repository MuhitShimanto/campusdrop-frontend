"use client"
import Link from "next/link";
import ProductCard from "../product/product-card";
import { Listing } from "./store-public-view";

const ListingCard = ({
  item,
  storeSlug,
}: {
  item: Listing;
  storeSlug: string;
}) => {
  return (
    <Link href={`/stores/${storeSlug}/${item.listing_id}`}>
      <ProductCard
        code={`#${item.listing_id.slice(0, 6).toUpperCase()}`}
        listingType={item.listing_type}
        status={item.status}
        category={item.category_name}
        title={item.name}
        description={item.description}
        price={item.price.toString()}
        imageSrc={item.image_url}
        pickupLocation={item.pickup_location}
        pickupStartsAt={item.pickup_starts_at}
        pickupEndsAt={item.pickup_ends_at}
        orderStartTime={item.order_start_time}
        orderEndTime={item.order_end_time}
        estimatedDeliveryDays={item.estimated_delivery_days}
        onClaim={() => {
          console.log("Claim listing:", item);
        }}
      />
    </Link>
  );
};

export default ListingCard;
