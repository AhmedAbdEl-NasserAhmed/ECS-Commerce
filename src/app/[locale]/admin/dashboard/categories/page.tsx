"use client";

import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { HiChevronRight } from "react-icons/hi2";

function CategoryPage() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  return (
    <form className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            Add Category
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href="/">
              Home
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>Categories</h4>
          </Box>
        </Box>
        <Button
          sx={{
            paddingInline: "1.6rem",
            paddingBlock: "1rem",
            fontSize: "1.3rem",
            borderRadius: "5px",
            backgroundColor: "#5b93ff",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "black",
              boxShadow: "none",
            },
          }}
          type="button"
          variant="contained"
          size="large"
        >
          View All
        </Button>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">Add Category</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Box className="relative flex flex-col  gap-12">
          <Controller
            name={"categoryName"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Category Name"}
                textlabel={"Category Name"}
                field={field}
                error={!!errors["categoryName"]}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                // helperText={
                //   errors["categoryName"] ? errors["categoryName"].message : ""
                // }
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
          <Controller
            name={"categoryDescription"}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Category Description"}
                textlabel={"Category Description"}
                field={field}
                error={!!errors["categoryDescription"]}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                // helperText={
                //   errors["categoryDescription"]
                //     ? errors["categoryDescription"].message
                //     : ""
                // }
                type={"text"}
                variant={"outlined"}
                multiline={true}
                rows={6}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "1.4rem",
                  },
                  "& .MuiInputBase-inputMultiline": {
                    fontSize: "1.4rem",
                  },
                }}
              />
            )}
          />
        </Box>
        <Box>
          <Button
            sx={{
              paddingInline: "1.6rem",
              paddingBlock: "1rem",
              fontSize: "1.3rem",
              borderRadius: "5px",
              backgroundColor: "#5b93ff",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "black",
                boxShadow: "none",
              },
            }}
            type="submit"
            variant="contained"
            size="large"
          >
            Add Category
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default CategoryPage;
