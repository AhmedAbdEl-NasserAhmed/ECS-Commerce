import { useForm } from "react-hook-form";
import BillingInformation from "./BillingInformation";

function UserCheckout() {
  return (
    <div className="flex justify-between flex-col md:flex-row items-start md:items-stretch px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-58 mt-44 gap-10">
      <BillingInformation />
      <div className="bg-red-500 w-1/2">orders</div>
    </div>
  );
}

export default UserCheckout;
