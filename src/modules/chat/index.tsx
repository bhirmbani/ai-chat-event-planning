import ChatHistoryList from "./chat-history-list";
import ChatOutput from "./chat-output";
import StartNewChat from "./start-new-chat";

interface ChatModuleProps {
  userId: string;
}

async function ChatModule({ userId }: ChatModuleProps) {
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
            <p>0/50 messages</p>
          </fieldset>
          <fieldset className="grid gap-1 rounded-lg border p-4 min-h-[100px]">
            <legend className="-ml-1 px-3 text-xl font-bold">
              Chat History
            </legend>
            <ChatHistoryList userId={userId} />
          </fieldset>
          <StartNewChat userId={userId} />
        </div>
      </div>
      <ChatOutput />
    </main>
  );
}

export default ChatModule;
