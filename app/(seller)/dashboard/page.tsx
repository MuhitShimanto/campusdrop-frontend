import getStore from "@/lib/get-store";
import {
  ArrowUpRight,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";

const Page = async() => {
  const store = await getStore();
  if (!store) {
    redirect("/dashboard/my-store/setup");
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Seller Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back! Here’s an overview of your store.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Sales</p>
            <TrendingUp className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-2xl font-semibold">$0.00</p>
          <p className="mt-1 text-xs text-muted-foreground">
            No sales yet
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Orders</p>
            <Package className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-2xl font-semibold">0</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Total orders
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Products</p>
            <ShoppingBag className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-2xl font-semibold">0</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Active products
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Customers</p>
            <Users className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-2xl font-semibold">0</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Total customers
          </p>
        </div>
      </div>

      {/* Getting started */}
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Get started</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Set up your store and start selling on CampusDrop.
            </p>
          </div>

          <ArrowUpRight className="size-5 text-muted-foreground" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <div className="flex size-9 items-center justify-center rounded-md bg-primary/10">
              <ShoppingBag className="size-5 text-primary" />
            </div>

            <h3 className="mt-3 font-medium">Add products</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first products to your store.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex size-9 items-center justify-center rounded-md bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>

            <h3 className="mt-3 font-medium">Manage inventory</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep track of your stock and product availability.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex size-9 items-center justify-center rounded-md bg-primary/10">
              <TrendingUp className="size-5 text-primary" />
            </div>

            <h3 className="mt-3 font-medium">Track sales</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor orders and see how your store is performing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
