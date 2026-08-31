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
};
