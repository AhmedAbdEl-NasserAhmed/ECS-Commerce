"use client";

import { useForm } from "react-hook-form";
import BillingInformation from "./BillingInformation";
import OrdersAndPaymentDetails from "./OrdersAndPaymentDetails";
import { useState } from "react";

export type paymentMethod = "visa" | "cash";

function UserCheckout() {
  const [isUserAcceptedAllPolicies, setIsUserAcceptedAllPolicies] =
    useState(false);
  const [userPaymentMethod, setUserPaymentMethod] =
    useState<paymentMethod>("visa");
  const [enteredPromocode, setEnteredPromocode] = useState(null);
  return (
    <div className="flex justify-between flex-col lg:flex-row items-start  px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-58 my-44 gap-16">
      <BillingInformation
        isUserAcceptedAllPolicies={isUserAcceptedAllPolicies}
        userPaymentMethod={userPaymentMethod}
        enteredPromocode={enteredPromocode}
      />
      <OrdersAndPaymentDetails
        enteredPromocode={enteredPromocode}
        userPaymentMethod={userPaymentMethod}
        setIsUserAcceptedAllPolicies={setIsUserAcceptedAllPolicies}
        setUserPaymentMethod={setUserPaymentMethod}
        setEnteredPromocode={setEnteredPromocode}
      />
    </div>
  );
}

export default UserCheckout;
