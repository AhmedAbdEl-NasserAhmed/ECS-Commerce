"use client";

import { emailRegex } from "@/constants/regx";
import MultiChoiceSelectMenu from "@/ui/MultiChoiceSelectMenu/MultiChoiceSelectMenu";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Controller, useForm } from "react-hook-form";
import { getNames } from "country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@mui/material";
import ErrorMessage from "@/ui/ErrorMessage/ErrorMessage";
import {
  useCashPaymentCheckoutMutation,
  usePaymentCheckoutMutation,
} from "@/lib/features/api/paymentApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearCookiesThunk } from "@/lib/features/cookieSlice/cookieSlice";
import { makePayment } from "@/lib/features/paymentSlice/paymentSlice";
import { useTranslations } from "next-intl";
import { StorageService } from "@/services/StorageService";
import { paymentMethod } from "./UserCheckout";

interface IProps {
  isUserAcceptedAllPolicies: boolean;
  userPaymentMethod: paymentMethod;
  enteredPromocode: any;
}

function BillingInformation(props: IProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [visaPaymentFn, visaPaymentResponse] = usePaymentCheckoutMutation();
  const [cashPaymentFn, cashPaymentResponse] = useCashPaymentCheckoutMutation();

  const { locale } = useParams();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const userTranslation = useTranslations("user");
  const tMessage = useTranslations("messages");

  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const countries = getNames().map((country) => ({
    label: country,
    value: country,
    color: "#666666",
  }));

  function onSubmit(data) {
    if (!cart.length) {
      toast.error(tMessage("Please add items to you cart"));
      return;
    }

    dispatch(makePayment(true));

    const serverData = {
      billing_data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        country: data.country.label,
        city: data.city,
        building: data.building,
        apartment: data.apartment,
        street: data.street,
        floor: data.floor,
      },
      promocode: props.enteredPromocode?.code,
      cartItems: cart,
      locale,
    };

    if (props.userPaymentMethod === "cash") {
      return cashPaymentFn(serverData)
        .unwrap()
        .then((res) => {
          dispatch(makePayment(false));
          StorageService.set("userLang", locale);
          return res;
        })
        .then((res) => {
          dispatch(clearCookiesThunk("cartItems"));
          StorageService.delete("userLang");
          toast.success(
            ` ${userTranslation("Your Order is Completed Successfully")}`
          );
          router.replace(`/${locale as string}/user/profile/${res?.orderId}`);
        })
        .catch((err) => {
          dispatch(makePayment(false));
          toast.error(
            ` ${tMessage("The left Quantity from Product")} ${
              err.data.message[locale as string]
            } ${tMessage("is")} ${err.data.message.quantity || 0} `
          );
        });
    } else {
      return visaPaymentFn(serverData)
        .unwrap()
        .then((res) => {
          dispatch(makePayment(false));
          StorageService.set("userLang", locale);
          return res;
        })
        .then((res) => {
          router.replace(res.url);
        })
        .catch((err) => {
          dispatch(makePayment(false));
          toast.error(
            ` ${tMessage("The left Quantity from Product")} ${
              err.data.message[locale as string]
            } ${tMessage("is")} ${err.data.message.quantity || 0} `
          );
        });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow-md w-full lg:w-1/2 rounded-md  flex flex-col gap-8"
    >
      <div>
        <h2 className="text-4xl font-semibold mb-5">
          {userTranslation("Billings Information")}
        </h2>
        <span className="w-full h-1 block bg-[#ed0534] ">&nbsp;</span>
      </div>
      <div className="flex items-center flex-wrap md:flex-nowrap gap-8 ">
        <div className="w-full">
          <Controller
            name={"firstName"}
            control={control}
            defaultValue={""}
            rules={{
              required: userTranslation("This field is required"),
              minLength: {
                value: 4,
                message: userTranslation(
                  "The name should be more than 4 characters "
                ),
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={
                  visaPaymentResponse.isLoading || cashPaymentResponse.isLoading
                }
                textLabelClass={"font-semibold text-xl"}
                placeholder={userTranslation("First Name")}
                textlabel={userTranslation("First Name")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
        </div>
        <div className="w-full">
          <Controller
            name={"lastName"}
            control={control}
            defaultValue={""}
            rules={{
              required: userTranslation("This field is required"),
              minLength: {
                value: 4,
                message: userTranslation(
                  "The name should be more than 4 characters "
                ),
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={
                  visaPaymentResponse.isLoading || cashPaymentResponse.isLoading
                }
                textLabelClass={"font-semibold text-xl"}
                placeholder={userTranslation("Last Name")}
                textlabel={userTranslation("Last Name")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
        </div>
      </div>
      <div className="w-full">
        <Controller
          name={"email"}
          control={control}
          defaultValue={""}
          rules={{
            required: userTranslation("Please Enter A Valid Email"),
            pattern: {
              value: emailRegex,
              message: userTranslation("Please Enter Valid Email Format"),
            },
          }}
          render={({ field }) => (
            <CustomizedTextField
              disabled={
                visaPaymentResponse.isLoading || cashPaymentResponse.isLoading
              }
              textLabelClass={"font-semibold text-xl"}
              placeholder={userTranslation("Email Address")}
              textlabel={userTranslation("Email Address")}
              field={field}
              formerHelperStyles={{ style: { fontSize: "1rem" } }}
              errors={errors}
              type={"text"}
              variant={"outlined"}
              size={"small"}
            />
          )}
        />
      </div>

      <div className="flex items-center flex-wrap md:flex-nowrap gap-8 ">
        <div className="w-full ">
          <Controller
            name={"country"}
            control={control}
            defaultValue={{ label: "Egypt", value: "Egypt", color: "#666666" }}
            rules={{ required: userTranslation("This field is required") }}
            render={({ field }) => (
              <MultiChoiceSelectMenu
                disabled={
                  false ||
                  visaPaymentResponse.isLoading ||
                  cashPaymentResponse.isLoading
                }
                isMulti={false}
                textLabelClass={"font-semibold text-xl"}
                placeholder={userTranslation("Select a Country")}
                textLabel={userTranslation("Country Name")}
                name={"country"}
                options={countries}
                field={field}
                errors={errors}
              />
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label className="font-semibold text-xl">
            {userTranslation("Phone Number")}
          </label>
          <Controller
            name={"phoneNumber"}
            control={control}
            defaultValue={""}
            rules={{ required: userTranslation("This field is required") }}
            render={({ field }) => (
              <PhoneInput
                disabled={
                  visaPaymentResponse.isLoading || cashPaymentResponse.isLoading
                }
                country={"eg"}
                value={field.value}
                onChange={field.onChange}
                inputStyle={{
                  width: "100%",
                }}
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  autoFocus: true,
                }}
              />
            )}
          />
          {errors["phoneNumber"] && (
            <ErrorMessage message={errors["phoneNumber"]?.message} />
          )}
        </div>
      </div>

      <div className="flex items-center flex-wrap md:flex-nowrap gap-8 ">
        <div className="w-full ">
          <Controller
            name={"city"}
            control={control}
            defaultValue={""}
            rules={{ required: userTranslation("This field is required") }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={
                  visaPaymentResponse.isLoading || cashPaymentResponse.isLoading
                }
                textLabelClass={"font-semibold text-xl"}
                placeholder={userTranslation("City")}
                textlabel={userTranslation("City")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
        </div>
        <div className="w-full ">
          <Controller
            name={"apartment"}
            control={control}
            defaultValue={""}
            rules={{ required: userTranslation("This field is required") }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={
                  visaPaymentResponse.isLoading || cashPaymentResponse.isLoading
                }
                textLabelClass={"font-semibold text-xl"}
                placeholder={userTranslation("Apartment")}
                textlabel={userTranslation("Apartment")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
        </div>
      </div>

      <div className="flex items-center flex-wrap md:flex-nowrap gap-8 ">
        <div className="w-full ">
          <Controller
            name={"building"}
            control={control}
            defaultValue={""}
            rules={{ required: userTranslation("This field is required") }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={
                  visaPaymentResponse.isLoading || cashPaymentResponse.isLoading
                }
                textLabelClass={"font-semibold text-xl"}
                placeholder={userTranslation("Building")}
                textlabel={userTranslation("Building")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
        </div>
        <div className="w-full ">
          <Controller
            name={"street"}
            control={control}
            defaultValue={""}
            rules={{ required: userTranslation("This field is required") }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={
                  visaPaymentResponse.isLoading || cashPaymentResponse.isLoading
                }
                textLabelClass={"font-semibold text-xl"}
                placeholder={userTranslation("Street")}
                textlabel={userTranslation("Street")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
        </div>
        <div className="w-full ">
          <Controller
            name={"floor"}
            control={control}
            defaultValue={""}
            rules={{ required: userTranslation("This field is required") }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={
                  visaPaymentResponse.isLoading || cashPaymentResponse.isLoading
                }
                textLabelClass={"font-semibold text-xl"}
                placeholder={userTranslation("Floor")}
                textlabel={userTranslation("Floor")}
                field={field}
                formerHelperStyles={{ style: { fontSize: "1rem" } }}
                errors={errors}
                type={"text"}
                variant={"outlined"}
                size={"small"}
              />
            )}
          />
        </div>
      </div>

      <Button
        disabled={
          !props.isUserAcceptedAllPolicies ||
          visaPaymentResponse.isLoading ||
          cashPaymentResponse.isLoading
        }
        sx={{
          padding: "0.85rem",
          fontSize: "1.2rem",
          backgroundColor: "#ed0534",
          "&:hover": {
            backgroundColor: "#141414",
          },
        }}
        type="submit"
        variant="contained"
        size="large"
      >
        {visaPaymentResponse.isLoading || cashPaymentResponse.isLoading ? (
          <MiniSpinner />
        ) : (
          userTranslation("Place Order")
        )}
      </Button>
    </form>
  );
}

export default BillingInformation;
