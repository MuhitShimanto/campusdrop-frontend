export const fetchMyDrops = async (): Promise<FetchMyDropsSendResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/drops/get-my-drops`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const json = await response.json();
  return json.data;
};

export type DropImage = {
  url: string;
  sort_order: number;
};

export type Drop = {
  listing_id: string;
  listing_type: string;
  category_name: string;
  name: string;
  description: string;
  price: string;
  status: string;
  fulfillment_mode: string;
  pickup_location: string;
  pickup_starts_at: string;
  pickup_ends_at: string;
  deleted_at: string | null;
  images: DropImage[];
};

type FetchMyDropsResponse = {
  status: string;
  message: string;
  data: {
    store_id: string;
    name: string;
    slug: string;
    drops: Drop[];
  };
};

type FetchMyDropsSendResponse = {
  store_id: string;
  name: string;
  slug: string;
  drops: Drop[];
};
