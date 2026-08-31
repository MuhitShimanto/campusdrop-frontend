import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Map,
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
import { PinkFadeButton, PinkPingButton } from "@/components/ui/pulse-button";

type Props = {
  params: Promise<{
    listingId: string;
  }>;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
};

const formatTime = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date(date));
};

const formatValue = (value: string) => {
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

        <h1 className="mt-4 text-lg font-medium">Listing not found</h1>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          This drop may have sold out or is no longer available.
        </p>

        <Button asChild className="mt-5">
          <Link href="/">Browse other drops</Link>
        </Button>
      </div>
    );
  }



  const now = new Date();
  const pickupStart = new Date(drop.pickup_starts_at);
  const pickupEnd = new Date(drop.pickup_ends_at);

  const pickupHasClosed = now > pickupEnd;
  const isLive = drop.status === "active";
  const canPurchase = isLive && !pickupHasClosed;

  const isPreorder = drop.listing_type === "preorder";
  const isAlwaysOn = drop.listing_type === "always_on";

  const ctaLabel = !isLive
    ? "Unavailable"
    : pickupHasClosed
      ? "Pickup closed"
      : isPreorder
        ? "Pre-Order Now"
        : isAlwaysOn
          ? "Buy Now"
          : "Unavailable";

  const availabilityNote = !isLive
    ? "This listing isn't live yet."
    : pickupHasClosed
      ? "Pickup has closed for this drop."
      : null;

  const canShowPurchaseButton = canPurchase && (isAlwaysOn || isPreorder);

  const statusLabel = !canShowPurchaseButton
    ? "Unavailable"
    : isPreorder
      ? "Preorder"
      : "Pickup open";

  const statusStyle = !canShowPurchaseButton
    ? "bg-muted text-muted-foreground"
    : isPreorder
      ? "bg-blue-500/10 text-blue-600"
      : "bg-emerald-500/10 text-emerald-600";

  return (
    <div className="mx-auto max-w-6xl my-12 px-3">
      {/* Header */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
          <Tag className="size-3.5" />
          {formatValue(drop.listing_type)}
        </span>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-2">
          {drop.name}
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        {/* Left column */}
        <div className="space-y-10">
          {/* Gallery */}
          {/* Gallery */}
<DropGallery
  images={drop.images ?? []}
  name={drop.name}
/>


          {/* Description */}
          {drop.description && (
            <div className="space-y-2 border-t pt-8">
              <h2 className="text-lg font-medium">About This Drop</h2>
              <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {drop.description}
              </p>
            </div>
          )}

          {/* Pickup details */}
          <div className="space-y-4 border-t pt-8">
            <h2 className="text-lg font-medium">Pickup Details</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              
              <BorderedBox title="Location" subtitle={drop.pickup_location}>
                <MapPin className="size-4 text-muted-foreground" />
              </BorderedBox>

              <BorderedBox title="Date" subtitle={formatDate(drop.pickup_starts_at)}>
                <CalendarDays className="size-4 text-muted-foreground" />
              </BorderedBox>

              <BorderedBox title="Time" subtitle={`${formatTime(drop.pickup_starts_at)} – ${formatTime(drop.pickup_ends_at)}`}>
                <Clock className="size-4 text-muted-foreground" />
              </BorderedBox>

              <BorderedBox title="Fulfillment" subtitle={`${formatValue(drop.fulfillment_mode)}`}>
                <Clock className="size-4 text-muted-foreground" />
              </BorderedBox>

            </div>
          </div>
        </div>

        {/* Purchase panel */}
        <div className="lg:sticky lg:top-18">
          <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
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

            <div>
              <Button className="w-full py-5 text-white">
                {ctaLabel}
              </Button>

              {availabilityNote && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {availabilityNote}
                </p>
              )}
            </div>

            <div className="space-y-3 border-t pt-5 text-sm">
              <div className="flex items-start gap-2.5">
                <Store className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                  {drop.store.slug ? (
                    <Link
                      href={`/stores/${drop.store.slug}`}
                      className="underline underline-offset-1 text-primary"
                    >
                      @{drop.store.slug}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                  {formatDate(drop.pickup_starts_at)},{" "}
                  {formatTime(drop.pickup_starts_at)} –{" "}
                  {formatTime(drop.pickup_ends_at)}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>{drop.pickup_location}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <ShoppingBag className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="capitalize">
                  {formatValue(drop.fulfillment_mode)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
