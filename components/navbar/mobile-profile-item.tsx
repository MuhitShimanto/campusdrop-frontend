import { cn } from "@/lib/utils";

function MobileProfileItem({
  children,
  destructive = false,
}: {
  children: React.ReactNode;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-12 w-full items-center gap-3 rounded-md px-3",
        "font-sans text-body-m font-medium",
        "text-left outline-none transition-colors duration-100",
        "hover:bg-muted",
        "focus-visible:ring-2 focus-visible:ring-ring",
        destructive && "text-destructive hover:bg-destructive/10",
      )}
    >
      {children}
    </button>
  );
}

export default MobileProfileItem;