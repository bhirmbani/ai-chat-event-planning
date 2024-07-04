import { checkUserSession } from "@/services/auth";

export default async function useUserSession() {
  const { data, error } = await checkUserSession();
  return {
    data,
    error,
  };
}
