"use client";

import { colourOptions } from "@/constants/colorOptions";
import { sizesOptions } from "@/constants/sizesOptions";
import { ProductFormInputs } from "@/types/types";
import ErrorMessage from "@/ui/ErrorMessage/ErrorMessage";
import SelectMenu from "@/ui/SelectMenu/SelectMenu";
import TextArea from "@/ui/TextArea/TextArea";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

function ProductPage() {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>();

  function onSubmit(data: ProductFormInputs) {
    console.log("data", data);

    reset();
  }

  console.log("errors", errors);

  const formData = watch();

  console.log(formData);

  return (
    <Box component="div" className="p-[4rem]  ">
      <Typography
        className="text-cyan-500 font-semibold mb-[2rem]"
        variant="h4"
        component="h4"
      >
        ADD PRODUCT
      </Typography>
      <Box
        component="form"
        className="flex flex-col gap-[3.5rem]"
        onSubmit={handleSubmit(onSubmit)}
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
              className="w-full lg:w-[50%]"
              field={field}
              error={!!errors.productName}
              formerHelperStyles={{ style: { fontSize: "1rem" } }}
              helperText={errors.productName ? errors.productName.message : ""}
              type="text"
              label="Product Name"
              variant="outlined"
              size="small"
              sx={{
                helperText: {
                  fontSize: "4rem",
                },
                input: {
                  fontSize: "1.4rem",
                },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(6 182 212)",
                    borderRadius: "5px",
                    borderWidth: "2px",
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
              className="w-full lg:w-[50%]"
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
                helperText: {
                  fontSize: "4rem",
                },
                input: {
                  fontSize: "1.4rem",
                },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(6 182 212)",
                    borderRadius: "5px",
                    borderWidth: "2px",
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
              className="w-full lg:w-[50%]"
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
                helperText: {
                  fontSize: "4rem",
                },
                input: {
                  fontSize: "1.4rem",
                },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(6 182 212)",
                    borderRadius: "5px",
                    borderWidth: "2px",
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
              multiline
              className="w-full lg:w-[50%]"
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
                helperText: {
                  fontSize: "4rem",
                },
                input: {
                  fontSize: "1.4rem",
                },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(6 182 212)",
                    borderRadius: "5px",
                    borderWidth: "2px",
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
                options={sizesOptions}
                hasError={!!errors["productColors"]}
                field={field}
                className="w-full lg:w-[50%] "
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
                options={colourOptions}
                hasError={!!errors["productSizes"]}
                field={field}
                className="w-full lg:w-[50%] "
              />
            )}
          />
          {errors["productSizes"] && (
            <ErrorMessage message={errors["productSizes"]?.message} />
          )}
        </Box>

        <Box component="div">
          <Button
            sx={{
              backgroundColor: "#3dbadd",
              "&:hover": {
                backgroundColor: "#28abcf",
              },
            }}
            type="submit"
            variant="contained"
            size="large"
            className="w-full lg:w-[20%]"
          >
            Add Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductPage;
