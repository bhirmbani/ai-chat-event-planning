import appConfig from "@/config/app";
import { LogoIcon } from "@/app/login/page";
import { UserResponse } from "@supabase/supabase-js";
import LogoutButton from "@/modules/auth/function/logout";

export default function Header({ user }: UserResponse["data"]) {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <LogoIcon className="text-primary" />
      <h1 className="text-xl font-semibold">{appConfig.name}</h1>
      <LogoutButton user={user} />
    </header>
  );
}

