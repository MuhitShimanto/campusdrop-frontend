import {
  AlertCircle,
  ArrowUpDown,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  Search,
  Ticket,
  UserRound,
} from "lucide-react";

const Page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Tickets
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Manage reports you’ve filed against customers for missed
          pickups and review reports filed against your store.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Open Tickets
            </p>
            <Clock3 className="size-5 text-amber-600" />
          </div>

          <p className="mt-2 text-2xl font-semibold">3</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Awaiting review
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              My Reports
            </p>
            <UserRound className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-2 text-2xl font-semibold">7</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Reports filed against customers
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Reports Against Me
            </p>
            <AlertCircle className="size-5 text-red-600" />
          </div>

          <p className="mt-2 text-2xl font-semibold">2</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Reports filed by customers
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Resolved
            </p>
            <CheckCircle2 className="size-5 text-emerald-600" />
          </div>

          <p className="mt-2 text-2xl font-semibold">12</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Tickets successfully resolved
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            placeholder="Search tickets..."
            className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          <ArrowUpDown className="size-4" />
          Filter
        </button>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Ticket className="size-4" />
          Report Customer
        </button>
      </div>

      {/* Tickets */}
      <div className="rounded-xl border bg-card">
        {/* Table header */}
        <div className="hidden grid-cols-[110px_1fr_140px_120px_120px_48px] items-center gap-4 border-b px-5 py-3 text-xs font-medium text-muted-foreground md:grid">
          <span>Type</span>
          <span>Ticket</span>
          <span>Related To</span>
          <span>Date</span>
          <span>Status</span>
          <span />
        </div>

        {/* Ticket 1 - Seller reported customer */}
        <div className="grid gap-4 px-5 py-4 md:grid-cols-[110px_1fr_140px_120px_120px_48px] md:items-center">
          <div>
            <span className="inline-flex rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-600">
              My Report
            </span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              Customer did not show up
            </p>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              Order #ORD-1001 · Customer missed scheduled pickup
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
              <span className="text-[10px] font-medium">JD</span>
            </div>

            <span className="truncate text-sm">
              John Doe
            </span>
          </div>

          <span className="text-sm text-muted-foreground">
            Aug 21, 2026
          </span>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600">
              <Clock3 className="size-3" />
              Under Review
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Ticket options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Ticket 2 - Report against seller */}
        <div className="grid gap-4 border-t px-5 py-4 md:grid-cols-[110px_1fr_140px_120px_120px_48px] md:items-center">
          <div>
            <span className="inline-flex rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600">
              Against Me
            </span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              Order was not ready for pickup
            </p>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              Order #ORD-0998 · Customer reported a delayed order
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
              <span className="text-[10px] font-medium">AS</span>
            </div>

            <span className="truncate text-sm">
              Alex Smith
            </span>
          </div>

          <span className="text-sm text-muted-foreground">
            Aug 20, 2026
          </span>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600">
              <AlertCircle className="size-3" />
              Action Required
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Ticket options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Ticket 3 - Resolved */}
        <div className="grid gap-4 border-t px-5 py-4 md:grid-cols-[110px_1fr_140px_120px_120px_48px] md:items-center">
          <div>
            <span className="inline-flex rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-600">
              My Report
            </span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              Customer failed to collect order
            </p>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              Order #ORD-0992 · Pickup deadline was missed
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
              <span className="text-[10px] font-medium">SR</span>
            </div>

            <span className="truncate text-sm">
              Sarah Rahman
            </span>
          </div>

          <span className="text-sm text-muted-foreground">
            Aug 17, 2026
          </span>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
              <CheckCircle2 className="size-3" />
              Resolved
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Ticket options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Empty state */}
        {/*
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Ticket className="size-6 text-muted-foreground" />
          </div>

          <h3 className="mt-4 font-medium">No tickets yet</h3>

          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Reports about missed pickups and reports filed against your
            store will appear here.
          </p>

          <button
            type="button"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            <Ticket className="size-4" />
            Report Customer
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
          <span className="font-medium text-foreground">19</span>{" "}
          tickets
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
