"use client";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "@/lib/features/api/ordersApi";
import { OrderStatusEnum } from "@/types/enums";
import { AdminProductProps } from "@/types/types";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import MultiChoiceSelectMenu from "@/ui/MultiChoiceSelectMenu/MultiChoiceSelectMenu";
import Spinner from "@/ui/Spinner/Spinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronRight } from "react-icons/hi2";

function EditOrder() {
  const params = useParams();

  const { locale } = useParams();

  const router = useRouter();

  const { data: order, isFetching } = useGetOrderByIdQuery(params.id, {
    skip: !params.id,
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AdminProductProps>({
    mode: "onChange",
  });

  const [updateOrder, updateOrderResponse] = useUpdateOrderMutation();

  const tIndex = useTranslations("Index");

  const t = useTranslations("Dashboard");

  function onSubmit(data: AdminProductProps) {
    const isSameStatus =
      data.status.value === OrderStatusEnum[order.data.orderStatus];

    if (isSameStatus) {
      toast.error(t("Please change the status!"));
      return;
    }
    updateOrder({
      body: { orderStatus: data.status.value.toLowerCase() },
      orderId: params.id,
    })
      .unwrap()
      .then(() => {
        toast.success("Product is updated");
        router.push(`/${locale}/admin/dashboard/orders/details/${params.id}`);
        reset();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  useEffect(() => {
    setValue("status", {
      value: OrderStatusEnum[order?.data?.orderStatus],
      label: OrderStatusEnum[order?.data?.orderStatus],
      color: "#ed0534",
    });
  }, [setValue, order?.data]);

  if (isFetching) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD]  "
    >
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            {t("Edit Order")}
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link
              className="text-[#ed0534]"
              href={`/${locale}/admin/dashboard`}
            >
              {tIndex("Home")}
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>{t("Orders")}</h4>
          </Box>
        </Box>
        <Button
          sx={{
            paddingInline: "1.6rem",
            paddingBlock: "1rem",
            fontSize: "1.3rem",
            borderRadius: "5px",
            backgroundColor: "#ed0534",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "gray",
              boxShadow: "none",
            },
          }}
          type="button"
          variant="contained"
          size="large"
        >
          {tIndex("View All")}
        </Button>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">{t("Edit Order")}</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>

        <Box className="flex gap-8 flex-col lg:flex-row justify-between ">
          <Box className="w-full lg:w-[70%] ">
            <Box className="relative grid grid-cols-autofill-minmax gap-12">
              <CustomizedTextField
                disabled={true}
                inputProps={{ readOnly: true, disabled: true }}
                textLabelClass={"font-semibold text-xl"}
                placeholder={t("transaction id")}
                textlabel={t("transaction id")}
                value={order?.data?.transaction_id}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
              <CustomizedTextField
                disabled={true}
                inputProps={{ readOnly: true, disabled: true }}
                textLabelClass={"font-semibold text-xl"}
                placeholder={t("Email")}
                textlabel={t("Email")}
                value={order?.data?.user?.email}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
              <CustomizedTextField
                disabled={true}
                inputProps={{ readOnly: true, disabled: true }}
                textLabelClass={"font-semibold text-xl"}
                placeholder={t("mobile")}
                textlabel={t("mobile")}
                value={order?.data?.billingData?.[0]?.phoneNumber}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
              <CustomizedTextField
                disabled={true}
                inputProps={{ readOnly: true, disabled: true }}
                textLabelClass={"font-semibold text-xl"}
                placeholder={t("order price")}
                textlabel={t("order price")}
                value={order?.data?.orderPrice}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
              <Controller
                name={"status"}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <MultiChoiceSelectMenu
                    disabled={false}
                    isMulti={false}
                    textLabelClass={"font-semibold text-xl"}
                    placeholder={t("order status")}
                    textLabel={t("order status")}
                    name={"status"}
                    options={[
                      {
                        value: OrderStatusEnum.created,
                        label: OrderStatusEnum.created,
                        color: "#2ecc71",
                      },
                      {
                        value: OrderStatusEnum.delivered,
                        label: OrderStatusEnum.delivered,
                        color: "#353b48",
                      },
                      {
                        value: OrderStatusEnum.shipped,
                        label: OrderStatusEnum.shipped,
                        color: "#f368e0",
                      },
                      {
                        value: OrderStatusEnum.delivering,
                        label: OrderStatusEnum.delivering,
                        color: "#3498db",
                      },
                      {
                        value: OrderStatusEnum.refund,
                        label: OrderStatusEnum.refund,
                        color: "#e74c3c",
                      },
                    ]}
                    field={field}
                    errors={errors}
                  />
                )}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Button
            disabled={updateOrderResponse.isLoading}
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
            {updateOrderResponse.isLoading ? <MiniSpinner /> : t("Edit Order")}
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default EditOrder;
