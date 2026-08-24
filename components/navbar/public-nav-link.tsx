import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

const PublicNavLink = ({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) => {
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

export default PublicNavLink