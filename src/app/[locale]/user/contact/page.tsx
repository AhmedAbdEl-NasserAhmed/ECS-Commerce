"use client";

import { emailRegex } from "@/constants/regx";
import { useSendFeedBackMutation } from "@/lib/features/api/contactUsApi";
import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Contact() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const user = useAppSelector((state) => state.usersSlice.user);

  const [sendFeedBackFn, feedBackResponse] = useSendFeedBackMutation();

  function onSubmit(data) {
    sendFeedBackFn({
      name: data.name,
      email: data.email,
      message: data.message,
    })
      .unwrap()
      .then(() => {
        toast.success("We are always here for you");
        reset();
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" mt-12 mb-12 bg-white shadow-[0px_0px_7px_5px_#0000000a] max-w-[80rem] m-auto  "
    >
      <div className="p-8 flex flex-col gap-12 grow ">
        <h2 className="text-3xl text-black font-bold flex justify-center">
          Contact US
        </h2>
        <Controller
          name={"name"}
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
              disabled={
                user?.role === UserType.ADMIN || feedBackResponse.isLoading
              }
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
              disabled={
                user?.role === UserType.ADMIN || feedBackResponse.isLoading
              }
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
        <Controller
          name={"message"}
          control={control}
          rules={{ required: "This field is required" }}
          defaultValue=""
          render={({ field }) => (
            <CustomizedTextField
              disabled={
                user?.role === UserType.ADMIN || feedBackResponse.isLoading
              }
              textLabelClass={"font-semibold text-xl"}
              placeholder={"Message"}
              textlabel={"Message"}
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
        <Button
          disabled={user?.role === UserType.ADMIN || feedBackResponse.isLoading}
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
          {feedBackResponse.isLoading ? <MiniSpinner /> : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default Contact;
