import {
  ArrowRightLeft,
  LogOut,
  Package,
  Settings,
  Ticket,
  UserRound
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getSession from "@/lib/get-session";
import MobileProfileItem from "./mobile-profile-item";

const MobileProfileNav = async () => {
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

export default MobileProfileNav