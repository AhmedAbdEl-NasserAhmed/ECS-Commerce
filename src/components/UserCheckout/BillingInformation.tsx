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
import { usePaymentCheckoutMutation } from "@/lib/features/api/paymentApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearCookiesThunk } from "@/lib/features/cookieSlice/cookieSlice";
import { makePayment } from "@/lib/features/paymentSlice/paymentSlice";

function BillingInformation() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [paymentFn, paymentResponse] = usePaymentCheckoutMutation();

  const { locale } = useParams();

  const router = useRouter();

  const dispatch = useAppDispatch();

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
      toast.error("Please add items to you cart");
      return;
    }

    dispatch(makePayment(true));

    paymentFn({
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
      cartItems: cart,
    })
      .unwrap()
      .then((res) => {
        dispatch(makePayment(false));
        window.open(res.url, "_blank", "noopener,noreferrer");
        router.replace(`/${locale}`);
      })
      .catch((err) => {
        dispatch(makePayment(false));
        toast.error(err.data.message);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow-md w-full lg:w-1/2 rounded-md  flex flex-col gap-8"
    >
      <div>
        <h2 className="text-4xl font-semibold mb-5">Billings Information</h2>
        <span className="w-full h-1 block bg-[#ed0534] ">&nbsp;</span>
      </div>
      <div className="flex items-center flex-wrap md:flex-nowrap gap-8 ">
        <div className="w-full">
          <Controller
            name={"firstName"}
            control={control}
            defaultValue={""}
            rules={{
              required: "This field is required",
              minLength: {
                value: 4,
                message: "The name should be more than 4 characters ",
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={paymentResponse.isLoading}
                textLabelClass={"font-semibold text-xl"}
                placeholder={"First Name"}
                textlabel={"First Name"}
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
              required: "This field is required",
              minLength: {
                value: 4,
                message: "The name should be more than 4 characters ",
              },
            }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={paymentResponse.isLoading}
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Last Name"}
                textlabel={"Last Name"}
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
            required: "Please Enter A Valid Email",
            pattern: {
              value: emailRegex,
              message: "Please Enter Valid Email Format",
            },
          }}
          render={({ field }) => (
            <CustomizedTextField
              disabled={paymentResponse.isLoading}
              textLabelClass={"font-semibold text-xl"}
              placeholder={"Email Address"}
              textlabel={"Email Address"}
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
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <MultiChoiceSelectMenu
                disabled={false || paymentResponse.isLoading}
                isMulti={false}
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Select a Country "}
                textLabel={"Country Name"}
                name={"country"}
                options={countries}
                field={field}
                errors={errors}
              />
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label className="font-semibold text-xl">Phone Number</label>
          <Controller
            name={"phoneNumber"}
            control={control}
            defaultValue={""}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <PhoneInput
                disabled={paymentResponse.isLoading}
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
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={paymentResponse.isLoading}
                textLabelClass={"font-semibold text-xl"}
                placeholder={"City"}
                textlabel={"City"}
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
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={paymentResponse.isLoading}
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Apartment"}
                textlabel={"Apartment"}
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
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={paymentResponse.isLoading}
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Building"}
                textlabel={"Building"}
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
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={paymentResponse.isLoading}
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Street"}
                textlabel={"Street"}
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
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomizedTextField
                disabled={paymentResponse.isLoading}
                textLabelClass={"font-semibold text-xl"}
                placeholder={"Floor"}
                textlabel={"Floor"}
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
        disabled={paymentResponse.isLoading}
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
        {paymentResponse.isLoading ? <MiniSpinner /> : "Place Order"}
      </Button>
    </form>
  );
}

export default BillingInformation;
