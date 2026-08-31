export const stepFields = {
  1: ["listing_type"],
  2: ["images", "name", "category", "description"],
  3: ["price", "status"],
  4: [
    "fulfillment_mode",
    "pickup_location",
    "pickup_starts_at",
    "pickup_ends_at",
  ],
  5: ["order_start_time", "order_end_time", "estimated_delivery_days"],
} as const;

export const categories = ["Clothing", "Accessories", "Food", "Electronics", "Home"];

export const steps = [
  {
    id: 1,
    title: "Availability",
    description: "Choose how customers can access this listing.",
  },
  {
    id: 2,
    title: "Listing details",
    description: "Add the information customers need.",
  },
  {
    id: 3,
    title: "Pricing & status",
    description: "Set pricing and listing status.",
  },
  {
    id: 4,
    title: "Fulfillment",
    description: "Configure fulfillment details.",
  },
  {
    id: 5,
    title: "Ordering",
    description: "Configure ordering and delivery.",
  },
];