import { OrderStatusEnum } from "@/types/enums";
import styles from "./OrderStatus.module.scss";

interface IOrderStatusProps {
  status: OrderStatusEnum;
}

const OrderStatus: React.FC<IOrderStatusProps> = (props) => {
  return (
    <div
      className={`${styles["order-status"]} ${
        styles[`order-status--${props.status}`]
      }`}
    >
      {props.status}
    </div>
  );
};

export default OrderStatus;
