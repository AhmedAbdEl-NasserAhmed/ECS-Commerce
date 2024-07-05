"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import DeleteWindow from "@/ui/DeleteWindow/DeleteWindow";
import { useParams, useRouter } from "next/navigation";
import { useDeleteSingleProductMutation } from "@/lib/features/api/productsApi";

function ProductTableMenuOptions({ product }) {
  const router = useRouter();

  const { locale } = useParams();

  const [deleteProdcutFn, productResponse] = useDeleteSingleProductMutation();

  function onDeleteProduct() {
    deleteProdcutFn(product["_id"]);
  }

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={product["_id"]} />

        <Menus.List id={product["_id"]}>
          <Menus.Button
            onClick={() => {
              router.push(
                `/${locale}/admin/dashboard/products/details/${product?.slug}`
              );
            }}
            icon={<HiEye />}
          >
            View
          </Menus.Button>

          <Modal.Open opens="edit">
            <Menus.Button icon={<HiMiniPencilSquare />}>Edit</Menus.Button>
          </Modal.Open>

          <Modal.Open opens="delete">
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window name="delete">
          <DeleteWindow
            onClick={onDeleteProduct}
            disabled={productResponse.isLoading}
            message="Are you sure that you want to delete this Product ?"
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default ProductTableMenuOptions;
