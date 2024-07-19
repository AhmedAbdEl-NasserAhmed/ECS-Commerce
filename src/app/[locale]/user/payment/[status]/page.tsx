"use client";

import { useParams, usePathname } from "next/navigation";
import SuccessPayment from "./SuccessPayment";
import FailurePayment from "./FailurePayment";
import { PaymentStatus } from "@/types/enums";

function PaymentStatusPage() {
  const pathName = usePathname();

  const statusType = pathName.split("/").at(-1).includes(PaymentStatus.SUCCESS);

  switch (statusType) {
    case true:
      return <SuccessPayment />;
    case false:
      return <FailurePayment />;
  }
}

export default PaymentStatusPage;
