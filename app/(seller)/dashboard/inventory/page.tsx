import SellerDashboardItemTitle from "@/components/seller-dashboard/title";
import {
  AlertTriangle,
  ArrowUpDown,
  MoreHorizontal,
  Package,
  Plus,
  Search,
} from "lucide-react";

const Page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SellerDashboardItemTitle title="Inventory" description="Monitor stock levels and manage your product inventory." />

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Add Stock
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Products</p>
          <p className="mt-2 text-2xl font-semibold">24</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Products in inventory
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">In Stock</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-600">
            18
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Products with available stock
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Low Stock</p>
          <p className="mt-2 text-2xl font-semibold text-amber-600">
            4
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Products need restocking
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Out of Stock</p>
          <p className="mt-2 text-2xl font-semibold text-red-600">2</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Products currently unavailable
          </p>
        </div>
      </div>

      {/* Low stock alert */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />

        <div>
          <p className="text-sm font-medium">Low stock alert</p>
          <p className="mt-1 text-sm text-muted-foreground">
            4 products are running low on stock. Consider restocking them
            soon.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            placeholder="Search products..."
            className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          <ArrowUpDown className="size-4" />
          Stock Status
        </button>
      </div>

      {/* Inventory table */}
      <div className="rounded-xl border bg-card">
        {/* Table header */}
        <div className="hidden grid-cols-[1fr_130px_120px_120px_48px] items-center gap-4 border-b px-5 py-3 text-xs font-medium text-muted-foreground md:grid">
          <span>Product</span>
          <span>SKU</span>
          <span>Stock</span>
          <span>Status</span>
          <span />
        </div>

        {/* Product */}
        <div className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_130px_120px_120px_48px] md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted">
              <Package className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Campus Hoodie
              </p>
              <p className="text-xs text-muted-foreground">
                Clothing
              </p>
            </div>
          </div>

          <span className="text-sm text-muted-foreground">
            SKU-001
          </span>

          <div>
            <span className="text-sm font-medium">42 units</span>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
              In Stock
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Inventory options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Low stock product */}
        <div className="grid gap-4 border-t px-5 py-4 md:grid-cols-[1fr_130px_120px_120px_48px] md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted">
              <Package className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Campus Tote Bag
              </p>
              <p className="text-xs text-muted-foreground">
                Accessories
              </p>
            </div>
          </div>

          <span className="text-sm text-muted-foreground">
            SKU-002
          </span>

          <div>
            <span className="text-sm font-medium">4 units</span>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600">
              Low Stock
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Inventory options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Out of stock product */}
        <div className="grid gap-4 border-t px-5 py-4 md:grid-cols-[1fr_130px_120px_120px_48px] md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted">
              <Package className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                University Cap
              </p>
              <p className="text-xs text-muted-foreground">
                Accessories
              </p>
            </div>
          </div>

          <span className="text-sm text-muted-foreground">
            SKU-003
          </span>

          <div>
            <span className="text-sm font-medium">0 units</span>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600">
              Out of Stock
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Inventory options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Empty state */}
        {/*
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Package className="size-6 text-muted-foreground" />
          </div>

          <h3 className="mt-4 font-medium">No inventory yet</h3>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Your products and their stock levels will appear here once
            you add products.
          </p>

          <button
            type="button"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            <Plus className="size-4" />
            Add Product
          </button>
        </div>
        */}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">3</span>{" "}
          of{" "}
          <span className="font-medium text-foreground">24</span>{" "}
          products
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled
            className="h-9 rounded-md border px-3 text-sm font-medium text-muted-foreground disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            className="h-9 rounded-md border px-3 text-sm font-medium hover:bg-muted"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
