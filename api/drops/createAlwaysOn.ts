import type { FormValues } from "@/lib/validations/listing";
import { fromZonedTime } from "date-fns-tz";

const DHAKA_TIMEZONE = "Asia/Dhaka";

export const createAlwaysOn = async (data: FormValues) => {
  const pickupStartsAt = fromZonedTime(
    data.pickup_starts_at,
    DHAKA_TIMEZONE,
  );

  const pickupEndsAt = fromZonedTime(
    data.pickup_ends_at,
    DHAKA_TIMEZONE,
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/drops/create-alwayson`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listing_type: data.listing_type,
        name: data.name,
        category_id: data.category,
        description: data.description,
        price: data.price,
        status: data.status,
        fulfillment_mode: data.fulfillment_mode,
        pickup_location: data.pickup_location,

        pickup_starts_at: pickupStartsAt.toISOString(),
        pickup_ends_at: pickupEndsAt.toISOString(),

        estimated_delivery_days: data.estimated_delivery_days,
      }),
      credentials: "include",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        "Failed to create always-on listing",
    );
  }

  return result;
};
