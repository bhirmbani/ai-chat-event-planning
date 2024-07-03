"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/services/auth";
import { UserResponse } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function LogoutButton({ user }: UserResponse["data"]) {
  const router = useRouter();
  const handleLogout = () => {
    signOut({});
    router.replace("/login");
  };
  return user ? (
    <Button
      onClick={() => handleLogout()}
      variant="outline"
      size="sm"
      className="ml-auto gap-1.5 text-sm"
    >
      Logout
    </Button>
  ) : null;
}
