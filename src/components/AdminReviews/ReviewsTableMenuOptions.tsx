"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiEye } from "react-icons/hi2";
import { useParams, useRouter } from "next/navigation";

function ReviewsTableMenuOptions({ review }) {
  const router = useRouter();

  const { locale } = useParams();

  return 1;

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={review["_id"]} />

        <Menus.List id={review["_id"]}>
          <Menus.Button
            onClick={() => {
              router.push(
                `/${locale}/admin/dashboard/reviews/details/${review?.["_id"]}`
              );
            }}
            icon={<HiEye />}
          >
            View
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Modal>
  );
}

export default ReviewsTableMenuOptions;
