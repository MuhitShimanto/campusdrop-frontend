import { ComponentType, ReactNode, SVGProps } from "react";
import Link from "next/link";
import {
  ArrowRightLeft,
  LogOut,
  Menu,
  Settings,
  ShoppingBag
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LogoutButton } from "@/components/auth/logout-btn";
import SellerSidebarContent from "./seller-sidebar-content";
import { User } from "@/types/user";

const SellerSidebar = ({ children, user, hasStore }: { children: ReactNode, user: User, hasStore: boolean }) => {
  // get url
  const url = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        {/* Brand */}
        <SidebarHeader className="h-16 border-b border-sidebar-border flex justify-center items-center">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                size="lg"
                tooltip="CampusDrop"
                className="hover:bg-sidebar-accent"
              >
                <Link href="/dashboard">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                    <ShoppingBag className="size-5" strokeWidth={1.75} />
                  </span>

                  <span className="font-heading text-heading font-semibold">
                    CampusDrop
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Main navigation */}
        <SellerSidebarContent hasStore={hasStore} />

        {/* Account actions */}
        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
              
                asChild
                size="lg"
                tooltip={user.name}
                className="h-12 rounded-md mb-2 focus:text-sidebar-accent-foreground active bg-transparent cursor-default"
              >
                <Link href={`/dashboard/my-store`}>
                  <Avatar className="size-8 shrink-0">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-sidebar-primary text-xs font-medium text-sidebar-primary-foreground">
                      {user.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex min-w-0 flex-1 flex-col items-start">
                    <span className="w-full truncate text-sm font-medium">
                      {user.name}
                    </span>

                    <span className="w-full truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SellerSidebarItem
              href="/"
              icon={ArrowRightLeft}
              label="Switch to Buyer"
            />
            <SellerSidebarItem
              href="/seller/profile"
              icon={Settings}
              label="Settings"
            />
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <LogoutButton className="justify-start">
                  <LogOut />
                </LogoutButton>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Page content */}
      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center border-b border-border bg-background px-3">
          <SidebarTrigger
            className="size-9 rounded-md"
            aria-label="Toggle sidebar"
          >
            <Menu className="size-5" />
          </SidebarTrigger>

          <div className="ml-3 h-5 w-px bg-border" />

          <span className="ml-3 font-sans text-body-m font-medium text-muted-foreground">
            Seller Dashboard
          </span>
        </header>

        <main className="min-h-[calc(100vh-4rem)] bg-background p-3">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SellerSidebar;

// SELLER SIDEBAR ITEM

export function SellerSidebarItem({
  href,
  icon: Icon,
  label,
  active = false,
}: {
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
}) {
  return (
    <SidebarMenuItem className="">
      <SidebarMenuButton
        asChild
        isActive={active}
        tooltip={label}
        className={cn(
          "h-10 rounded-md",
          "font-sans text-body-m font-medium",
          "text-sidebar-foreground",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "data-[active=true]:bg-sidebar-primary/10",
          "data-[active=true]:text-sidebar-primary",
        )}
      >
        <Link href={href}>
          <Icon className="size-5" strokeWidth={1.75} />

          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
