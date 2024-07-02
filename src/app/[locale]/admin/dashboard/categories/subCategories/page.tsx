"use client";

import { fetchUsers } from "@/helpers/usersData";
import useDebounceHook from "@/hooks/useDebounceHook";
import SmartSearchInput from "@/ui/SmartSearchInput/SmartSearchInput";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  } = useForm();

  const formData = watch();

  // console.log("Form data", formData);

  const [usersData, setUsersData] = useState([]);

  const [smartSeachvalue, setSmartSeachValue] = useState<string>("");

  const debounceValue = useDebounceHook(smartSeachvalue);

  useEffect(() => {
    async function getUsersData() {
      const data = fetchUsers(debounceValue);
      const res = await data;
      setUsersData(res);
    }

    getUsersData();
  }, [debounceValue]);

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
            name={"mainCategory"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <SmartSearchInput
                getSmartSearchValue={setSmartSeachValue}
                textLabel="Main Category"
                data={usersData}
                placeholder=" Search for category"
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name={"subCategoryName"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Sub Category Name"}
                textlabel={"Sub Category Name"}
                field={field}
                error={!!errors["subCategoryName"]}
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
            name={"subCategoryDescription"}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Sub Category Description"}
                textlabel={"Sub Category Description"}
                field={field}
                error={!!errors["subCategoryDescription"]}
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
            Add Sub Category
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default SubCategoryPage;
