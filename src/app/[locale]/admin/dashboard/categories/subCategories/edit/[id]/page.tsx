"use client";
import useDebounceHook from "@/hooks/useDebounceHook";
import useThrottle from "@/hooks/useThrottle";
import {
  useGetCategoryByIdQuery,
  useGetCategoryQuery,
} from "@/lib/features/api/categoriesApi";
import {
  useAddSubCategoryMutation,
  useEditSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from "@/lib/features/api/subCategoriesApi";
import { AdminSubCategory } from "@/types/types";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import SmartSearchInput from "@/ui/SmartSearchInput/SmartSearchInput";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

function SubCategoryPage() {
  const params = useParams();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AdminSubCategory>();

  const formData = watch();

  const [smartSeachvalue, setSmartSeachValue] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });

  const debounceValue = useDebounceHook(smartSeachvalue.name);

  const [editSubCategory, editSubCategoryResponse] =
    useEditSubCategoryMutation();

  const { data: subCategoryData, isFetching: isSubCategoryFetching } =
    useGetSubCategoryByIdQuery(params.id);
  useEffect(() => {
    if (subCategoryData?.data) {
      setValue("name", subCategoryData?.data?.name);
      setValue("description", subCategoryData?.data?.description);
    }
  }, [subCategoryData]);

  const { data, isLoading } = useGetCategoryQuery(debounceValue);

  function handleEditSubCategorySubmit() {
    editSubCategory({
      id: params.id,
      data: {
        name: formData.name.trim(),
        description: formData.description,
        category: smartSeachvalue["_id"],
      },
    })
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          toast.success("A new sub-category updated");
          setSmartSeachValue({
            id: "",
            name: "",
          });
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("This sub-category is already there");
        }
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditSubCategorySubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] "
    >
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            Edit Sub Category
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
          <h2 className="text-3xl font-semibold mb-5">Edit Sub Category</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Box className="relative flex flex-col gap-12">
          <Controller
            disabled={
              isSubCategoryFetching || editSubCategoryResponse.isLoading
            }
            name={"category"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <SmartSearchInput
                shouldReset={editSubCategoryResponse.isSuccess}
                getSmartSearchValue={setSmartSeachValue}
                textLabel="Main Category"
                data={data?.data}
                placeholder=" Search for category"
                name={field.name}
                onChange={field.onChange}
                value={subCategoryData?.data?.category}
              />
            )}
          />
          <Controller
            disabled={
              isSubCategoryFetching || editSubCategoryResponse.isLoading
            }
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
            disabled={
              isSubCategoryFetching || editSubCategoryResponse.isLoading
            }
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
            disabled={
              isLoading ||
              formData.category === "" ||
              isSubCategoryFetching ||
              editSubCategoryResponse.isLoading
            }
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
            {isSubCategoryFetching || editSubCategoryResponse.isLoading ? (
              <MiniSpinner />
            ) : (
              " Edit Sub Category"
            )}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default SubCategoryPage;
