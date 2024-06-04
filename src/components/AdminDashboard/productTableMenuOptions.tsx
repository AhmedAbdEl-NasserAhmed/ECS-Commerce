"use client";

import Menus from "@/ui/Menus/Menus";
import Modal from "@/ui/Modal/Modal";
import { HiEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";

function ProductTableMenuOptions({ product }) {
  // console.log(product);

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={product.id} />

        <Menus.List id={product.id}>
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

        <Modal.Window name="view">
          <p>View</p>
        </Modal.Window>

        <Modal.Window name="edit">
          <p>edit</p>
        </Modal.Window>

        <Modal.Window name="delete">
          <p>delete</p>
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default ProductTableMenuOptions;
