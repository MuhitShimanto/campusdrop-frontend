import SellerDashboardItemTitle from "@/components/seller-dashboard/title";
import {
  Mail,
  MoreHorizontal,
  Search,
  ShoppingBag,
  Users,
} from "lucide-react";

const Page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}      
      <SellerDashboardItemTitle title="Customers" description="View and manage customers who have purchased from your store." />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Total Customers
            </p>
            <Users className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-2 text-2xl font-semibold">128</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Customers who purchased from you
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              New Customers
            </p>
            <Users className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-2 text-2xl font-semibold">18</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Added this month
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Repeat Customers
            </p>
            <ShoppingBag className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-2 text-2xl font-semibold">42</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Customers with multiple orders
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="search"
          placeholder="Search customers..."
          className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      {/* Customers table */}
      <div className="rounded-xl border bg-card">
        {/* Table header */}
        <div className="hidden grid-cols-[1fr_180px_120px_130px_48px] items-center gap-4 border-b px-5 py-3 text-xs font-medium text-muted-foreground md:grid">
          <span>Customer</span>
          <span>Email</span>
          <span>Orders</span>
          <span>Total Spent</span>
          <span />
        </div>

        {/* Customer */}
        <div className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_180px_120px_130px_48px] md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span className="text-sm font-medium text-primary">
                JD
              </span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                John Doe
              </p>

              <p className="text-xs text-muted-foreground">
                Joined Aug 12, 2026
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <Mail className="size-4 shrink-0 text-muted-foreground" />

            <span className="truncate text-sm text-muted-foreground">
              john@example.com
            </span>
          </div>

          <span className="text-sm font-medium">
            8 orders
          </span>

          <span className="text-sm font-medium">
            $284.00
          </span>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Customer options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Customer */}
        <div className="grid gap-4 border-t px-5 py-4 md:grid-cols-[1fr_180px_120px_130px_48px] md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span className="text-sm font-medium text-primary">
                AS
              </span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Alex Smith
              </p>

              <p className="text-xs text-muted-foreground">
                Joined Aug 08, 2026
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <Mail className="size-4 shrink-0 text-muted-foreground" />

            <span className="truncate text-sm text-muted-foreground">
              alex@example.com
            </span>
          </div>

          <span className="text-sm font-medium">
            4 orders
          </span>

          <span className="text-sm font-medium">
            $126.00
          </span>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Customer options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Customer */}
        <div className="grid gap-4 border-t px-5 py-4 md:grid-cols-[1fr_180px_120px_130px_48px] md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span className="text-sm font-medium text-primary">
                SR
              </span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Sarah Rahman
              </p>

              <p className="text-xs text-muted-foreground">
                Joined Jul 29, 2026
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <Mail className="size-4 shrink-0 text-muted-foreground" />

            <span className="truncate text-sm text-muted-foreground">
              sarah@example.com
            </span>
          </div>

          <span className="text-sm font-medium">
            2 orders
          </span>

          <span className="text-sm font-medium">
            $68.00
          </span>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Customer options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Empty state */}
        {/*
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Users className="size-6 text-muted-foreground" />
          </div>

          <h3 className="mt-4 font-medium">No customers yet</h3>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Customers who purchase your products will appear here.
          </p>
        </div>
        */}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">3</span>{" "}
          of{" "}
          <span className="font-medium text-foreground">128</span>{" "}
          customers
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
