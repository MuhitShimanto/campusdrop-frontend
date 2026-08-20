import { cn } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const Brand = () => {
  return (
    <Link
      href="/"
      aria-label="CampusDrop home"
      className={cn(
        "flex shrink-0 items-center gap-2.5 rounded-md",
        "outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "transition-opacity duration-100",
        "hover:opacity-80",
        "active:scale-[0.98]",
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-md bg-foreground text-background">
        <ShoppingBag className="size-5" strokeWidth={1.75} />
      </span>

      <span className="font-heading text-display-m font-semibold tracking-tight text-foreground">
        CampusDrop
      </span>
    </Link>
  );
}

export default Brand;