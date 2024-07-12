import Orders from "./Orders";
import PaymentDetails from "./PaymentDetails";

function OrdersAndPaymentDetails() {
  return (
    <div className="flex flex-col gap-8 w-full  md:w-1/2">
      <Orders />
      <PaymentDetails />
    </div>
  );
}

export default OrdersAndPaymentDetails;
