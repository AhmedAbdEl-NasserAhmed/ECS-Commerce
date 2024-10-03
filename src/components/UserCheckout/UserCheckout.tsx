"use client";

import { useForm } from "react-hook-form";
import BillingInformation from "./BillingInformation";
import OrdersAndPaymentDetails from "./OrdersAndPaymentDetails";
import { useState } from "react";

function UserCheckout() {
  const [isUserAcceptedAllPolicies, setIsUserAcceptedAllPolicies] =
    useState(false);
  return (
    <div className="flex justify-between flex-col lg:flex-row items-start  px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-58 my-44 gap-16">
      <BillingInformation
        isUserAcceptedAllPolicies={isUserAcceptedAllPolicies}
      />
      <OrdersAndPaymentDetails
        setIsUserAcceptedAllPolicies={setIsUserAcceptedAllPolicies}
      />
    </div>
  );
}

export default UserCheckout;
