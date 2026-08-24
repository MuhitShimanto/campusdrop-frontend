import Link from "next/link";
import {
  CompassIcon,
  Home,
  Search,
  Store,
} from "lucide-react";

import { cn } from "@/lib/utils";
import MobileProfileNav from "./mobile-profile-nav";

const MobileBottomNav = () => {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 md:hidden",
        "border-t border-border bg-background",
        "pb-[env(safe-area-inset-bottom)]",
      )}
      aria-label="Primary navigation"
    >
      <div className="mx-auto grid h-16 max-w-md grid-cols-5">
        {/* Discover */}
        <Link
          href="/"
          className={cn(
            "relative flex flex-col items-center justify-center gap-1",
            "font-sans text-body-s font-medium",
            "text-foreground",
            "outline-none transition-colors duration-100",
            "focus-visible:bg-muted",
            "active:scale-[0.98]",
          )}
        >
          <Home className="size-6" strokeWidth={1.75} />
          <span>Home</span>

          <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" />
        </Link>

        {/* Explore */}
        <Link
          href="/explore"
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            "font-sans text-body-s font-medium",
            "text-muted-foreground",
            "outline-none transition-colors duration-100",
            "hover:text-foreground",
            "focus-visible:bg-muted",
            "active:scale-[0.98]",
          )}
        >
          <CompassIcon className="size-6" strokeWidth={1.75} />
          <span>Explore</span>
        </Link>

        {/* Search */}
        <Link
          href="/search"
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            "font-sans text-body-s font-medium",
            "text-muted-foreground",
            "outline-none transition-colors duration-100",
            "hover:text-foreground",
            "focus-visible:bg-muted",
            "active:scale-[0.98]",
          )}
        >
          <Search className="size-6" strokeWidth={1.75} />
          <span>Search</span>
        </Link>

        {/* Stores */}
        <Link
          href="/stores"
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            "font-sans text-body-s font-medium",
            "text-muted-foreground",
            "outline-none transition-colors duration-100",
            "hover:text-foreground",
            "focus-visible:bg-muted",
            "active:scale-[0.98]",
          )}
        >
          <Store className="size-6" strokeWidth={1.75} />
          <span>Stores</span>
        </Link>

        {/* Profile */}
        <MobileProfileNav />
      </div>
    </nav>
  );
}

export default MobileBottomNav