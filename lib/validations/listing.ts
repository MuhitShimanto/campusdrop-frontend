import z from "zod";

export const listingSchema = z
  .object({
    listing_type: z.enum(["always_on", "preorder"]),

    images: z
      .array(z.instanceof(File))
      .min(1, "At least one image is required")
      .max(3, "You can upload a maximum of 3 images"),

    name: z
      .string()
      .trim()
      .min(1, "Listing name is required")
      .max(100, "Listing name must be 100 characters or less"),

    category: z.string().min(1, "Please select a category"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(2000, "Description must be 2000 characters or less"),

    price: z.number().positive("Price must be greater than 0"),

    status: z.enum(["draft", "active", "paused", "sold_out", "archived"]),

    fulfillment_mode: z.enum(["immediate", "scheduled"]),

    pickup_location: z.string().trim().optional(),

    pickup_starts_at: z.string().min(1, "Pickup start time is required"),

    pickup_ends_at: z.string().min(1, "Pickup end time is required"),

    order_start_time: z.string(),

    order_end_time: z.string(),

    estimated_delivery_days: z
      .number()
      .int()
      .positive("Delivery days must be at least 1")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.listing_type === "preorder") {
      if (!data.order_start_time) {
        ctx.addIssue({
          code: "custom",
          path: ["order_start_time"],
          message: "Order start time is required",
        });
      }

      if (!data.order_end_time) {
        ctx.addIssue({
          code: "custom",
          path: ["order_end_time"],
          message: "Order end time is required",
        });
      }

      if (
        data.order_start_time &&
        data.order_end_time &&
        new Date(data.order_end_time) <= new Date(data.order_start_time)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["order_end_time"],
          message: "Order end time must be after the start time",
        });
      }
    } else {
      if (
        data.estimated_delivery_days === undefined ||
        Number.isNaN(data.estimated_delivery_days)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["estimated_delivery_days"],
          message: "Estimated delivery is required",
        });
      }
    }
  });

export type FormValues = z.infer<typeof listingSchema>;