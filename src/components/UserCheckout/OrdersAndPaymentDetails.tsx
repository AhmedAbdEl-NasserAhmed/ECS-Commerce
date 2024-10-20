import CashOnDelivery from "./CashOnDelivery";
import Orders from "./Orders";
import PaymentDetails from "./PaymentDetails";
import TermsAndConditions from "./TermsAndConditions";
import { paymentMethod } from "./UserCheckout";

interface IProps {
  setIsUserAcceptedAllPolicies: any;
  setUserPaymentMethod: any;
  userPaymentMethod: paymentMethod;
  setEnteredPromocode: any;
  enteredPromocode: any;
}

function OrdersAndPaymentDetails(props: IProps) {
  return (
    <div className="flex flex-col gap-8 w-full lg:w-1/2">
      <Orders enteredPromocode={props.enteredPromocode} />
      <TermsAndConditions
        setIsUserAcceptedAllPolicies={props.setIsUserAcceptedAllPolicies}
      />
      <CashOnDelivery
        userPaymentMethod={props.userPaymentMethod}
        setUserPaymentMethod={props.setUserPaymentMethod}
        setEnteredPromocode={props.setEnteredPromocode}
      />
      <PaymentDetails />
    </div>
  );
}

export default OrdersAndPaymentDetails;
