"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

function SidebarCollapseButton() {
  const { state } = useSidebar();

  return (
    <header className="absolute z-9999 -right-4 top-1/3 flex h-12 translate-x-1/2 items-center rounded-xl border border-border bg-background px-1">
      <SidebarTrigger
        className="size-9 rounded-md"
        aria-label="Toggle sidebar"
      >
        {state === "expanded" ? (
          <ChevronLeft className="size-5" />
        ) : (
          <ChevronRight className="size-5" />
        )}
      </SidebarTrigger>
    </header>
  );
}

export default SidebarCollapseButton;