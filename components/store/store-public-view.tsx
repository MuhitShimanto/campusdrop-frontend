import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { StorePublicViewData } from "@/types/store";
import { Check } from "lucide-react";
import Image from "next/image";

const StorePublicView = ({ store, user }: StorePublicViewData) => {
  // Avatar Fallback
  const storeInitials = store.name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Avatar Fallback
  const userInitials = user.name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="container min-h-screen bg-[#faf7f2]">
      <div className="mx-auto max-w-6xl px-5 py-6">
        <Card className="overflow-hidden border bg-card shadow-none py-0">
          {/* Cover */}
          <div className="relative h-40 bg-muted">
            <Image
              src={store.cover}
              alt={`${store.name} cover`}
              loading="eager"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
          </div>

          {/* Store header */}
          <div className="relative px-4 pb-6 sm:px-6">
            <div className="-mt-12 flex flex-col gap-4 rounded-md border bg-background/10 p-2 backdrop-blur-xs sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4 ">
                {/* Store avatar */}
                <Avatar className="group relative size-20 shrink-0 rounded-xl border-4 border-card bg-primary text-primary-foreground shadow-sm">
                  <AvatarImage
                    src={store.avatar}
                    alt={store.name}
                    className="size-full object-cover"
                  />
                  <AvatarFallback className="rounded-xl text-lg font-semibold">
                    {storeInitials}
                  </AvatarFallback>
                </Avatar>

                {/* Store name + slug */}
                <div className="min-w-0 pb-1">
                  <div className="flex items-center gap-2">
                    <h1 className="truncate text-xl font-semibold">
                      {store.name || "Untitled store"}
                    </h1>

                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-600">
                      <Check className="size-3" />
                      Active
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    @{store.slug || "your-handle"}
                  </p>
                </div>
              </div>
            </div>

            {/* 2 column*/}
            <div className="mt-2 grid grid-cols-6 gap-3">
              <div className="col-span-4 p-4 max-w-3xl">
                {store.description ? (
                  <p className="text-sm leading-6 text-[#333]">
                    {store.description}
                  </p>
                ) : (
                  <p className="mt-4 text-sm italic text-muted-foreground">
                    No description yet — customers will see this space blank.
                  </p>
                )}
              </div>
              {/* Other info */}
              <div className="col-span-2 p-4 border border-muted-foreground/10 rounded-md">
                <div className="flex flex-col gap-2 justify-center text-sm text-muted-foreground">
                  <span>Owner Details</span>

                  <div className="flex gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={user.avatar}
                        alt={user.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-[10px]">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">
                      {user.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default StorePublicView;
