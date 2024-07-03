"use client";

import { LogoIcon } from "@/app/login/page";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useOtp from "@/hooks/useOtp";
import { Loader2 } from "lucide-react";

export default function OtpModule() {
  const { value, setValue, onClickOtp, loading } = useOtp();

  return (
    <div className="flex flex-col items-center justify-center flex-1  bg-background">
      <div className="mb-8">
        <LogoIcon className="h-8 w-8 text-primary" />
      </div>
      <div className="max-w-md space-y-4 flex flex-col">
        <div className="space-y-2 text-center">
          <p className="text-muted-foreground">Insert OTP sent to your email</p>
        </div>
        <div className="flex gap-2 justify-center">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button disabled={loading} onClick={onClickOtp} className="shrink-0">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </div>
    </div>
  );
}
