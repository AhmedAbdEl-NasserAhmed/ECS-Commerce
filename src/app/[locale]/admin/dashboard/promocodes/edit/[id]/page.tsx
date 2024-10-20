"use client";

import {
  useEditPromocodeMutation,
  useGetPromocodeByIdQuery,
} from "@/lib/features/api/promocodesApi";
import { AdminPromocode } from "@/types/types";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import Spinner from "@/ui/Spinner/Spinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

function EditPromoCodePage() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AdminPromocode>({
    mode: "onChange",
  });

  const { locale, id } = useParams();

  const {
    data: promocode,
    isLoading,
    isFetching,
  } = useGetPromocodeByIdQuery(id);

  const [updatePromocode, updatePromocodeResponse] = useEditPromocodeMutation();

  const formData = watch();

  const t = useTranslations("Dashboard");
  const tMessage = useTranslations("messages");
  const tUser = useTranslations("user");

  function handleEditPromocodeSubmit() {
    updatePromocode({
      id,
      data: {
        code: formData.promocode,
        expirationDate: new Date(formData.expiredAt).toISOString().slice(0, 10),
        discount: +formData.discount,
      },
    })
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          toast.success(tMessage("The Promocode Updated"));
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(tMessage(err?.data?.message));
        }
      });
  }

  if (isFetching || isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(handleEditPromocodeSubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] "
    >
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Edit Promocode")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link
              className="text-[#ed0534]"
              href={`/${locale}/admin/dashboard`}
            >
              {t("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Promocodes")}</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <Box>
            <Box className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold mb-5">
                {t("Edit Promocode")}
              </h2>
            </Box>
          </Box>

          <span className=" absolute top-28 left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Box className="relative flex flex-col  gap-12">
          <Controller
            name={"promocode"}
            control={control}
            defaultValue={promocode?.data?.code}
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => (
              <CustomizedTextField
                customError={errors?.promocode}
                disabled={updatePromocodeResponse.isLoading}
                textLabelClass={"font-semibold text-xl"}
                placeholder={t("Promocode")}
                textlabel={`${t("Promocode")}`}
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
            name={"expiredAt"}
            disabled={updatePromocodeResponse.isLoading}
            control={control}
            defaultValue={new Date(promocode?.data?.expirationDate)}
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => {
              return (
                <div className="flex flex-col gap-4">
                  <label className={"font-semibold text-xl"}>
                    {t("Expired At")}
                  </label>
                  <input
                    type="date"
                    className="w-full h-[40px] rounded-lg border border-gray-300 px-4 pr-4 placeholder-gray-400 text-gray-600"
                    name={field.name}
                    style={{ textAlign: locale === "en" ? "left" : "right" }}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={field.onChange}
                    value={new Date(field.value).toISOString().slice(0, 10)}
                    defaultValue={new Date(promocode?.data?.expirationDate)
                      .toISOString()
                      .slice(0, 10)}
                  />
                  {errors["expiredAt"] && (
                    <div className="text-red-600 -mt-3">
                      {tUser("This field is required")}
                    </div>
                  )}
                </div>
              );
            }}
          />
          <Controller
            name={"discount"}
            control={control}
            defaultValue={promocode?.data?.discount}
            rules={{
              required: "This field is required",
              min: {
                value: 0,
                message: "This field should be more than 0 ",
              },
              max: {
                value: 100,
                message: "This field should be less than 100 % ",
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
                textLabelClass={"font-semibold text-xl"}
                placeholder={"0"}
                textlabel={t("Product Discount %")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"number"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
        </Box>
        <Box>
          <Button
            disabled={updatePromocodeResponse.isLoading}
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
            {updatePromocodeResponse.isLoading ? (
              <MiniSpinner />
            ) : (
              t("Edit Promocode")
            )}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default EditPromoCodePage;
