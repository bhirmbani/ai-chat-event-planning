import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ChatModuleProps {
  userId: string;
}

function ChatModule({ userId }: ChatModuleProps) {
  return (
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        className="relative flex flex-col justify-end items-start gap-8 md:flex"
        x-chunk="dashboard-03-chunk-0"
      >
        <div className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-3 text-xl font-bold">
              Chat Messages
            </legend>
            <p>
              0/50 messages
            </p>
          </fieldset>
          <fieldset className="grid gap-1 rounded-lg border p-4">
            <legend className="-ml-1 px-3 text-xl font-bold">Chat History</legend>
            <div className="cursor-pointer hover:bg-secondary rounded-lg py-2 px-3">
              <p>chat one</p>
            </div>
            <div className="cursor-pointer hover:bg-secondary rounded-lg py-2 px-3">
              <p>chat two</p>
            </div>
          </fieldset>
          <Button>Start new chat</Button>
        </div>
      </div>
      {/* output */}
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 lg:col-start-2 md:col-start-2">
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
        <div className="flex-1" />
        <form
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          x-chunk="dashboard-03-chunk-1"
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeftIcon className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

function CornerDownLeftIcon(props: any) {
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
      {...props}
    >
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  );
}

export default ChatModule;
