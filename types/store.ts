export type Store = {
  store_id: string;
  user_id: string;
  name: string;
  slug: string;
  avatar: string;
  cover: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type StoreListing = {
  name: string;
  price: number;
  status: "active" | "inactive" | "closed";
  image_url: string;
  listing_id: string;
  description: string;
  listing_type: "preorder" | "always_on";
  category_name: string;
  order_end_time?: string;
  pickup_ends_at: string;
  pickup_location: string;
  fulfillment_mode: "scheduled" | "immediate";
  order_start_time?: string;
  pickup_starts_at: string;
  estimated_delivery_days?: number;
};

export type StorePublicViewData = {
  store: {
    cover: string;
    avatar: string;
    name: string;
    slug: string;
    store_id: string;
    description: string;
  };

  user: {
    avatar: string | null;
    name: string;
    slug: string;
    user_id: string;
  };

  listings: {
    preorder: StoreListing[];
    always_on: StoreListing[];
  };
};
