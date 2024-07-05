"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import DeleteWindow from "@/ui/DeleteWindow/DeleteWindow";

function ProductTableMenuOptions({ product }) {
  console.log(product);

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={product["_id"]} />

        <Menus.List id={product["_id"]}>
          <Modal.Open opens="view">
            <Menus.Button icon={<HiEye />}>View</Menus.Button>
          </Modal.Open>

          <Modal.Open opens="edit">
            <Menus.Button icon={<HiMiniPencilSquare />}>Edit</Menus.Button>
          </Modal.Open>

          <Modal.Open opens="delete">
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Modal.Open>
        </Menus.List>

        {/* <Modal.Window name="view">
          <ProductDetails product={product} />
        </Modal.Window> */}

        {/* <Modal.Window name="edit">
          <ProductEdit product={product} />
        </Modal.Window> */}

        <Modal.Window name="delete">
          <DeleteWindow
            product={product}
            message="Are you sure that you want to delete this Product ?"
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default ProductTableMenuOptions;
