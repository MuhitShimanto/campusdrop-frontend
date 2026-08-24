"use client";
import { SidebarContent, SidebarMenu } from "@/components/ui/sidebar";
import { SellerSidebarItem } from "@/components/navbar/seller-sidebar";
import {
  LayoutDashboard,
  Package,
  Store,
  Ticket,
  Users,
  Warehouse,
} from "lucide-react";
import { usePathname } from "next/navigation";

const SellerSidebarContent = ({ hasStore }: { hasStore: boolean }) => {
  const url = usePathname();

  if (!hasStore) {
    return (
      <SidebarContent>
        <SidebarMenu>
          <SellerSidebarItem
            href="/dashboard/my-store"
            icon={Store}
            label="My Store"
            active={true}
          />
        </SidebarMenu>
      </SidebarContent>
    );
  }
  return (
    <SidebarContent>
      <SidebarMenu>
        <SellerSidebarItem
          href="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
          active={url === "/dashboard"}
        />

        <SellerSidebarItem
          href="/dashboard/my-store"
          icon={Store}
          label="My Store"
          active={url === "/dashboard/my-store"}
        />

        <SellerSidebarItem
          href="/dashboard/drops"
          icon={Store}
          label="Drops"
          active={url === "/dashboard/drops"}
        />

        <SellerSidebarItem
          href="/dashboard/orders"
          icon={Package}
          label="Orders"
          active={url === "/dashboard/orders"}
        />

        <SellerSidebarItem
          href="/dashboard/inventory"
          icon={Warehouse}
          label="Inventory"
          active={url === "/dashboard/inventory"}
        />

        <SellerSidebarItem
          href="/dashboard/customers"
          icon={Users}
          label="Customers"
          active={url === "/dashboard/customers"}
        />

        <SellerSidebarItem
          href="/dashboard/no-show-reports"
          icon={Ticket}
          label="No-Show Reports"
          active={url === "/dashboard/no-show-reports"}
        />
      </SidebarMenu>
    </SidebarContent>
  );
};

export default SellerSidebarContent;
