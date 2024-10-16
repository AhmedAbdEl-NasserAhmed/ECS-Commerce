"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import DeleteWindow from "@/ui/DeleteWindow/DeleteWindow";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useDeletePromocodeMutation } from "@/lib/features/api/promocodesApi";

function PromocodeTableMenuOptions({ promocode }) {
  const router = useRouter();

  const { locale } = useParams();

  const tMessage = useTranslations("messages");

  const [deletePromocode, deletePromocodeResponse] =
    useDeletePromocodeMutation();

  const onDeletePromocode = () => {
    deletePromocode(promocode["_id"])
      .unwrap()
      .then((res) => {
        toast.success(tMessage(`Your promocode has been deleted!`));
      })
      .catch((err) => {
        toast.error(tMessage("Something went wrong!"));
      });
  };

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={promocode["_id"]} />

        <Menus.List id={promocode["_id"]}>
          <Menus.Button
            icon={<HiMiniPencilSquare />}
            onClick={() => {
              router.push(
                `/${locale}/admin/dashboard/promocodes/edit/${promocode?.["_id"]}`
              );
            }}
          >
            Edit
          </Menus.Button>

          <Modal.Open opens="delete">
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window name="delete">
          <DeleteWindow
            // data={promocode}
            message="Are you sure that you want to delete this Promocode ?"
            onClick={onDeletePromocode}
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default PromocodeTableMenuOptions;
