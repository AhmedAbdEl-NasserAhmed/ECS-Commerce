// import { Box, Button, Typography } from "@mui/material";

// import styles from "./ProductEdit.module.scss";
// import { AdminProductProps } from "@/types/types";
// import { HiCloudUpload } from "react-icons/hi";
// import UploadButton from "@/ui/uploadButton";
// import { Controller, useForm } from "react-hook-form";
// import { ChangeEvent, useState } from "react";
// import ShowUploadedImageProduct from "../showUploadedProductImage";
// import CustomizedTextField from "@/ui/TextField/TextField";
// import Image from "next/image";
// import productFormInputs from "@/constants/productFormInputs";

// interface Props {
//   product: AdminProductProps;
//   setShowModal?: () => void;
// }

// function ProductEdit({ product, setShowModal }: Props) {
//   // const {
//   //   handleSubmit,
//   //   control,
//   //   reset,
//   //   formState: { errors },
//   // } = useForm<AdminProductProps>({
//   //   defaultValues: {
//   //     productName: product.productName,
//   //     productCategory: product.productCategory,
//   //     productPrice: product.productPrice,
//   //     productDescription: product.productDescription,
//   //   },
//   // });

//   // function onSubmit(data: AdminProductProps) {
//   //   reset();
//   // }

//   // const [pickedImagePath, setPickedImagePath] = useState<string>();

//   // function handleImagepath(e: ChangeEvent<HTMLInputElement>) {
//   //   const file = e.target.files?.[0];

//   //   if (!file) return;

//   //   const fileReader = new FileReader();

//   //   fileReader.onload = () => {
//   //     if (typeof fileReader.result === "string")
//   //       setPickedImagePath(fileReader.result);
//   //   };

//   //   fileReader.readAsDataURL(file);
//   // }

//   return 1;

//   // return (
//   //   <Box className={styles["product-edit"]}>
//   //     {/* <div className="self-end">
//   //       <CloseButton />
//   //     </div> */}
//   //     <Box className="flex justify-between items-center ">
//   //       <Typography
//   //         className="text-cyan-500 font-semibold "
//   //         variant="h4"
//   //         component="h4"
//   //       >
//   //         EDIT PRODUCT
//   //       </Typography>
//   //       {/* <Box   className="md:hidden">
//   //         {pickedImagePath && (
//   //           <ShowUploadedImageProduct pickedImagePath={pickedImagePath} />
//   //         )}
//   //       </Box> */}
//   //     </Box>
//   //     <Box
//   //       component="form"
//   //       className="flex  gap-[2.2rem]   "
//   //       onSubmit={handleSubmit(onSubmit)}
//   //     >
//   //       <Box className="flex flex-col gap-[1.55rem] mt-0 sm:mt-10  md:gap-[2rem] w-full md:w-1/2  ">
//   //         {productFormInputs.map((input) => {
//   //           return (
//   //             <Controller
//   //               key={input.id}
//   //               name={input.name}
//   //               control={control}
//   //               defaultValue={input.defaultValue}
//   //               rules={input.rules}
//   //               render={({ field }) => (
//   //                 <CustomizedTextField
//   //                   multiline={input.multiline}
//   //                   rows={input.row}
//   //                   field={field}
//   //                   error={!!errors[input.name]}
//   //                   formerHelperStyles={input.formerHelperStyles}
//   //                   helperText={
//   //                     errors[input.name] ? errors[input.name].message : ""
//   //                   }
//   //                   type={input.type}
//   //                   label={input.label}
//   //                   variant={input.variant}
//   //                   size={input.size}
//   //                   sx={input.sx}
//   //                 />
//   //               )}
//   //             />
//   //           );
//   //         })}

//   //         {/* {productFormInputsSelectMenus.map((selectMenu) => {
//   //           return (
//   //             <Controller
//   //               key={selectMenu.id}
//   //               name={selectMenu.name}
//   //               control={control}
//   //               defaultValue={selectMenu.defaultValue}
//   //               rules={selectMenu.rules}
//   //               render={({ field }) => (
//   //                 <SelectMenu
//   //                   name={selectMenu.name}
//   //                   errors={errors}
//   //                   options={selectMenu.options}
//   //                   hasError={!!errors[selectMenu.name]}
//   //                   field={field}
//   //                   placeholder={selectMenu.placeholder}
//   //                 />
//   //               )}
//   //             />
//   //           );
//   //         })} */}

//   //         <Box className="flex items-center flex-col md:flex-row gap-6  justify-between w-full ">
//   //           <Button
//   //             className=" w-full md:w-max  "
//   //             sx={{
//   //               backgroundColor: "#3dbadd",
//   //               "&:hover": {
//   //                 backgroundColor: "#28abcf",
//   //               },
//   //             }}
//   //             type="submit"
//   //             variant="contained"
//   //             size="large"
//   //           >
//   //             Update Product
//   //           </Button>

//   //           <Button
//   //             className=" md:hidden w-full "
//   //             component="label"
//   //             role={undefined}
//   //             variant="contained"
//   //             tabIndex={-1}
//   //             startIcon={<HiCloudUpload />}
//   //           >
//   //             Upload Image
//   //             <UploadButton handleImagePath={handleImagepath} />
//   //           </Button>
//   //           <Button
//   //             onClick={setShowModal}
//   //             className="w-full md:w-max  "
//   //             sx={{
//   //               backgroundColor: "rgb(75 85 99)",
//   //               "&:hover": {
//   //                 backgroundColor: "rgb(55 65 81)",
//   //               },
//   //             }}
//   //             type="submit"
//   //             variant="contained"
//   //             size="large"
//   //           >
//   //             Cancel
//   //           </Button>
//   //         </Box>
//   //       </Box>
//   //       <Box className=" flex-col items-center justify-between gap-12 text-center w-1/2 hidden md:flex  h-[60vh] ">
//   //         {pickedImagePath && (
//   //           <Box className="relative w-full h-full">
//   //             <Image
//   //               style={{
//   //                 objectFit: "contain", // cover, contain, none
//   //               }}
//   //               src={pickedImagePath}
//   //               fill
//   //               alt="product image"
//   //             />
//   //           </Box>
//   //         )}
//   //         {!pickedImagePath && (
//   //           <Box className="font-semibold text-md w-full lg:w-3/4 h-full flex justify-center items-center border-2 border-gray-300">
//   //             <p> No Product Image to display (optional)</p>
//   //           </Box>
//   //         )}
//   //         <Button
//   //           className="self-center"
//   //           component="label"
//   //           role={undefined}
//   //           variant="contained"
//   //           tabIndex={-1}
//   //           startIcon={<HiCloudUpload />}
//   //         >
//   //           Update Product Image
//   //           <UploadButton handleImagePath={handleImagepath} />
//   //         </Button>
//   //       </Box>
//   //     </Box>
//   //   </Box>
//   // );
// }

// export default ProductEdit;
