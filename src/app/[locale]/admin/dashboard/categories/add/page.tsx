"use client";

import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from "@/lib/features/api/categoriesApi";
import { AdminMainCategory } from "@/types/types";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

function CategoryPage() {
  const {
    handleSubmit,
    control,
    watch,

    reset,
    formState: { errors },
  } = useForm<AdminMainCategory>({ mode: "onChange" });

  const formData = watch();

  const [addCategory, categoryState] = useAddCategoryMutation();

  const t = useTranslations("Dashboard");

  function handleAddCategorySubmit() {
    addCategory({
      name: formData.name.trim(),
      description: formData.description,
    })
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          toast.success("A New Main Category Added");
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("This Category is Already Added");
        }
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddCategorySubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] "
    >
      {/* <Link href={`${pathname}/edit/6681eeba9397b4412be678d3`}>Edit</Link> */}
      {/* <button onClick={deleteCategoryHandler}>Delete</button> */}
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Add Category")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href="/">
              {t("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Categories")}</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("Add Category")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Box className="relative flex flex-col  gap-12">
          <Controller
            name={"name"}
            control={control}
            defaultValue={""}
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={categoryState.isLoading}
                textLabelClass={"font-semibold text-xl"}
                placeholder={t("Category Name")}
                textlabel={t("Category Name")}
                field={field}
                errors={errors}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
          <Controller
            name={"description"}
            disabled={categoryState.isLoading}
            defaultValue={""}
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => (
              <CustomizedTextField
                textLabelClass={"font-semibold text-xl"}
                placeholder={t("Category Description")}
                textlabel={t("Category Description")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
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
            disabled={categoryState.isLoading}
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
            {categoryState.isLoading ? <MiniSpinner /> : t("Add Category")}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default CategoryPage;
