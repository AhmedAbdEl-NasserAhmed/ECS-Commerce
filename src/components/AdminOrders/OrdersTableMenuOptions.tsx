"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiEye, HiMiniPencilSquare } from "react-icons/hi2";
import { useParams, useRouter } from "next/navigation";

function OrdersTableMenuOptions({ order }) {
  const router = useRouter();

  const { locale } = useParams();

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={order["_id"]} />

        <Menus.List id={order["_id"]}>
          <Menus.Button
            onClick={() => {
              router.push(
                `/${locale}/admin/dashboard/orders/details/${order?.["_id"]}`
              );
            }}
            icon={<HiEye />}
          >
            View
          </Menus.Button>
          <Menus.Button
            onClick={() => {
              router.push(
                `/${locale}/admin/dashboard/orders/edit/${order["_id"]}`
              );
            }}
            icon={<HiMiniPencilSquare />}
          >
            Edit
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Modal>
  );
}

export default OrdersTableMenuOptions;
