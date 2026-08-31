import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/product/product-card";
import { StorePublicViewData } from "@/types/store";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ListingCard from "./listing-card";

export type Listing = {
  listing_id: string;
  listing_type: "preorder" | "always_on";
  status: "active" | "inactive" | "closed";
  name: string;
  description: string;
  price: number | string;
  image_url: string;
  category_name: string;
  fulfillment_mode: "scheduled" | "immediate";
  pickup_location: string;
  pickup_starts_at: string;
  pickup_ends_at: string;
  order_start_time?: string;
  order_end_time?: string;
  estimated_delivery_days?: number;
};

type StoreListings = {
  preorder: Listing[];
  always_on: Listing[];
};

const SectionHeader = ({
  eyebrow,
  title,
  description,
  count,
}: {
  eyebrow: string;
  title: string;
  description: string;
  count: number;
}) => {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-ink-150 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="mb-2 text-caption font-bold uppercase tracking-[0.18em] text-marigold-600">
          {eyebrow}
        </p>

        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink-900 sm:text-3xl">
          {title}
        </h2>

        <p className="mt-2 text-body-m leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="shrink-0 font-mono text-mono text-ink-500">
        {count.toString().padStart(2, "0")} ITEMS
      </div>
    </div>
  );
};

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="border border-dashed border-ink-200 bg-paper-50/50 px-6 py-14 text-center rounded-xl">
      <h3 className="text-heading font-semibold text-ink-900">{title}</h3>

      <p className="mx-auto mt-2 max-w-md text-body-m leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

const StorePublicView = ({
  store,
  user,
  listings,
}: StorePublicViewData & {
  listings?: StoreListings;
}) => {
  // Avatar Fallback
  const storeInitials = store.name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Avatar Fallback
  const userInitials = user.name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const preorderListings = listings?.preorder ?? [];
  const alwaysOnListings = listings?.always_on ?? [];

  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* Information Section */}
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-6xl overflow-hidden border bg-card py-0 shadow-none">
          {/* Cover */}
          <div className="relative h-40 bg-muted">
            <Image
              src={store.cover}
              alt={`${store.name} cover`}
              loading="eager"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
          </div>

          {/* Store header */}
          <div className="relative px-4 pb-6 sm:px-6">
            <div className="-mt-12 flex flex-col gap-4 rounded-md border bg-background/10 p-2 backdrop-blur-xs sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                {/* Store avatar */}
                <Avatar className="group relative size-20 shrink-0 rounded-xl border-4 border-card bg-primary text-primary-foreground shadow-sm">
                  <AvatarImage
                    src={store.avatar}
                    alt={store.name}
                    className="size-full object-cover"
                  />

                  <AvatarFallback className="rounded-xl text-lg font-semibold">
                    {storeInitials}
                  </AvatarFallback>
                </Avatar>

                {/* Store name + slug */}
                <div className="min-w-0 pb-1">
                  <div className="flex items-center gap-2">
                    <h1 className="truncate text-xl font-semibold">
                      {store.name || "Untitled store"}
                    </h1>

                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-600">
                      <Check className="size-3" />
                      Active
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    @{store.slug || "your-handle"}
                  </p>
                </div>
              </div>
            </div>

            {/* 2 column */}
            <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-6">
              <div className="max-w-3xl p-4 md:col-span-4">
                {store.description ? (
                  <p className="text-sm leading-6 text-[#333]">
                    {store.description}
                  </p>
                ) : (
                  <p className="mt-4 text-sm italic text-muted-foreground">
                    No description yet — customers will see this space blank.
                  </p>
                )}
              </div>

              {/* Owner info */}
              <div className="rounded-md border border-muted-foreground/10 p-4 md:col-span-2">
                <div className="flex flex-col justify-center gap-2 text-sm text-muted-foreground">
                  <span>Owner Details</span>

                  <div className="flex gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={user.avatar}
                        alt={user.name}
                        className="object-cover"
                      />

                      <AvatarFallback className="text-[10px]">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>

                    <span className="font-medium text-foreground">
                      {user.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Drops Sections */}
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        {/* PREORDERS */}
        {preorderListings.length > 0 && (
          <section className="mx-auto mb-20 max-w-6xl">
            <SectionHeader
              eyebrow="Coming up"
              title="Preorder drops"
              description="Reserve upcoming items before their ordering window closes."
              count={preorderListings.length}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {preorderListings.map((item) => (
                <ListingCard
                  key={item.listing_id}
                  item={item}
                  storeSlug={store.slug}
                />
              ))}
            </div>
          </section>
        )}

        {/* ALWAYS ON */}
        {alwaysOnListings.length > 0 && (
          <section className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Available now"
              title="Always-on drops"
              description="Items available for immediate claiming. Check each card for pickup details."
              count={alwaysOnListings.length}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {alwaysOnListings.map((item) => (
                <ListingCard
                  key={item.listing_id}
                  item={item}
                  storeSlug={store.slug}
                />
              ))}
            </div>
          </section>
        )}

        {/* No listings */}
        {preorderListings.length === 0 && alwaysOnListings.length === 0 && (
          <section className="mx-auto max-w-6xl">
            <EmptyState
              title="Nothing available right now."
              description="This store doesn't have any public drops available at the moment. Check back soon."
            />
          </section>
        )}
      </div>
    </main>
  );
};

export default StorePublicView;
