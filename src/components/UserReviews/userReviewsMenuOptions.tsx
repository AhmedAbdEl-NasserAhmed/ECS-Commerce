"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import DeleteWindow from "@/ui/DeleteWindow/DeleteWindow";
import { useDeleteReviewMutation } from "@/lib/features/api/reviewsApi";
import ReviewEditForm from "./ReviewEditForm";
import toast from "react-hot-toast";
import Spinner from "@/ui/Spinner/Spinner";

function UserReviewsMenuOptions({ review }) {
  const [deleteReviewFn, reviewResponse] = useDeleteReviewMutation();

  function onDeleteReview() {
    deleteReviewFn({ id: review["_id"] })
      .unwrap()
      .then(() => {
        toast.success("Your Review is deleted");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={review["_id"]} />

        <Menus.List id={review["_id"]}>
          <Modal.Open opens="edit">
            <Menus.Button icon={<HiMiniPencilSquare />}>Edit</Menus.Button>
          </Modal.Open>

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
        <Modal.Window name="edit">
          <ReviewEditForm review={review} />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default UserReviewsMenuOptions;
