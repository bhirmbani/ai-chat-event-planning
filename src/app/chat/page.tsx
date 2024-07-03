import useUserSession from "@/hooks/useUserSession";
import ChatModule from "@/modules/chat";

export default async function Chat() {
  const { data } = await useUserSession();
  return <ChatModule userId={data.user?.id as string} />;
}
