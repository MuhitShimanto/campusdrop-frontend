import type { FormValues } from "@/lib/validations/listing";
import { fromZonedTime } from "date-fns-tz";

const DHAKA_TIMEZONE = "Asia/Dhaka";

export const createPreOrder = async (data: FormValues) => {
  const pickupStartsAt = fromZonedTime(
    data.pickup_starts_at,
    DHAKA_TIMEZONE,
  );

  const pickupEndsAt = fromZonedTime(
    data.pickup_ends_at,
    DHAKA_TIMEZONE,
  );

  const orderStartTime = fromZonedTime(
    data.order_start_time,
    DHAKA_TIMEZONE,
  );

  const orderEndTime = fromZonedTime(
    data.order_end_time,
    DHAKA_TIMEZONE,
  );

  const body = {
    listing_type: data.listing_type,
    name: data.name,
    category_id: data.category,
    description: data.description,
    price: data.price,
    status: data.status,
    fulfillment_mode: data.fulfillment_mode,

    ...(data.pickup_location
      ? {
          pickup_location: data.pickup_location,
        }
      : {}),

    pickup_starts_at: pickupStartsAt.toISOString(),
    pickup_ends_at: pickupEndsAt.toISOString(),
    order_start_time: orderStartTime.toISOString(),
    order_end_time: orderEndTime.toISOString(),

    ...(data.estimated_delivery_days !== undefined
      ? {
          estimated_delivery_days: data.estimated_delivery_days,
        }
      : {}),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/drops/create-preorder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.error?.message ||
        result?.message ||
        result?.error ||
        "Failed to create preorder",
    );
  }

  return result;
};
