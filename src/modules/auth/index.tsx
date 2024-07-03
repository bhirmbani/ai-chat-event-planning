"use client";

import { LogoIcon } from "@/app/login/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import appConfig from "@/config/app";
import useLogin from "@/hooks/useLogin";
import { Loader2 } from "lucide-react";

export default function LoginModule() {
  const { onClickLogin, setEmail, email, loading } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center flex-1  bg-background">
      <div className="mb-8">
        <LogoIcon className="h-8 w-8 text-primary" />
      </div>
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome to {appConfig.name}</h1>
          <p className="text-muted-foreground">
            Sign in to start chatting with our AI assistant.
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            value={email}
            className="flex-1"
            required
          />
          <Button
            disabled={loading}
            onClick={onClickLogin}
            className="shrink-0"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
