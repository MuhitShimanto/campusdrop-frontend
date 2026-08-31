import type { FormValues } from "@/lib/validations/listing";

import { fromZonedTime } from "date-fns-tz";

const DHAKA_TIMEZONE = "Asia/Dhaka";

export const createPreOrder = async (data: FormValues) => {
  const formData = new FormData();

  formData.append("listing_type", data.listing_type);
  formData.append("name", data.name);
  formData.append("category_id", data.category);
  formData.append("description", data.description);
  formData.append("price", String(data.price));
  formData.append("status", data.status);
  formData.append("fulfillment_mode", data.fulfillment_mode);

  if (data.pickup_location) {
    formData.append("pickup_location", data.pickup_location);
  }

  const pickupStartsAt = fromZonedTime(data.pickup_starts_at, DHAKA_TIMEZONE);

  const pickupEndsAt = fromZonedTime(data.pickup_ends_at, DHAKA_TIMEZONE);

  const orderStartTime = fromZonedTime(data.order_start_time, DHAKA_TIMEZONE);

  const orderEndTime = fromZonedTime(data.order_end_time, DHAKA_TIMEZONE);

  formData.append("pickup_starts_at", pickupStartsAt.toISOString());

  formData.append("pickup_ends_at", pickupEndsAt.toISOString());

  formData.append("order_start_time", orderStartTime.toISOString());

  formData.append("order_end_time", orderEndTime.toISOString());

  if (data.estimated_delivery_days !== undefined) {
    formData.append(
      "estimated_delivery_days",
      String(data.estimated_delivery_days),
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/drops/create-preorder`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || result?.error || "Failed to create preorder",
    );
  }

  return result;
};
