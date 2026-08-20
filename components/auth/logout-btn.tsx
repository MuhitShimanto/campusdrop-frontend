"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await authClient.signOut();

    toast.info("Logged out successfully")
    router.refresh();
  }

  return (
    <Button variant="destructive" onClick={logout} className="w-full">
      Sign Out
    </Button>
  );
}