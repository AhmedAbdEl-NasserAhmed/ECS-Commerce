"use client";
import useDebounceHook from "@/hooks/useDebounceHook";
import { useGetCategoryQuery } from "@/lib/features/api/categoriesApi";
import { AdminSubCategory } from "@/types/types";
import SmartSearchInput from "@/ui/SmartSearchInput/SmartSearchInput";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiChevronRight } from "react-icons/hi2";

function SubCategoryPage() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<AdminSubCategory>();

  const formData = watch();

  console.log("Form data", formData);

  const [smartSeachvalue, setSmartSeachValue] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });

  const debounceValue = useDebounceHook(smartSeachvalue.name);

  const { data, isLoading } = useGetCategoryQuery(debounceValue);

  return (
    <form className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            Add Sub Category
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href="/">
              Home
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>Sub Categories</h4>
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
          <h2 className="text-3xl font-semibold mb-5">Add Sub Category</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Box className="relative flex flex-col gap-12">
          <Controller
            name={"category"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <SmartSearchInput
                getSmartSearchValue={setSmartSeachValue}
                textLabel="Main Category"
                data={data?.data}
                placeholder=" Search for category"
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name={"name"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                sx={{
                  backgroundColor:
                    isLoading || formData.category === "" ? "#f5f5f5" : "",
                }}
                disabled={isLoading || formData.category === ""}
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Sub Category Name"}
                textlabel={"Sub Category Name"}
                field={field}
                error={!!errors["name"]}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                helperText={errors["name"] ? errors["name"].message : ""}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
          <Controller
            name={"description"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={isLoading || formData.category === ""}
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Sub Category Description"}
                textlabel={"Sub Category Description"}
                field={field}
                error={!!errors["description"]}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                helperText={
                  errors["description"] ? errors["description"].message : ""
                }
                type={"text"}
                variant={"outlined"}
                multiline={true}
                rows={6}
                sx={{
                  backgroundColor:
                    isLoading || formData.category === "" ? "#f5f5f5" : "",
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
            disabled={isLoading || formData.category === ""}
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
            Add Sub Category
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default SubCategoryPage;
