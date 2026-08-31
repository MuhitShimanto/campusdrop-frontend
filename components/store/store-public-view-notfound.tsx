import { Card } from "@/components/ui/card";
import { ArrowLeft, Store } from "lucide-react";
import Link from "next/link";

const StorePublicViewNotFound = () => {
  return (
    <main className="min-h-screen bg-[#faf7f2]">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5 py-10">
        <Card className="w-full max-w-md overflow-hidden border border-1 bg-background">
          <div className="flex flex-col items-center px-6 py-12 text-center">
            {/* Icon */}
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
              <Store className="size-8 text-muted-foreground" />
            </div>

            {/* Content */}
            <h1 className="mt-5 text-xl font-semibold tracking-tight">
              Store not found
            </h1>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              We couldn&apos;t find the store you&apos;re looking for. It may have been
              removed, unpublished, or the link might be incorrect.
            </p>

            {/* Action */}
            <Link
              href="/"
              className="mt-6 inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ArrowLeft className="size-4" />
              Go back
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default StorePublicViewNotFound;
