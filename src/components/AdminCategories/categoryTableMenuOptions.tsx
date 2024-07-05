"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import DeleteWindow from "@/ui/DeleteWindow/DeleteWindow";
import { useParams, useRouter } from "next/navigation";
import { useDeleteCategoryMutation } from "@/lib/features/api/categoriesApi";
import toast from "react-hot-toast";

function CategoryTableMenuOptions({ category }) {
  const router = useRouter();

  const { locale } = useParams();

  const [deleteCategory, deleteCategoryResponse] = useDeleteCategoryMutation();

  const onDeleteCategory = () => {
    deleteCategory(category["_id"])
      .unwrap()
      .then((res) => {
        toast.success(`Your category has been deleted!`);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={category["_id"]} />

        <Menus.List id={category["_id"]}>
          <Menus.Button
            onClick={() => {
              router.push(
                `/${locale}/admin/dashboard/category/details/${category?.slug}`
              );
            }}
            icon={<HiEye />}
          >
            View
          </Menus.Button>

          <Menus.Button
            icon={<HiMiniPencilSquare />}
            onClick={() => {
              router.push(
                `/${locale}/admin/dashboard/categories/edit/${category?.["_id"]}`
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
            data={category}
            message="Are you sure that you want to delete this Category ?"
            onClick={onDeleteCategory}
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default CategoryTableMenuOptions;
