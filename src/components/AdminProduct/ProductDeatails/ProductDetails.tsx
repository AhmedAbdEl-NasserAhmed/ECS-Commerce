import { AdminProductProps } from "@/types/types";

interface Props {
  product: AdminProductProps;
  setShowModal?: () => void;
}

function ProductDetails({ product, setShowModal }: Props) {
  return (
    <div>hello</div>
    // <Box className={styles["product-details"]}>
    //   <h2 className="text-white text-center bg-gray-600 p-2 md:p-3 lg:p-4 rounded-md font-bold  text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-3xl  tracking-wide ">
    //     Details
    //   </h2>
    //   <Box className="flex  md:justify-center gap-2  ">
    //     <Box className="w-1/2 md:flex justify-center hidden  ">
    //       {/* <Image
    //         src={product.productImage}
    //         alt="product image"
    //         width={240}
    //         height={0}
    //         objectFit="contain"
    //       /> */}
    //     </Box>
    //     <span className="hidden md:block w-[2px] bg-gray-200">&nbsp;</span>
    //     <Box
    //       component="ul"
    //       className="p-1 md:p-5 flex flex-col gap-8 md:w-3/4   "
    //     >
    //       <Box component="li" className="flex gap-2 ">
    //         <p className="text-xl font-semibold ">Name :</p>

    //         <p className="text-xl ">{product.productName}</p>
    //       </Box>
    //       <Box component="li" className="flex gap-2 ">
    //         <p className="text-xl font-semibold ">Category :</p>

    //         <p className="text-xl ">{product.productCategory}</p>
    //       </Box>

    //       <Box component="li" className="flex gap-2 ">
    //         <p className="text-xl font-semibold ">Price :</p>

    //         <p className="text-xl ">{product.productPrice} </p>
    //       </Box>

    //       {/* <Box component="li" className="flex items-center gap-2 ">
    //         <p className="text-xl font-semibold ">colors :</p>

    //         {product.productColors.map((color) => (
    //           <span
    //             key={color.value}
    //             className="w-5 h-5 rounded"
    //             style={{ backgroundColor: color.color }}
    //           >
    //             &nbsp;
    //           </span>
    //         ))}
    //       </Box> */}

    //       <Box component="li" className="flex flex-wrap gap-2 items-center ">
    //         <p className="text-xl font-semibold ">Description :</p>

    //         <p className="text-xl leading-9  text-gray-500  ">
    //           {product.productDescription}
    //         </p>
    //       </Box>
    //     </Box>
    //   </Box>
    //   <Box className="flex justify-end ">
    //     <Button
    //       onClick={setShowModal}
    //       sx={{
    //         fontSize: "1rem",
    //         backgroundColor: "rgb(75 85 99)",
    //         "&:hover": {
    //           backgroundColor: "rgb(55 65 81)",
    //         },
    //       }}
    //       variant="contained"
    //       size="large"
    //     >
    //       Close
    //     </Button>
    //   </Box>
    // </Box>
  );
}

export default ProductDetails;
