import {
  MoreHorizontal,
  Package,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const Page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Drops</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and organize the products you’re selling.
          </p>
        </div>

        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="size-4" />
          Add Product
        </button>
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

        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted">
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
          <span>Price</span>
          <span>Status</span>
          <span />
        </div>

        {/* Product */}
        <div className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_140px_120px_100px_48px] md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
              <Package className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Campus Hoodie
              </p>
              <p className="text-xs text-muted-foreground">
                SKU-001
              </p>
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">
              Clothing
            </span>
          </div>

          <div>
            <span className="text-sm font-medium">$35.00</span>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
              Active
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Product options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Another product */}
        <div className="grid gap-4 border-t px-5 py-4 md:grid-cols-[1fr_140px_120px_100px_48px] md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
              <Package className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Campus Tote Bag
              </p>
              <p className="text-xs text-muted-foreground">
                SKU-002
              </p>
            </div>
          </div>

          <span className="text-sm text-muted-foreground">
            Accessories
          </span>

          <span className="text-sm font-medium">$18.00</span>

          <div>
            <span className="inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600">
              Draft
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Product options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Empty state example */}
        {/*
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Package className="size-6 text-muted-foreground" />
          </div>

          <h3 className="mt-4 font-medium">No products yet</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Add your first product to start selling on CampusDrop.
          </p>

          <button className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
            <Plus className="size-4" />
            Add Product
          </button>
        </div>
        */}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">2</span>{" "}
          of <span className="font-medium text-foreground">2</span>{" "}
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
  );
};

export default Page;
