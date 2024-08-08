import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";

import { HiEye } from "react-icons/hi2";

function UserOrdersOptions({ order }) {
  const userTranslation = useTranslations("user");

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
            {userTranslation("Details")}
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Modal>
  );
}

export default UserOrdersOptions;
