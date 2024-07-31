"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import DeleteWindow from "@/ui/DeleteWindow/DeleteWindow";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDeleteSubCategoryMutation } from "@/lib/features/api/subCategoriesApi";

function SubCategoryTableMenuOptions({ subCategory }) {
  const router = useRouter();

  const { locale } = useParams();

  const [deleteSubCategory, deleteSubCategoryResponse] =
    useDeleteSubCategoryMutation();

  const onDeleteSubCategory = () => {
    deleteSubCategory(subCategory["_id"])
      .unwrap()
      .then((res) => {
        toast.success(`Your Collection has been deleted!`);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={subCategory["_id"]} />

        <Menus.List id={subCategory["_id"]}>
          <Menus.Button
            icon={<HiMiniPencilSquare />}
            onClick={() => {
              router.push(
                `/${locale}/admin/dashboard/collections/edit/${subCategory?.["_id"]}`
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
            // data={subCategory}
            message="Are you sure that you want to delete this Collection ?"
            onClick={onDeleteSubCategory}
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default SubCategoryTableMenuOptions;
