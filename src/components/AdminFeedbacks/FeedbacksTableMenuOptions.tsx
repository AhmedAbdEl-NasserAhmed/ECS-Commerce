"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiTrash } from "react-icons/hi2";
import { useParams, useRouter } from "next/navigation";
import DeleteWindow from "@/ui/DeleteWindow/DeleteWindow";
import { useDeleteReviewMutation } from "@/lib/features/api/reviewsApi";

function FeedbacksTableMenuOptions({ feedback }) {
  const [deleteFeedbackFn, feedbackResponse] = useDeleteReviewMutation();

  function onDeleteFeedback() {
    deleteFeedbackFn(feedback["_id"]);
  }

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={feedback["_id"]} />

        <Menus.List id={feedback["_id"]}>
          {/* <Menus.Button
            onClick={() => {
              router.push(
                `/${locale}/admin/dashboard/feedbacks/details/${feedback?.["_id"]}`
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
            onClick={onDeleteFeedback}
            disabled={feedbackResponse.isLoading}
            message="Are you sure that you want to delete this feedback ?"
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default FeedbacksTableMenuOptions;
