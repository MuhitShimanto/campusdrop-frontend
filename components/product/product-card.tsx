"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

type ListingType = "preorder" | "always_on";

type ProductCardProps = {
  code?: string;
  listingType?: ListingType;
  status?: string;
  category?: string;
  title?: string;
  description?: string;
  price?: number | string;
  stock?: number;
  imageSrc: string;
  pickupLocation?: string;
  pickupStartsAt?: string;
  pickupEndsAt?: string;
  orderStartTime?: string;
  orderEndTime?: string;
  estimatedDeliveryDays?: number;
  onClaim?: () => void;
};

const DEFAULT_IMAGE =
  "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg";

const formatDate = (date?: string) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
};

const formatPrice = (price?: number | string) => {
  const numericPrice = Number(price ?? 0);

  return numericPrice.toFixed(2);
};

const getSecondsUntil = (date?: string) => {
  if (!date) return 0;

  return Math.max(
    Math.floor((new Date(date).getTime() - Date.now()) / 1000),
    0,
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  code = "#DRP-042",
  listingType = "preorder",
  status = "active",
  category = "FOOD",
  title = "Midnight Cookies Co.",
  description = "Fresh batch of sea salt chocolate chip.",
  price = 4.5,
  stock,
  imageSrc = DEFAULT_IMAGE,
  pickupLocation,
  pickupStartsAt,
  pickupEndsAt,
  orderStartTime,
  orderEndTime,
  estimatedDeliveryDays,
  onClaim,
}) => {
  /*
   * Preorder listings close when order_end_time is reached.
   *
   * Always-on listings don't have an order_end_time, so their
   * availability is based on their pickup window instead.
   */
  const expirationDate =
    listingType === "preorder" ? orderEndTime : pickupEndsAt;

  const [timeLeft, setTimeLeft] = useState(() =>
    getSecondsUntil(expirationDate),
  );

  useEffect(() => {
    setTimeLeft(getSecondsUntil(expirationDate));

    if (!expirationDate) return;

    const timer = setInterval(() => {
      setTimeLeft(getSecondsUntil(expirationDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationDate]);

  const formattedTime = useMemo(() => {
    const days = Math.floor(timeLeft / (60 * 60 * 24));
    const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    if (days > 0) {
      return `${days}D ${hours}H`;
    }

    if (hours > 0) {
      return `${hours}H ${minutes.toString().padStart(2, "0")}M`;
    }

    return `${minutes}M ${seconds.toString().padStart(2, "0")}S`;
  }, [timeLeft]);

  const isPreorder = listingType === "preorder";
  const isClosed = timeLeft <= 0 || status !== "active";
  const isOutOfStock = stock !== undefined && stock <= 0;

  const headerLabel = isClosed
    ? "CLOSED"
    : isPreorder
      ? `ORDER BY ${formattedTime}`
      : `AVAILABLE ${formattedTime}`;

  const cta = isPreorder ? "PREORDER NOW" : "CLAIM NOW";

  const pickupText =
    pickupStartsAt && pickupEndsAt
      ? `${formatDate(pickupStartsAt)} – ${formatDate(pickupEndsAt)}`
      : pickupStartsAt
        ? formatDate(pickupStartsAt)
        : "Pickup details unavailable";

  return (
    <article className="w-full max-w-70 overflow-hidden border border-ink-150 bg-paper-0 font-sans text-foreground shadow-[0_1px_0_rgba(0,0,0,0.03)] transition duration-200 hover:-translate-y-0.5 hover:border-ink-300">
      {/* Top bar */}
      <header className="flex min-h-15.25 items-center justify-between gap-3 border-b border-ink-150 px-4">
        <span
          className={`px-2.25 py-1.25 text-caption font-bold tracking-[0.02em] ${
            isClosed
              ? "bg-ink-300 text-paper-0"
              : isPreorder
                ? "bg-rust-600 text-paper-0"
                : "bg-marigold-600 text-ink-900"
          }`}
        >
          {headerLabel}
        </span>

        <span className="shrink-0 font-mono text-mono tracking-[0.08em] text-ink-700">
          {code}
        </span>
      </header>

      {/* Product image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="280px"
          className="object-cover mix-blend-multiply"
        />
      </div>

      {/* Content */}
      <section className="relative border-t border-ink-150 bg-card px-6 pb-6 pt-6">
        <span className="absolute -left-1.5 top-3.25 h-3 w-3 rounded-full bg-paper-0" />

        {/* Listing type */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-caption font-bold tracking-caption text-marigold-600">
            {category}
          </span>

          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">
            • {isPreorder ? "PREORDER" : "ALWAYS ON"}
          </span>
        </div>

        <h2 className="text-heading font-semibold leading-tight tracking-[-0.02em] line-clamp-1">
          {title}
        </h2>

        <p className="min-h-12 mt-2 line-clamp-2 text-body-m leading-[1.65] text-muted-foreground">
          {description}
        </p>

        {/* Pickup information */}
        {/* <div className="mt-5 border-l-2 border-marigold-600 pl-3">
          <p className="text-caption font-bold tracking-caption text-ink-700">
            PICKUP
          </p>

          <p className="mt-1 text-body-m font-medium text-ink-900">
            {pickupLocation || "Pickup location unavailable"}
          </p>

          <p className="mt-0.5 text-caption text-muted-foreground">
            {pickupText}
          </p>

          {estimatedDeliveryDays !== undefined && (
            <p className="mt-1 text-caption text-muted-foreground">
              Estimated delivery: {estimatedDeliveryDays} day
              {estimatedDeliveryDays !== 1 ? "s" : ""}
            </p>
          )}
        </div> */}

        {/* Preorder order window */}
        {/* {isPreorder && orderStartTime && orderEndTime && (
          <div className="mt-4">
            <p className="text-caption font-bold tracking-caption text-ink-700">
              ORDER WINDOW
            </p>

            <p className="mt-1 text-caption text-muted-foreground">
              {formatDate(orderStartTime)} – {formatDate(orderEndTime)}
            </p>
          </div>
        )} */}

        <div className="my-6 border-t border-dashed border-ink-150" />

        {/* Price / stock */}
        <div className="flex items-end justify-between border-l-3 border-marigold-600 pl-3">
          <div>
            <p className="text-caption font-bold tracking-caption text-ink-700">
              PRICE
            </p>

            <p className="mt-1 font-mono text-[25px] font-bold leading-none text-ink-900">
              BDT {formatPrice(price)}
            </p>
          </div>

          {stock !== undefined && (
            <div className="text-right">
              <p className="text-caption font-bold tracking-caption text-ink-700">
                STOCK
              </p>

              <p
                className={`mt-1 font-mono text-mono font-bold leading-none ${
                  stock > 0 ? "text-rust-600" : "text-ink-400"
                }`}
              >
                {stock > 0 ? `${stock} LEFT` : "SOLD OUT"}
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onClaim}
          disabled={isClosed || isOutOfStock}
          className="mt-5 h-9 w-full bg-ink-900 text-caption font-bold tracking-widest text-paper-0 transition-colors hover:bg-ink-700 active:bg-ink-900 disabled:cursor-not-allowed disabled:bg-ink-300"
        >
          {isClosed
            ? "CLOSED"
            : isOutOfStock
              ? "SOLD OUT"
              : cta}
        </button>
      </section>
    </article>
  );
};

export default ProductCard;
