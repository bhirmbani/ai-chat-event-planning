import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import appConfig from "@/config/app";

export default function Login() {
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
        <form className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1"
            required
          />
          <Button type="submit" className="shrink-0">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export function LogoIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-bot-message-square"
      {...props}
    >
      <path d="M12 6V2H8" />
      <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
      <path d="M2 12h2" />
      <path d="M9 11v2" />
      <path d="M15 11v2" />
      <path d="M20 12h2" />
    </svg>
  );
}
