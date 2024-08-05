"use client";

import {
  useAddCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryByIdQuery,
} from "@/lib/features/api/categoriesApi";
import { AdminMainCategory } from "@/types/types";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

function EditCategoryPage() {
  const params = useParams();

  const { data: categoryData, isLoading } = useGetCategoryByIdQuery(params.id);

  const [editCategory, editCategoryResponse] = useEditCategoryMutation();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  function showInputsHandler(e) {
    setIsChecked(e.target.checked);
  }

  const t = useTranslations("Dashboard");

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AdminMainCategory>({
    mode: "onChange",
  });

  const formData = watch();

  function handleEditCategorySubmit() {
    editCategory({
      id: params.id,
      data: {
        name: formData.name,
        description: formData.description,
      },
    })
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          toast.success(`Your category has been updated!`);
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("This Category is Already Added");
        }
      });
  }

  console.log("formData", formData);

  return (
    <form
      onSubmit={handleSubmit(handleEditCategorySubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] "
    >
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Edit Category")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-[#ed0534]" href="/">
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
        <Box>
          <Box className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold mb-5">
              {t("Edit Category")}
            </h2>
            <FormControlLabel
              control={
                <Switch
                  disabled={
                    formData.name?.en === "" || formData.description?.en === ""
                  }
                  checked={isChecked}
                  onChange={showInputsHandler}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "red",
                      "& + .MuiSwitch-track": {
                        backgroundColor: "#ed0534",
                      },
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#161616",
                      opacity: 1,
                    },
                  }}
                />
              }
              label={
                <Typography variant="h6">{`Show ${
                  isChecked ? "English" : "Arabic"
                }  Inputs`}</Typography>
              }
            />
          </Box>
        </Box>
        <Box className="relative flex flex-col  gap-12">
          {!isChecked && (
            <Controller
              name={"name.en"}
              control={control}
              defaultValue={""}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <CustomizedTextField
                  customError={errors?.["name"]?.["en"]}
                  disabled={editCategoryResponse.isLoading}
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
          )}
          {isChecked && (
            <Controller
              name={"name.ar"}
              control={control}
              defaultValue={""}
              rules={{
                required: "هذا الحقل مطلوب",
              }}
              render={({ field }) => (
                <CustomizedTextField
                  customError={errors?.["name"]?.["ar"]}
                  disabled={editCategoryResponse.isLoading}
                  textLabelClass={"font-semibold text-xl"}
                  placeholder={"أسم القسم"}
                  textlabel={"أسم القسم"}
                  field={field}
                  errors={errors}
                  formerHelperStyles={{ style: { fontSize: "1rem" } }}
                  type={"text"}
                  variant={"outlined"}
                  size={"small"}
                />
              )}
            />
          )}
          {!isChecked && (
            <Controller
              name={"description.en"}
              disabled={editCategoryResponse.isLoading}
              defaultValue={""}
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <CustomizedTextField
                  customError={errors?.["description"]?.["en"]}
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
          )}
          {isChecked && (
            <Controller
              name={"description.ar"}
              disabled={editCategoryResponse.isLoading}
              defaultValue={""}
              control={control}
              rules={{
                required: "هذا الحقل مطلوب",
              }}
              render={({ field }) => (
                <CustomizedTextField
                  customError={errors?.["description"]?.["ar"]}
                  textLabelClass={"font-semibold text-xl"}
                  placeholder={"وصف القسم"}
                  textlabel={"وصف القسم"}
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
          )}
        </Box>
        <Box>
          {isChecked && (
            <Button
              disabled={isLoading || editCategoryResponse.isLoading}
              sx={{
                paddingInline: "1.6rem",
                paddingBlock: "1rem",
                fontSize: "1.3rem",
                borderRadius: "5px",
                backgroundColor: "#ed0534",
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
              {isLoading || editCategoryResponse.isLoading ? (
                <MiniSpinner />
              ) : (
                t("Edit Category")
              )}
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}

export default EditCategoryPage;
