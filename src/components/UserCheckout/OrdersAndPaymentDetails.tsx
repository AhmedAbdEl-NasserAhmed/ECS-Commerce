import Orders from "./Orders";
import PaymentDetails from "./PaymentDetails";
import TermsAndConditions from "./TermsAndConditions";

interface IProps {
  setIsUserAcceptedAllPolicies: any;
}

function OrdersAndPaymentDetails(props: IProps) {
  return (
    <div className="flex flex-col gap-8 w-full lg:w-1/2">
      <Orders />
      <TermsAndConditions
        setIsUserAcceptedAllPolicies={props.setIsUserAcceptedAllPolicies}
      />
      <PaymentDetails />
    </div>
  );
}

export default OrdersAndPaymentDetails;
