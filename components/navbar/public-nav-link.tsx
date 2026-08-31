"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PublicNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-10 items-center px-3",
        "font-sans text-body-m font-medium",
        "outline-none transition-colors duration-100",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span className="relative">
        {children}

        <span
          className={cn(
            "absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-primary",
            "transition-opacity duration-200",
            active ? "opacity-100" : "opacity-0",
          )}
        />
      </span>
    </Link>
  );
};

export default PublicNavLink;
