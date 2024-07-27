"use client";

import VerifyEmailAddress from "@/components/VerifyEmailAddress/VerifyEmailAddress";
import VerifyEmailAddressButton from "@/components/VerifyEmailAddress/VerifyEmailAddressButton";
import Link from "next/link";
import { useEffect, useState } from "react";

function NotActiveMessage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return (
    <div className="bg-[#f1e5cd] text-[#161616] p-7 capitalize sticky top-0 z-50 ">
      <p className="text-xl">
        We have sent an OTP to your email , please click <VerifyEmailAddress />{" "}
        to verify your email address
      </p>
    </div>
  );
}

export default NotActiveMessage;
