"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import { useParams, useRouter } from "next/navigation";
import DeleteWindow from "@/ui/DeleteWindow/DeleteWindow";
import { useDeleteSingleProductMutation } from "@/lib/features/api/productsApi";
import { useDeleteReviewMutation } from "@/lib/features/api/reviewsApi";

function ReviewsTableMenuOptions({ review }) {
  const router = useRouter();

  const { locale } = useParams();

  const [deleteReviewFn, reviewResponse] = useDeleteReviewMutation();

  function onDeleteReview() {
    deleteReviewFn(review["_id"]);
  }

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={review["_id"]} />

        <Menus.List id={review["_id"]}>
          {/* <Menus.Button
            onClick={() => {
              router.push(
                `/${locale}/admin/dashboard/reviews/details/${review?.["_id"]}`
              );
            }}
            icon={<HiEye />}
          >
            View
          </Menus.Button> */}

          <Modal.Open opens="delete">
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Modal.Open>
        </Menus.List>
        <Modal.Window name="delete">
          <DeleteWindow
            onClick={onDeleteReview}
            disabled={reviewResponse.isLoading}
            message="Are you sure that you want to delete this Review ?"
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default ReviewsTableMenuOptions;
