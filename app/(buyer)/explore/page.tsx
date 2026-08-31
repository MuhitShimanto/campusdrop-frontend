"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import ProductCard from "@/components/product/product-card";
import { fetchHomePageDrops } from "@/api/drops/fetchHomePageDrops";

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

type ExploreResponse = {
  listings: Listing[];
};

type FilterType = "all" | "preorder" | "always_on";

const ListingCard = ({ item }: { item: Listing }) => {
  return (
    <Link
      href={`/stores/${item.store_slug}/${item.listing_id}`}
      className="block"
    >
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
      {Array.from({ length: 8 }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
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
    <div className="border border-dashed border-ink-200 bg-paper-50 px-6 py-16 text-center">
      <p className="mb-3 text-caption font-bold uppercase tracking-[0.16em] text-marigold-600">
        Nothing found
      </p>

      <h3 className="text-heading font-semibold text-ink-900">{title}</h3>

      <p className="mx-auto mt-2 max-w-md text-body-m leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

const FilterButton = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "border px-4 py-2.5 text-caption font-bold uppercase tracking-[0.12em] transition-colors",
        active
          ? "border-ink-900 bg-ink-900 text-paper-0"
          : "border-ink-150 bg-paper-0 text-ink-600 hover:border-ink-400 hover:text-ink-900",
      ].join(" ")}
    >
      {children}
    </button>
  );
};

const Page = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [type, setType] = useState<FilterType>("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    const loadListings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchHomePageDrops({
          preorderCount: 5,
          alwaysOnCount: 5,
        });

        setListings(response?.preOrders.concat(response?.alwaysOn) ?? []);
      } catch {
        setListings([]);
        setError(
          "We couldn't load the explore feed. Please refresh the page and try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  const categories = useMemo(() => {
    const values = listings
      .map((item) => item.category_name)
      .filter(Boolean);

    return ["all", ...Array.from(new Set(values))];
  }, [listings]);

  const filteredListings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = listings.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch) ||
        item.category_name.toLowerCase().includes(normalizedSearch) ||
        item.pickup_location.toLowerCase().includes(normalizedSearch);

      const matchesType =
        type === "all" || item.listing_type === type;

      const matchesCategory =
        category === "all" || item.category_name === category;

      return matchesSearch && matchesType && matchesCategory;
    });

    return [...result].sort((a, b) => {
      if (sort === "price-low") {
        return Number(a.price) - Number(b.price);
      }

      if (sort === "price-high") {
        return Number(b.price) - Number(a.price);
      }

      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      return (
        new Date(b.order_start_time ?? b.pickup_starts_at).getTime() -
        new Date(a.order_start_time ?? a.pickup_starts_at).getTime()
      );
    });
  }, [listings, search, type, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setType("all");
    setCategory("all");
    setSort("latest");
  };

  const hasFilters =
    search.length > 0 || type !== "all" || category !== "all";

  return (
    <main className="min-h-screen bg-paper-0 text-foreground">
      {/* ---------------------------------------------------------
          HERO
      ---------------------------------------------------------- */}
      <section className="border-b border-ink-150 bg-card">
        <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-caption font-bold uppercase tracking-[0.18em] text-marigold-600">
                Explore
              </p>

              <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-ink-900 sm:text-5xl lg:text-7xl">
                Find your next
                <br />
                <span className="text-rust-600">favorite drop.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Search everything currently available from local stores and
                independent creators. Discover what&apos;s coming up, what&apos;s
                available now, and what&apos;s worth claiming.
              </p>
            </div>

            <div className="grid grid-cols-2 border border-ink-150 bg-paper-0 sm:min-w-70">
              <div className="border-r border-ink-150 p-5">
                <p className="text-caption font-bold uppercase tracking-[0.14em] text-ink-500">
                  LISTINGS
                </p>

                <p className="mt-2 font-mono text-3xl font-bold text-ink-900">
                  {loading ? "--" : listings.length}
                </p>
              </div>

              <div className="p-5">
                <p className="text-caption font-bold uppercase tracking-[0.14em] text-ink-500">
                  CATEGORIES
                </p>

                <p className="mt-2 font-mono text-3xl font-bold text-ink-900">
                  {loading ? "--" : Math.max(categories.length - 1, 0)}
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
        <section className="container mx-auto px-4 pt-8 sm:px-6 lg:px-8">
          <div className="border border-rust-300 bg-rust-50 px-5 py-4">
            <p className="text-body-m text-rust-700">{error}</p>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------
          EXPLORE CONTROLS
      ---------------------------------------------------------- */}
      <section className="border-b border-ink-150 bg-paper-50">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-ink-400">
                /
              </span>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search drops, categories, locations..."
                className="h-12 w-full border border-ink-150 bg-paper-0 pl-9 pr-4 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-ink-700"
              />
            </div>

            {/* Type */}
            <div className="flex gap-2 overflow-x-auto">
              <FilterButton
                active={type === "all"}
                onClick={() => setType("all")}
              >
                All
              </FilterButton>

              <FilterButton
                active={type === "always_on"}
                onClick={() => setType("always_on")}
              >
                Available now
              </FilterButton>

              <FilterButton
                active={type === "preorder"}
                onClick={() => setType("preorder")}
              >
                Preorder
              </FilterButton>
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-12 border border-ink-150 bg-paper-0 px-4 text-sm font-medium text-ink-700 outline-none focus:border-ink-700"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          RESULTS
      ---------------------------------------------------------- */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Result header */}
        <div className="mb-8 flex flex-col gap-5 border-b border-ink-150 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-caption font-bold uppercase tracking-[0.18em] text-marigold-600">
              Browse
            </p>

            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink-900 sm:text-3xl">
              All drops
            </h2>

            <p className="mt-2 text-body-m text-muted-foreground">
              {loading
                ? "Loading the latest drops..."
                : `${filteredListings.length} ${
                    filteredListings.length === 1 ? "drop" : "drops"
                  } matching your selection.`}
            </p>
          </div>

          {!loading && hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="self-start border-b border-ink-400 pb-1 text-caption font-bold uppercase tracking-[0.12em] text-ink-600 transition-colors hover:border-ink-900 hover:text-ink-900 sm:self-auto"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Category filters */}
        {!loading && categories.length > 1 && (
          <div className="mb-10">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-caption font-bold uppercase tracking-[0.14em] text-ink-500">
                Categories
              </p>

              <span className="font-mono text-mono text-ink-400">
                {Math.max(categories.length - 1, 0)
                  .toString()
                  .padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={[
                    "border px-4 py-2 text-caption font-bold uppercase tracking-[0.1em] transition-colors",
                    category === item
                      ? "border-rust-600 bg-rust-600 text-paper-0"
                      : "border-ink-150 bg-paper-0 text-ink-600 hover:border-ink-400 hover:text-ink-900",
                  ].join(" ")}
                >
                  {item === "all" ? "Everything" : item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <LoadingGrid />
        ) : filteredListings.length === 0 ? (
          <EmptyState
            title={
              hasFilters
                ? "No drops match your filters."
                : "There are no drops right now."
            }
            description={
              hasFilters
                ? "Try a different search term or remove one of the filters to see more drops."
                : "New drops can appear at any time. Check back soon for something worth claiming."
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
            {filteredListings.map((item) => (
              <ListingCard key={item.listing_id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
