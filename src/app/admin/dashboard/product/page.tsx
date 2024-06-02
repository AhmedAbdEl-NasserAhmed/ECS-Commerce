"use client";

import ShowUploadedImageProduct from "@/components/AdminDashboard/showUploadedProductImage";
import { colourOptions } from "@/constants/colorOptions";
import { sizesOptions } from "@/constants/sizesOptions";
import { ProductFormInputs } from "@/types/types";
import ErrorMessage from "@/ui/ErrorMessage/ErrorMessage";
import SelectMenu from "@/ui/SelectMenu/SelectMenu";
import CustomizedTextField from "@/ui/TextField/TextField";
import UploadButton from "@/ui/uploadButton";
import { Box, Button, Typography, styled } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
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

  // console.log("errors", errors);

  const formData = watch();

  console.log(formData);

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
    <Box component="div" className=" p-[2rem] md:p-[4rem] overflow-y-scroll  ">
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
          <Controller
            name="productName"
            control={control}
            defaultValue=""
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => (
              <CustomizedTextField
                field={field}
                error={!!errors.productName}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                helperText={
                  errors.productName ? errors.productName.message : ""
                }
                type="text"
                label="Product Name"
                variant="outlined"
                size="small"
                sx={{
                  input: {
                    fontSize: "1.4rem",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgb(6 182 212)",
                      borderRadius: "5px",
                      borderWidth: "2px",
                    },
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
                    },

                    "&:hover fieldset": {
                      borderColor: "rgb(6 182 212)",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(6 182 212)",
                    },
                  },
                }}
              />
            )}
          />
          <Controller
            name="productCategory"
            control={control}
            defaultValue=""
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => (
              <CustomizedTextField
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                field={field}
                error={!!errors.productCategory}
                helperText={
                  errors.productCategory ? errors.productCategory.message : ""
                }
                type="text"
                label="Product Category"
                variant="outlined"
                size="small"
                sx={{
                  input: {
                    fontSize: "1.4rem",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgb(6 182 212)",
                      borderRadius: "5px",
                      borderWidth: "2px",
                    },
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
                    },

                    "&:hover fieldset": {
                      borderColor: "rgb(6 182 212)",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(6 182 212)",
                    },
                  },
                }}
              />
            )}
          />
          <Controller
            name="productQuantity"
            control={control}
            defaultValue=""
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => (
              <CustomizedTextField
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                field={field}
                error={!!errors.productQuantity}
                helperText={
                  errors.productQuantity ? errors.productQuantity.message : ""
                }
                type="number"
                label="Product Quantity"
                variant="outlined"
                size="small"
                sx={{
                  input: {
                    fontSize: "1.4rem",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgb(6 182 212)",
                      borderRadius: "5px",
                      borderWidth: "2px",
                    },
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
                    },

                    "&:hover fieldset": {
                      borderColor: "rgb(6 182 212)",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(6 182 212)",
                    },
                  },
                }}
              />
            )}
          />
          <Controller
            name="productDescription"
            control={control}
            defaultValue=""
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => (
              <CustomizedTextField
                multiline={true}
                rows={4}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                field={field}
                error={!!errors.productDescription}
                helperText={
                  errors.productDescription
                    ? errors.productDescription.message
                    : ""
                }
                type="text"
                label="Product Description"
                variant="outlined"
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgb(6 182 212)",
                      borderRadius: "5px",
                      borderWidth: "2px",
                    },
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
                    },

                    "&:hover fieldset": {
                      borderColor: "rgb(6 182 212)",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(6 182 212)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "1.4rem", // Customize the font size here
                  },
                }}
              />
            )}
          />
          <Box component="div" className="flex flex-col gap-2 ">
            <Controller
              name="productColors"
              control={control}
              defaultValue={[]}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <SelectMenu
                  options={colourOptions}
                  hasError={!!errors["productColors"]}
                  field={field}
                  placeholder="Product Colors"
                />
              )}
            />
            {errors["productColors"] && (
              <ErrorMessage message={errors["productColors"]?.message} />
            )}
          </Box>
          <Box component="div" className="flex flex-col gap-2 ">
            <Controller
              name="productSizes"
              control={control}
              defaultValue={[]}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <SelectMenu
                  options={sizesOptions}
                  hasError={!!errors["productSizes"]}
                  field={field}
                  placeholder="Product Sizes"
                />
              )}
            />
            {errors["productSizes"] && (
              <ErrorMessage message={errors["productSizes"]?.message} />
            )}
          </Box>
          <Box component="div">
            <Button
              className="w-full md:w-max"
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
              className=" md:hidden w-full md:w-max mt-6 md:mt-0"
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
