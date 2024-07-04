import { checkOtp } from "@/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function useOtp() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const onClickOtp = async () => {
    setLoading(true);
    try {
      await checkOtp({
        email: `${email}`,
        token: value,
      });
      router.push(`/chat`);
    } catch {
      console.log("error");
      router.replace(`/login`);
    } finally {
      setLoading(false);
    }
  };

  return {
    value,
    setValue,
    onClickOtp,
    loading,
  };
}
