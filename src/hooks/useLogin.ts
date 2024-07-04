"use client";

import { signInWithEmail } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClickLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmail({
        email,
        redirectTo: `http://localhost:3001/otp?email=${email}`,
      });
      router.push(`/otp?email=${email}`);
    } catch {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return {
    onClickLogin,
    setEmail,
    email,
    loading,
  };
}
