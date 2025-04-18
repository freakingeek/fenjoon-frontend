import { otpRequest, verifyOtp } from "./functions";
import { ACCOUNTS_QUERY_KEYS } from "./constants";
import { useMutation } from "@tanstack/react-query";
import type { VerifyOtp, OtpRequest } from "./types";

export function useOtpRequest(options?: { onSuccess: (response: OtpRequest) => void }) {
  return useMutation({
    mutationKey: [ACCOUNTS_QUERY_KEYS.OTP_REQUEST],
    mutationFn: otpRequest,
    ...options,
  });
}

export function useVerifyOtp(options?: { onSuccess: (response: VerifyOtp) => void }) {
  return useMutation({
    mutationKey: [ACCOUNTS_QUERY_KEYS.LOGIN],
    mutationFn: verifyOtp,
    ...options,
  });
}
