import * as React from "react";
import Link from "next/link";
import {
  ArrowRightLeft,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Ticket,
  Users,
  Warehouse,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="border-r border-sidebar-border"
      >
        {/* Brand */}
        <SidebarHeader className="border-b border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                size="lg"
                tooltip="CampusDrop"
                className="hover:bg-sidebar-accent"
              >
                <Link href="/seller">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                    <ShoppingBag
                      className="size-5"
                      strokeWidth={1.75}
                    />
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
        <SidebarContent>
          <SidebarGroupLabel className="px-3 pb-2 pt-5 font-sans text-caption uppercase tracking-caption text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
            Manage
          </SidebarGroupLabel>

          <SidebarMenu>
            <SellerSidebarItem
              href="/seller"
              icon={LayoutDashboard}
              label="Dashboard"
              active
            />

            <SellerSidebarItem
              href="/seller/drops"
              icon={Store}
              label="Drops"
            />

            <SellerSidebarItem
              href="/seller/orders"
              icon={Package}
              label="Orders"
            />

            <SellerSidebarItem
              href="/seller/inventory"
              icon={Warehouse}
              label="Inventory"
            />

            <SellerSidebarItem
              href="/seller/customers"
              icon={Users}
              label="Customers"
            />

            <SellerSidebarItem
              href="/seller/tickets"
              icon={Ticket}
              label="Tickets"
            />
          </SidebarMenu>
        </SidebarContent>

        {/* Account actions */}
        <SidebarFooter className="border-t border-sidebar-border pt-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Switch to Buyer"
                className="text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <ArrowRightLeft
                  className="size-5"
                  strokeWidth={1.75}
                />
                <span>Switch to Buyer</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Settings"
                className="text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <Settings
                  className="size-5"
                  strokeWidth={1.75}
                />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Sign Out"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut
                  className="size-5"
                  strokeWidth={1.75}
                />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Page content */}
      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center border-b border-border bg-background px-4">
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

        <main className="min-h-[calc(100vh-4rem)] bg-background">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}

export default layout


/* ==========================================================================
   SELLER SIDEBAR ITEM
   ========================================================================== */

function SellerSidebarItem({
  href,
  icon: Icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
}) {
  return (
    <SidebarMenuItem>
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