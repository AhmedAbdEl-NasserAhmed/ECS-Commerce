import { OrderStatusEnum } from "@/types/enums";
import styles from "./OrderStatus.module.scss";
import { useTranslations } from "next-intl";

interface IOrderStatusProps {
  status: OrderStatusEnum;
}

const OrderStatus: React.FC<IOrderStatusProps> = (props) => {
  const userTranslation = useTranslations("user");

  return (
    <div
      className={`${styles["order-status"]} ${
        styles[`order-status--${props.status}`]
      }`}
    >
      {userTranslation(props.status)}
    </div>
  );
};

export default OrderStatus;
