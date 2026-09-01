import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  Package,
  ShoppingBag,
  Store,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { fetchSingleDrop } from "@/api/drops/fetchSingleDrop";
import BorderedBox from "@/components/ui/bordered-box";
import DropGallery from "@/components/drop/DropGallery";

type Props = {
  params: Promise<{
    listingId: string;
  }>;
};

const formatDate = (date?: string | null) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(parsedDate);
};

const formatTime = (date?: string | null) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(parsedDate);
};

const formatValue = (value?: string | null) => {
  if (!value) return "N/A";

  return value.replace(/_/g, " ");
};

const Page = async ({ params }: Props) => {
  const { listingId } = await params;

  let drop = null;

  try {
    drop = await fetchSingleDrop(listingId);
  } catch (error) {
    console.error("Failed to fetch listing:", error);
  }

  if (!drop) {
    return (
      <div className="mx-auto my-12 flex max-w-6xl flex-col items-center justify-center rounded-xl border bg-card px-6 py-24 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <Package className="size-6 text-muted-foreground" />
        </div>

        <h1 className="mt-4 text-lg font-medium">
          Listing not found
        </h1>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          This drop may have sold out or is no longer available.
        </p>

        <Button asChild className="mt-5">
          <Link href="/">Browse other drops</Link>
        </Button>
      </div>
    );
  }

  /*
   * ------------------------------------------------------------
   * Listing state
   * ------------------------------------------------------------
   */

  const isPreorder = drop.listing_type === "preorder";
  const isAlwaysOn = drop.listing_type === "always_on";
  const isLive = drop.status === "active";

  /*
   * IMPORTANT:
   *
   * Preorder availability is determined ONLY by order_end_time.
   *
   * pickup_ends_at does NOT affect whether a preorder can be
   * purchased.
   */

  const now = Date.now();

  const orderEndTimestamp = drop.order_end_time
    ? new Date(drop.order_end_time).getTime()
    : null;

  const pickupEndTimestamp = drop.pickup_ends_at
    ? new Date(drop.pickup_ends_at).getTime()
    : null;

  const validOrderEndTimestamp =
    orderEndTimestamp !== null &&
    !Number.isNaN(orderEndTimestamp);

  const validPickupEndTimestamp =
    pickupEndTimestamp !== null &&
    !Number.isNaN(pickupEndTimestamp);

  /*
   * PREORDER
   *
   * If order_end_time has passed, preorder is closed.
   */
  const preorderHasClosed =
    isPreorder &&
    validOrderEndTimestamp &&
    now >= orderEndTimestamp;

  /*
   * ALWAYS ON
   *
   * Always-on listings use pickup_ends_at.
   */
  const pickupHasClosed =
    isAlwaysOn &&
    validPickupEndTimestamp &&
    now >= pickupEndTimestamp;

  /*
   * Purchase is allowed only when:
   *
   * 1. Listing is active
   * 2. Preorder -> order_end_time has NOT passed
   * 3. Always-on -> pickup_ends_at has NOT passed
   */
  const canPurchase =
    isLive &&
    (isPreorder
      ? !preorderHasClosed
      : isAlwaysOn
        ? !pickupHasClosed
        : false);

  /*
   * ------------------------------------------------------------
   * CTA
   * ------------------------------------------------------------
   */

  const ctaLabel = !isLive
    ? "Unavailable"
    : preorderHasClosed
      ? "Preorder closed"
      : pickupHasClosed
        ? "Pickup closed"
        : isPreorder
          ? "Pre-Order Now"
          : isAlwaysOn
            ? "Buy Now"
            : "Unavailable";

  /*
   * ------------------------------------------------------------
   * Availability warning
   * ------------------------------------------------------------
   */

  const availabilityNote = !isLive
    ? "This listing isn't live yet."
    : preorderHasClosed
      ? `The preorder window ended on ${formatDate(
          drop.order_end_time,
        )}.`
      : pickupHasClosed
        ? "Pickup has closed for this drop."
        : null;

  /*
   * ------------------------------------------------------------
   * Status badge
   * ------------------------------------------------------------
   */

  const statusLabel = !canPurchase
    ? "Unavailable"
    : isPreorder
      ? "Preorder"
      : "Pickup open";

  const statusStyle = !canPurchase
    ? "bg-muted text-muted-foreground"
    : isPreorder
      ? "bg-blue-500/10 text-blue-600"
      : "bg-emerald-500/10 text-emerald-600";

  return (
    <div className="mx-auto my-12 max-w-6xl px-3">
      {/* Header */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
          <Tag className="size-3.5" />
          {formatValue(drop.listing_type)}
        </span>

        <h1 className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {drop.name}
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        {/* =====================================================
            LEFT COLUMN
        ====================================================== */}

        <div className="space-y-10">
          {/* Gallery */}
          <DropGallery
            images={drop.images ?? []}
            name={drop.name}
          />

          {/* Description */}
          {drop.description && (
            <div className="space-y-2 border-t pt-8">
              <h2 className="text-lg font-medium">
                About This Drop
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {drop.description}
              </p>
            </div>
          )}

          {/* Pickup details */}
          <div className="space-y-4 border-t pt-8">
            <h2 className="text-lg font-medium">
              Pickup Details
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <BorderedBox
                title="Location"
                subtitle={drop.pickup_location}
              >
                <MapPin className="size-4 text-muted-foreground" />
              </BorderedBox>

              <BorderedBox
                title="Date"
                subtitle={formatDate(drop.pickup_starts_at)}
              >
                <CalendarDays className="size-4 text-muted-foreground" />
              </BorderedBox>

              <BorderedBox
                title="Time"
                subtitle={`${formatTime(
                  drop.pickup_starts_at,
                )} – ${formatTime(drop.pickup_ends_at)}`}
              >
                <Clock className="size-4 text-muted-foreground" />
              </BorderedBox>

              <BorderedBox
                title="Fulfillment"
                subtitle={formatValue(drop.fulfillment_mode)}
              >
                <ShoppingBag className="size-4 text-muted-foreground" />
              </BorderedBox>
            </div>
          </div>
        </div>

        {/* =====================================================
            PURCHASE PANEL
        ====================================================== */}

        <div className="lg:sticky lg:top-18">
          <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
            {/* Price + status */}
            <div className="flex items-start justify-between gap-3">
              <p className="text-3xl font-semibold">
                BDT {Number(drop.price).toFixed(2)}
              </p>

              <span
                className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle}`}
              >
                {statusLabel}
              </span>
            </div>

            {/* Purchase CTA */}
            <div>
              <Button
                type="button"
                disabled={!canPurchase}
                className="w-full py-5 text-white"
              >
                {ctaLabel}
              </Button>

              {/* Warning / availability message */}
              {availabilityNote && (
                <div
                  className={`mt-3 rounded-lg border px-3 py-2.5 text-center ${
                    preorderHasClosed
                      ? "border-red-200 bg-red-50"
                      : "border-border bg-muted/50"
                  }`}
                >
                  <p
                    className={`text-xs ${
                      preorderHasClosed
                        ? "font-medium text-red-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {availabilityNote}
                  </p>
                </div>
              )}
            </div>

            {/* Listing information */}
            <div className="space-y-3 border-t pt-5 text-sm">
              {/* Store */}
              <div className="flex items-start gap-2.5">
                <Store className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <span>
                  {drop.store?.slug ? (
                    <Link
                      href={`/stores/${drop.store.slug}`}
                      className="text-primary underline underline-offset-1"
                    >
                      @{drop.store.slug}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>

              {/* Pickup date/time */}
              <div className="flex items-start gap-2.5">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <span>
                  {formatDate(drop.pickup_starts_at)},{" "}
                  {formatTime(drop.pickup_starts_at)} –{" "}
                  {formatTime(drop.pickup_ends_at)}
                </span>
              </div>

              {/* Pickup location */}
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <span>{drop.pickup_location}</span>
              </div>

              {/* Fulfillment */}
              <div className="flex items-start gap-2.5">
                <ShoppingBag className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <span className="capitalize">
                  {formatValue(drop.fulfillment_mode)}
                </span>
              </div>

              {/* Preorder window */}
              {isPreorder &&
                drop.order_start_time &&
                drop.order_end_time && (
                  <div className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <span>
                      Preorder:{" "}
                      {formatDate(drop.order_start_time)} –{" "}
                      {formatDate(drop.order_end_time)}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
