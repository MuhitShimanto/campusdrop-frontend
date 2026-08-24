"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

type ProductCardProps = {
  code?: string;
  expiresIn?: number; // seconds
  category?: string;
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageSrc: string;
  onClaim?: () => void;
};

const cta = "PREORDER NOW";

const ProductCard: React.FC<ProductCardProps> = ({
  code = "#DRP-042",
  expiresIn = 40 * 60, // 40 minutes
  category = "FOOD",
  title = "Midnight Cookies Co.",
  description = "Fresh batch of sea salt chocolate chip. Will deliver to lorem ipsum dolor sit amet consectetur adipisicing elit.",
  price = 4.5,
  stock = 12,
  imageSrc = "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
  onClaim,
}) => {
  const [timeLeft, setTimeLeft] = useState(expiresIn);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes}M ${seconds
    .toString()
    .padStart(2, "0")}S`;

  return (
    <article className="w-full max-w-70 overflow-hidden border border-ink-150 bg-paper-0 font-sans text-foreground shadow-[0_1px_0_rgba(0,0,0,0.03)] transition duration-200 hover:-translate-y-0.5 hover:border-ink-300">
      {/* Top bar */}
      <header className="flex h-15.25 items-center justify-between border-b border-ink-150 px-4">
        <span className="bg-rust-600 px-2.25 py-1.25 text-caption font-bold tracking-[0.02em] text-paper-0">
          {timeLeft > 0 ? `CLOSES IN ${formattedTime}` : "CLOSED"}
        </span>

        <span className="font-mono text-mono tracking-[0.08em] text-ink-700">
          {code}
        </span>
      </header>

      {/* Product image */}
      <Image
        src={imageSrc}
        alt={title}
        width={500}
        height={500}
        className="relative z-10 h-full w-full object-cover mix-blend-multiply"
      />

      {/* Content */}
      <section className="relative border-t border-ink-150 bg-card px-6 pb-6 pt-6">
        <span className="absolute -left-1.5 top-3.25 h-3 w-3 rounded-full bg-paper-0" />

        <p className="mb-1 text-caption font-bold tracking-caption text-marigold-600">
          {category}
        </p>

        <h2 className="text-heading font-semibold leading-tight tracking-[-0.02em]">
          {title}
        </h2>

        <p className="mt-2 line-clamp-2 text-body-m leading-[1.65] text-muted-foreground">
          {description}
        </p>

        <div className="my-6 border-t border-dashed border-ink-150" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-caption font-bold tracking-caption text-ink-700">
              PRICE
            </p>

            <p className="mt-1 font-mono text-[25px] font-bold leading-none text-ink-900">
              ${price.toFixed(2)}
            </p>
          </div>

          {stock && <div className="text-right">
            <p className="text-caption font-bold tracking-caption text-ink-700">
              STOCK
            </p>

            <p className="mt-1 font-mono text-mono font-bold leading-none text-rust-600">
              {stock} LEFT
            </p>
          </div>}
        </div>

        <button
          type="button"
          onClick={onClaim}
          disabled={stock <= 0 || timeLeft <= 0}
          className="mt-5 h-9 w-full bg-ink-900 text-caption font-bold tracking-widest text-paper-0 transition-colors hover:bg-ink-700 active:bg-ink-900 disabled:cursor-not-allowed disabled:bg-ink-300"
        >
          {timeLeft <= 0 ? "CLOSED" : cta}
        </button>
      </section>
    </article>
  );
};

export default ProductCard;
