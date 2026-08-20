import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowRightLeft,
  Box,
  CompassIcon,
  Home,
  LogOut,
  Package,
  Search,
  Settings,
  Store,
  Ticket,
  User,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Brand from "../shared/brand";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { headers } from "next/headers";
import { LogoutButton } from "../auth/logout-btn";


async function getSession() {
  try {
    const requestHeaders = await headers();

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/get-session`,
      {
        headers: {
          Cookie: requestHeaders.get("cookie") ?? "",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    return null;
  }
}

export async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto w-full h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Brand />

        {/* Desktop navigation */}
        <nav className="ml-10 hidden items-center gap-1 md:flex">
          <PublicNavLink href="/" active>
            Home
          </PublicNavLink>

          <PublicNavLink href="/explore">Explore</PublicNavLink>
          <PublicNavLink href="/how-it-works">How It Works</PublicNavLink>

          <PublicNavLink href="/become-a-seller">Become a Seller</PublicNavLink>
        </nav>

        {/* Desktop actions */}
        {user ? (
          <div className="hidden items-center md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="default"
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-md px-2",
                  )}
                  aria-label="Open user menu"
                >
                  <Avatar className="size-8">
                    <AvatarImage src="" alt={user.name} />
                    <AvatarFallback className="bg-muted font-sans text-body-s font-medium">
                      {user.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <span className="max-w-60 truncate">{user.name}</span>

                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  >
                    <path
                      d="m5.5 7.5 4.5 4.5 4.5-4.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-50 p-2 space-y-1.5"
              >
                <DropdownMenuLabel > 
                  <div className="flex flex-col">
                    <span className="font-sans text-body-m font-medium">
                      Account
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="px-3">
                  <Link href="/seller">
                    <ArrowRightLeft className="size-5" /> Switch to Seller
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="px-3">
                  <Link href="/profile">
                    <User className="size-5" /> Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="px-3">
                  <Link href="/orders">
                    <Box className="size-5" /> Orders
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="px-3">
                  <Link href="/settings">
                    <Settings className="size-5" /> Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="px-3">
                  {/* <Link href="/sign-out">Sign Out</Link> */}
                  <LogoutButton/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/login"
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-md px-4",
                "font-sans text-body-m font-medium text-foreground",
                "outline-none transition-colors duration-100",
                "hover:bg-muted",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "active:scale-[0.98]",
              )}
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className={cn(
                "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4",
                "bg-primary text-primary-foreground",
                "font-sans text-body-m font-semibold",
                "outline-none transition-colors duration-100",
                "hover:opacity-90",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "active:scale-[0.98]",
              )}
            >
              Get Started
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        )}

        {/* Mobile menu */}
        <MobileBottomNav />
      </div>
    </header>
  );
}

// Mobile Views

function MobileBottomNav() {
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

        {/* Drops */}
        <Link
          href="/drops"
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

async function MobileProfileNav() {
  const session = await getSession();
  const user = session?.user;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open profile"
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
          {user ? (
            <>
              <Avatar className="size-6">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="bg-muted font-sans text-[10px] font-medium">
                  {user.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <span className="max-w-16 truncate">Profile</span>
            </>
          ) : (
            <>
              <UserRound className="size-6" strokeWidth={1.75} />
              <span>Profile</span>
            </>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(360px,88vw)] border-l border-border bg-background p-0"
      >
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-3 font-sans text-heading">
            {user ? (
              <Avatar className="size-10">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="bg-muted font-sans text-body-s font-medium">
                  {user.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <span className="flex size-10 items-center justify-center rounded-full bg-muted">
                <UserRound className="size-5" strokeWidth={1.75} />
              </span>
            )}

            <div className="flex min-w-0 flex-col">
              <span className="truncate">{user ? user.name : "Profile"}</span>

              {user && (
                <span className="truncate font-sans text-body-s font-normal text-muted-foreground">
                  {user.email}
                </span>
              )}
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col p-4">
          <MobileProfileItem>
            <ArrowRightLeft className="size-5" />
            Switch to Seller
          </MobileProfileItem>

          <div className="my-3 h-px bg-border" />

          <MobileProfileItem>
            <Package className="size-5" />
            Orders
          </MobileProfileItem>

          <MobileProfileItem>
            <Ticket className="size-5" />
            Tickets
          </MobileProfileItem>

          <MobileProfileItem>
            <Settings className="size-5" />
            Settings
          </MobileProfileItem>

          <div className="my-3 h-px bg-border" />

          <MobileProfileItem destructive>
            <LogOut className="size-5" />
            Sign Out
          </MobileProfileItem>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Helper Components

function PublicNavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-10 items-center rounded-md px-3",
        "font-sans text-body-m font-medium",
        "outline-none transition-colors duration-100",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

function MobileProfileItem({
  children,
  destructive = false,
}: {
  children: React.ReactNode;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-12 w-full items-center gap-3 rounded-md px-3",
        "font-sans text-body-m font-medium",
        "text-left outline-none transition-colors duration-100",
        "hover:bg-muted",
        "focus-visible:ring-2 focus-visible:ring-ring",
        destructive && "text-destructive hover:bg-destructive/10",
      )}
    >
      {children}
    </button>
  );
}
