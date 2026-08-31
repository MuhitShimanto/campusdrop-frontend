"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";

type ImageItem = {
  url: string;
  sort_order: number;
};

type Props = {
  images: ImageItem[];
  name: string;
};

export default function DropGallery({ images, name }: Props) {
  const sortedImages = [...images].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = sortedImages[selectedIndex];

  const goToPrevious = () => {
    setSelectedIndex((current) =>
      current === 0 ? sortedImages.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setSelectedIndex((current) =>
      current === sortedImages.length - 1 ? 0 : current + 1,
    );
  };

  if (!selectedImage) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border bg-muted">
        <Package className="size-12 text-muted-foreground" />
      </div>
    );
  }

  const hasMultipleImages = sortedImages.length > 1;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-2xl border bg-muted">
        <img
          key={selectedImage.url}
          src={selectedImage.url}
          alt={name}
          className="block h-auto w-auto max-h-[75vh] max-w-full object-contain"
        />

        {hasMultipleImages && (
          <>
            {/* Previous */}
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 shadow-sm backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 shadow-sm backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultipleImages && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {sortedImages.map((image, index) => {
            const isSelected = index === selectedIndex;

            return (
              <button
                key={`${image.url}-${image.sort_order}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={[
                  "relative aspect-square overflow-hidden rounded-lg border bg-muted transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "border-primary ring-2 ring-primary"
                    : "hover:border-foreground/40",
                ].join(" ")}
                aria-label={`View image ${index + 1}`}
                aria-pressed={isSelected}
              >
                <img
                  src={image.url}
                  alt={`${name} ${index + 1}`}
                  className="size-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}