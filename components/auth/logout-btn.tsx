"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ReactNode } from "react";

export function LogoutButton({children, className}: {children?: ReactNode, className?: string}) {
  const router = useRouter();

  async function logout() {
    await authClient.signOut();

    toast.info("Logged out successfully")
    router.refresh();
  }

  return (
    <Button variant="destructive" onClick={logout} className={`w-full flex gap-3 ${className}`}>
      {children}
      <span>Sign Out</span>
    </Button>
  );
}