"use client";

import React, { useEffect, useState } from "react";

import ProductCard from "@/components/product/product-card";
import { fetchHomePageDrops } from "@/api/drops/fetchHomePageDrops";
import Link from "next/link";

type Listing = {
  listing_id: string;
  listing_type: "preorder" | "always_on";
  status: "active" | "inactive" | "closed";
  name: string;
  description: string;
  price: string;
  image_url: string;
  category_name: string;
  fulfillment_mode: "scheduled" | "immediate";
  pickup_location: string;
  pickup_starts_at: string;
  pickup_ends_at: string;
  order_start_time?: string;
  order_end_time?: string;
  store_slug: string;
  store_id: string;
  estimated_delivery_days?: number;
};

type HomePageDropsResponse = {
  preOrders: Listing[];
  alwaysOn: Listing[];
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
    <div className="border border-dashed border-ink-200 bg-paper-50 px-6 py-14 text-center">
      <h3 className="text-heading font-semibold text-ink-900">{title}</h3>

      <p className="mx-auto mt-2 max-w-md text-body-m leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

const LoadingCard = () => {
  return (
    <div className="overflow-hidden border border-ink-150 bg-paper-0">
      <div className="aspect-square animate-pulse bg-ink-100" />

      <div className="space-y-4 p-6">
        <div className="h-3 w-20 animate-pulse bg-ink-100" />
        <div className="h-6 w-3/4 animate-pulse bg-ink-100" />
        <div className="h-10 w-full animate-pulse bg-ink-100" />
        <div className="h-px w-full bg-ink-100" />
        <div className="h-8 w-1/2 animate-pulse bg-ink-100" />
        <div className="h-9 w-full animate-pulse bg-ink-100" />
      </div>
    </div>
  );
};

const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  );
};

const ListingCard = ({ item }: { item: Listing }) => {
  return (
    <Link href={`/stores/${item.store_slug}/${item.listing_id}`}>
      <ProductCard
        code={`#${item.listing_id.slice(0, 6).toUpperCase()}`}
        listingType={item.listing_type}
        status={item.status}
        category={item.category_name}
        title={item.name}
        description={item.description}
        price={item.price}
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

const Page = () => {
  const [data, setData] = useState<HomePageDropsResponse>({
    preOrders: [],
    alwaysOn: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDrops = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchHomePageDrops({
          preorderCount: 5,
          alwaysOnCount: 5,
        });

        setData({
          preOrders: response?.preOrders ?? [],
          alwaysOn: response?.alwaysOn ?? [],
        });
      } catch {
        setData({
          preOrders: [],
          alwaysOn: [],
        });

        setError(
          "We couldn't load the latest drops. Please refresh the page and try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDrops();
  }, []);

  const totalDrops = data.preOrders.length + data.alwaysOn.length;

  return (
    <main className="min-h-screen bg-paper-0 text-foreground">
      {/* ---------------------------------------------------------
          HERO
      ---------------------------------------------------------- */}
      <section className="bg-card">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              {/* <div className="mb-6 inline-flex items-center gap-2 border border-ink-150 bg-paper-0 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-rust-600" />

                <span className="text-caption font-bold uppercase tracking-[0.16em] text-ink-700">
                  Public Drops
                </span>
              </div> */}

              <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-ink-900 sm:text-5xl lg:text-7xl">
                Discover something
                <br />
                <span className="text-rust-600">worth claiming.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Browse fresh drops from local stores and creators. Preorder
                upcoming items or claim something that&apos;s available now.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 border border-ink-150 bg-paper-0 sm:min-w-70">
              <div className="border-r border-ink-150 p-5">
                <p className="text-caption font-bold uppercase tracking-[0.14em] text-ink-500">
                  LIVE DROPS
                </p>

                <p className="mt-2 font-mono text-3xl font-bold text-ink-900">
                  {loading ? "--" : totalDrops}
                </p>
              </div>

              <div className="p-5">
                <p className="text-caption font-bold uppercase tracking-[0.14em] text-ink-500">
                  FORMATS
                </p>

                <p className="mt-2 font-mono text-3xl font-bold text-ink-900">
                  02
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          ERROR
      ---------------------------------------------------------- */}
      {error && (
        <section className="container mx-auto px-4 pt-10 sm:px-6 lg:px-8">
          <div className="border border-rust-300 bg-rust-50 px-5 py-4">
            <p className="text-body-m text-rust-700">{error}</p>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------
          PRODUCT SECTIONS
      ---------------------------------------------------------- */}
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-20 lg:pt-1">
        {/* PREORDERS */}
        <section className="mb-20">
          <SectionHeader
            eyebrow="Coming up"
            title="Preorder drops"
            description="Reserve upcoming items before their ordering window closes."
            count={data.preOrders.length}
          />

          {loading ? (
            <LoadingGrid />
          ) : data.preOrders.length === 0 ? (
            <EmptyState
              title="No preorder drops right now."
              description="There are no scheduled drops available for preorder at the moment. Check back soon."
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.preOrders.map((item) => (
                <ListingCard key={item.listing_id} item={item} />
              ))}
            </div>
          )}
        </section>

        {/* ALWAYS ON */}
        <section>
          <SectionHeader
            eyebrow="Available now"
            title="Always-on drops"
            description="Items available for immediate claiming. Check each card for pickup details."
            count={data.alwaysOn.length}
          />

          {loading ? (
            <LoadingGrid />
          ) : data.alwaysOn.length === 0 ? (
            <EmptyState
              title="Nothing available right now."
              description="There aren't any always-on drops available at the moment. New items can appear at any time."
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.alwaysOn.map((item) => (
                <ListingCard key={item.listing_id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;
