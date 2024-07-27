import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { useParams, useRouter } from "next/navigation";

import { HiEye } from "react-icons/hi2";

function UserOrdersOptions({ order }) {
  const { push } = useRouter();

  const { locale } = useParams();

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={order["_id"]} />

        <Menus.List id={order["_id"]}>
          <Menus.Button
            onClick={() => {
              push(`/${locale}/user/profile/${order["_id"]}`);
            }}
            icon={<HiEye />}
          >
            Details
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Modal>
  );
}

export default UserOrdersOptions;
