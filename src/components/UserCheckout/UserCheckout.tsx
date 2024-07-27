import { useForm } from "react-hook-form";
import BillingInformation from "./BillingInformation";
import OrdersAndPaymentDetails from "./OrdersAndPaymentDetails";

function UserCheckout() {
  return (
    <div className="flex justify-between flex-col lg:flex-row items-start  px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-58 mt-44 gap-16">
      <BillingInformation />
      <OrdersAndPaymentDetails />
    </div>
  );
}

export default UserCheckout;
