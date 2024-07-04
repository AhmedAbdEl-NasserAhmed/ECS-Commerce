// "use client";

// import Menus from "@/ui/Menus/Menus";
// import Modal from "@/ui/Modal/Modal";
// import { HiEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
// import ProductDetails from "./ProductDeatails/ProductDetails";
// import DeleteWindow from "@/ui/DeleteWindow/DeleteWindow";
// import ProductEdit from "./ProductEdit/ProductEdit";

// function ProductTableMenuOptions({ product }) {
//   return (
//     <Modal>
//       <Menus.Menu>
//         <Menus.Toggle id={product.id} />

//         <Menus.List id={product.id}>
//           <Modal.Open opens="view">
//             <Menus.Button icon={<HiEye />}>View</Menus.Button>
//           </Modal.Open>

//           <Modal.Open opens="edit">
//             <Menus.Button icon={<HiMiniPencilSquare />}>Edit</Menus.Button>
//           </Modal.Open>

//           <Modal.Open opens="delete">
//             <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
//           </Modal.Open>
//         </Menus.List>

//         <Modal.Window name="view">
//           <ProductDetails product={product} />
//         </Modal.Window>

//         <Modal.Window name="edit">
//           <ProductEdit product={product} />
//         </Modal.Window>

//         <Modal.Window name="delete">
//           <DeleteWindow message="Are you sure that you want to delete this Product ?" />
//         </Modal.Window>
//       </Menus.Menu>
//     </Modal>
//   );
// }

// export default ProductTableMenuOptions;
