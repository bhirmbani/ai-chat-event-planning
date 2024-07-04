import useUserSession from "@/hooks/useUserSession";
import ChatModule from "@/modules/chat";

export default async function Chat() {
  const { data } = await useUserSession();
  const Component = await ChatModule({ userId: data.user?.id ?? "" });
  return Component;
}
