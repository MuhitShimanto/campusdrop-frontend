"use client";

import { useEffect, useMemo, useState } from "react";
import SellerDashboardItemTitle from "@/components/seller-dashboard/title";
import {
  MoreHorizontal,
  Package,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateDropModal from "@/components/drop/create-drop-modal";
import { Drop, fetchMyDrops } from "@/api/drops/fetchMyDrops";
import Link from "next/link";

const Page = () => {
  const [createDropOpen, setCreateDropOpen] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [storeSlug, setStoreSlug] = useState("");

  useEffect(() => {
    const loadDrops = async () => {
      try {
        setLoading(true);

        const data = await fetchMyDrops();

        setDrops(data.drops);
        setStoreSlug(data.slug);
      } catch (error) {
        console.error("Failed to fetch drops:", error);
        setDrops([]);
      } finally {
        setLoading(false);
      }
    };

    loadDrops();
  }, []);

  const filteredDrops = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return drops;
    }

    return drops.filter(
      (drop) =>
        drop.name.toLowerCase().includes(query) ||
        drop.description.toLowerCase().includes(query) ||
        drop.pickup_location.toLowerCase().includes(query),
    );
  }, [drops, search]);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SellerDashboardItemTitle
            title="Drops"
            description="Manage and organize the products you're selling."
          />

          <Button
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            onClick={() => setCreateDropOpen(true)}
          >
            <Plus className="size-4" />
            New Drop
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </button>
        </div>

        {/* Product list */}
        <div className="rounded-xl border bg-card">
          {/* Table header */}
          <div className="hidden grid-cols-[1fr_140px_120px_100px_48px] items-center gap-4 border-b px-5 py-3 text-xs font-medium text-muted-foreground md:grid">
            <span>Product</span>
            <span>Category</span>
            <span>Price (BDT)</span>
            <span>Status</span>
            <span />
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center px-6 py-16">
              <p className="text-sm text-muted-foreground">
                Loading drops...
              </p>
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredDrops.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Package className="size-6 text-muted-foreground" />
              </div>

              <h3 className="mt-4 font-medium">
                {search ? "No drops found" : "No drops yet"}
              </h3>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {search
                  ? "Try adjusting your search."
                  : "Add your first drop to start selling on CampusDrop."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={() => setCreateDropOpen(true)}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                >
                  <Plus className="size-4" />
                  New Drop
                </button>
              )}
            </div>
          )}

          {/* Products */}
          {!loading &&
            filteredDrops.map((drop, index) => {
              const image = [...drop.images]
                .sort((a, b) => a.sort_order - b.sort_order)[0];

              return (
                <div
                  key={drop.listing_id}
                  className={`grid gap-4 px-5 py-4 md:grid-cols-[1fr_140px_120px_100px_48px] md:items-center ${
                    index > 0 ? "border-t" : ""
                  }`}
                >
                  {/* Product */}
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
                      {image?.url ? (
                        <img
                          src={image.url}
                          alt={drop.name}
                          className="size-full object-cover"
                          draggable={false}
                        />
                      ) : (
                        <Package className="size-5 text-muted-foreground" />
                      )}
                    </div>

                    <Link href={`/stores/${storeSlug}/${drop.listing_id}`} className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {drop.name}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {drop.pickup_location}
                      </p>
                    </Link>
                  </div>

                  {/* Category */}
                  <div>
                    <span className="text-sm text-muted-foreground">
                      {drop.category_name}
                    </span>
                  </div>

                  {/* Price */}
                  <div>
                    <span className="text-sm font-medium">
                      {Number(drop.price).toFixed(2)}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        drop.status === "active"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : drop.status === "draft"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {drop.status.charAt(0).toUpperCase() +
                        drop.status.slice(1)}
                    </span>
                  </div>

                  {/* Options */}
                  <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
                    aria-label={`Options for ${drop.name}`}
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>
              );
            })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredDrops.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">{drops.length}</span>{" "}
            products
          </p>

          <div className="flex gap-2">
            <button
              disabled
              className="h-9 rounded-md border px-3 text-sm font-medium text-muted-foreground disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled
              className="h-9 rounded-md border px-3 text-sm font-medium text-muted-foreground disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <CreateDropModal
        open={createDropOpen}
        onOpenChange={setCreateDropOpen}
      />
    </>
  );
};

export default Page;
