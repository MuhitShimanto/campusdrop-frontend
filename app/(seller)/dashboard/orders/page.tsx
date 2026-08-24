import {
  ArrowUpDown,
  MoreHorizontal,
  Package,
  Search,
} from "lucide-react";

const Page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track and manage orders placed by your customers.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Processing</p>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            placeholder="Search by order ID or customer..."
            className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          <ArrowUpDown className="size-4" />
          Status
        </button>
      </div>

      {/* Orders */}
      <div className="rounded-xl border bg-card">
        {/* Table header */}
        <div className="hidden grid-cols-[140px_1fr_140px_120px_120px_48px] items-center gap-4 border-b px-5 py-3 text-xs font-medium text-muted-foreground md:grid">
          <span>Order</span>
          <span>Customer</span>
          <span>Date</span>
          <span>Total</span>
          <span>Status</span>
          <span />
        </div>

        {/* Order */}
        <div className="grid gap-4 px-5 py-4 md:grid-cols-[140px_1fr_140px_120px_120px_48px] md:items-center">
          <div>
            <p className="text-sm font-medium">#ORD-1001</p>
            <p className="mt-1 text-xs text-muted-foreground">
              2 items
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <span className="text-xs font-medium">JD</span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                John Doe
              </p>
              <p className="truncate text-xs text-muted-foreground">
                john@example.com
              </p>
            </div>
          </div>

          <span className="text-sm text-muted-foreground">
            Aug 21, 2026
          </span>

          <span className="text-sm font-medium">$53.00</span>

          <div>
            <span className="inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600">
              Pending
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Order options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Another order */}
        <div className="grid gap-4 border-t px-5 py-4 md:grid-cols-[140px_1fr_140px_120px_120px_48px] md:items-center">
          <div>
            <p className="text-sm font-medium">#ORD-1000</p>
            <p className="mt-1 text-xs text-muted-foreground">
              1 item
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <span className="text-xs font-medium">AS</span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Alex Smith
              </p>
              <p className="truncate text-xs text-muted-foreground">
                alex@example.com
              </p>
            </div>
          </div>

          <span className="text-sm text-muted-foreground">
            Aug 20, 2026
          </span>

          <span className="text-sm font-medium">$35.00</span>

          <div>
            <span className="inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
              Completed
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Order options"
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

          <h3 className="mt-4 font-medium">No orders yet</h3>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Orders from your customers will appear here once they
            purchase your products.
          </p>
        </div>
        */}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">2</span>{" "}
          of{" "}
          <span className="font-medium text-foreground">2</span>{" "}
          orders
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
