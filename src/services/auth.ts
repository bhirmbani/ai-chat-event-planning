import { createClient, createClientServer } from "@/config/supabase";
import { withErrorHandling } from "@/hoc/withErrorHandling";

interface SignInWithEmailProps {
  email: string;
  redirectTo: string;
}

interface CheckOtpProps extends Pick<SignInWithEmailProps, "email"> {
  token: string;
}

async function signInWithEmail({ email, redirectTo }: SignInWithEmailProps) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

async function checkUserSession() {
  const supabase = createClientServer();

  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}

async function checkOtp({ email, token }: CheckOtpProps) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    throw error;
  }

  return data;
}

async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

const signInWithEmailWithHandling = withErrorHandling(signInWithEmail);
const checkOtpWithHandling = withErrorHandling(checkOtp);
const signOutWithHandling = withErrorHandling(signOut);

export {
  signInWithEmailWithHandling as signInWithEmail,
  checkUserSession,
  checkOtpWithHandling as checkOtp,
  signOutWithHandling as signOut,
};
