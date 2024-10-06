import { useTranslations } from "next-intl";
import { paymentMethod } from "./UserCheckout";
import { BsCashCoin } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";

interface IProps {
  setUserPaymentMethod: any;
  userPaymentMethod: paymentMethod;
}

const CashOnDelivery = (props: IProps) => {
  const userTranslation = useTranslations("user");

  return (
    <div className="p-6 bg-white shadow-md  rounded-md flex flex-col gap-8">
      <div>
        <h2 className="text-4xl font-semibold mb-5">
          {userTranslation("Select your payment method")}
        </h2>
        <span className="w-full h-1 block bg-[#ed0534] ">&nbsp;</span>
      </div>

      <div className="flex items-center relative gap-2">
        <input
          id="visa"
          name="payment-method"
          value={"visa"}
          type="radio"
          checked={props.userPaymentMethod === "visa"}
          onChange={(e) => props.setUserPaymentMethod("visa")}
        />
        <BsCreditCard fontSize={"2rem"} color="#f1c40f" className="mr-2 ml-1" />
        <label htmlFor="visa" className="text-2xl font-semibold">
          {userTranslation("Credit Card or Debit Card")}
        </label>
      </div>
      <div className="flex items-center relative gap-2">
        <input
          id="cash-on-delivery"
          name="payment-method"
          type="radio"
          value={"cash"}
          onChange={(e) => props.setUserPaymentMethod("cash")}
        />
        <BsCashCoin
          fontSize={"2rem"}
          color="#2ecc71"
          className="translate-y-[3px] mr-2 ml-1"
        />
        <label htmlFor="cash-on-delivery" className="text-2xl font-semibold">
          {userTranslation("Cash on delivery")}
        </label>
      </div>
    </div>
  );
};

export default CashOnDelivery;
