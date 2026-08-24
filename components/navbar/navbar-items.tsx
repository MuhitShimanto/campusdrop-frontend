import Link from "next/link";
import {
  ArrowRight,
  ArrowRightLeft,
  Box,
  LogOut,
  Settings,
  User2,
} from "lucide-react";

import { cn } from "@/lib/utils";
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
import { LogoutButton } from "../auth/logout-btn";
import PublicNavLink from "./public-nav-link";
import MobileBottomNav from "./mobile-bottom-nav";
import { User } from "@/types/user";

const NavbarItems = ({user}: {user: User}) => {
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

          <PublicNavLink href="/explore" >Explore</PublicNavLink>
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
                  <Link href="/dashboard">
                    <ArrowRightLeft className="size-5" /> Switch to Seller
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="px-3">
                  <Link href="/profile">
                    <User2 className="size-5" /> Profile
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
                  <LogoutButton className="justify-start" ><LogOut/></LogoutButton>
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

export default NavbarItems