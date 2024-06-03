"use client";

import ShowUploadedImageProduct from "@/components/AdminDashboard/showUploadedProductImage";
import productFormInputs from "@/constants/productFormInputs";
import productFormInputsSelectMenus from "@/constants/productFormInputsSelectMenus";
import { ProductFormInputs } from "@/types/types";
import SelectMenu from "@/ui/SelectMenu/SelectMenu";
import CustomizedTextField from "@/ui/TextField/TextField";
import UploadButton from "@/ui/uploadButton";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { HiCloudUpload } from "react-icons/hi";

function ProductPage() {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormInputs>();

  function onSubmit(data: ProductFormInputs) {
    console.log("data", data);

    reset();
  }

  const formData = watch();

  const [pickedImagePath, setPickedImagePath] = useState<string>("");

  function handleImagepath(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPickedImagePath(fileReader.result);
      }
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <Box
      component="div"
      className=" p-[1.8rem] md:p-[4rem] overflow-y-scroll  "
    >
      <Box
        component="div"
        className="flex justify-between items-center mb-[2rem]"
      >
        <Typography
          className="text-cyan-500 font-semibold "
          variant="h4"
          component="h4"
        >
          ADD PRODUCT
        </Typography>
        <Box component="div" className="md:hidden">
          {pickedImagePath && (
            <ShowUploadedImageProduct pickedImagePath={pickedImagePath} />
          )}
        </Box>
      </Box>
      <Box
        component="form"
        className="flex items-center gap-[2.2rem]   "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          component="div"
          className="flex flex-col gap-[2.2rem] w-full md:w-1/2  "
        >
          {productFormInputs.map((input) => {
            return (
              <Controller
                key={input.id}
                name={input.name}
                control={control}
                defaultValue={input.defaultValue}
                rules={input.rules}
                render={({ field }) => (
                  <CustomizedTextField
                    multiline={input.multiline}
                    rows={input.row}
                    field={field}
                    error={!!errors[input.name]}
                    formerHelperStyles={input.formerHelperStyles}
                    helperText={
                      errors[input.name] ? errors[input.name].message : ""
                    }
                    type={input.type}
                    label={input.label}
                    variant={input.variant}
                    size={input.size}
                    sx={input.sx}
                  />
                )}
              />
            );
          })}

          {productFormInputsSelectMenus.map((selectMenu) => {
            return (
              <Controller
                key={selectMenu.id}
                name={selectMenu.name}
                control={control}
                defaultValue={selectMenu.defaultValue}
                rules={selectMenu.rules}
                render={({ field }) => (
                  <SelectMenu
                    name={selectMenu.name}
                    errors={errors}
                    options={selectMenu.options}
                    hasError={!!errors[selectMenu.name]}
                    field={field}
                    placeholder={selectMenu.placeholder}
                  />
                )}
              />
            );
          })}

          <Box component="div" className="flex items-center gap-12 md:block ">
            <Button
              className="w-full md:w-max "
              sx={{
                backgroundColor: "#3dbadd",
                "&:hover": {
                  backgroundColor: "#28abcf",
                },
              }}
              type="submit"
              variant="contained"
              size="large"
            >
              Add Product
            </Button>
            <Button
              className=" md:hidden w-full "
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<HiCloudUpload />}
            >
              Upload Image
              <UploadButton handleImagePath={handleImagepath} />
            </Button>
          </Box>
        </Box>
        <Box
          component="div"
          className=" flex-col justify-between gap-12 text-center w-1/2 hidden md:flex  h-[60vh] "
        >
          {pickedImagePath && (
            <Box component="div" className="relative w-full h-full">
              <Image
                objectFit="cover"
                src={pickedImagePath}
                fill
                alt="product image"
              />
            </Box>
          )}
          {!pickedImagePath && (
            <p className="font-semibold text-md">
              No Product Image to display (optional)
            </p>
          )}
          <Button
            className="self-center"
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<HiCloudUpload />}
          >
            Upload Product Image
            <UploadButton handleImagePath={handleImagepath} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductPage;
