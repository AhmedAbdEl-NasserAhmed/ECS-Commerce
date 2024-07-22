"use client";

import { passwordRegex } from "@/constants/regx";
import { useResetPasswordMutation } from "@/lib/features/api/usersApi";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function ResetPasswordPage() {
  const { token, locale } = useParams();

  const router = useRouter();

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState<boolean>(false);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const handleClickShowConfirmNewPassword = () =>
    setShowConfirmNewPassword((show) => !show);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const formData = watch();

  const [resetPasswordFn, resetPasswordResponse] = useResetPasswordMutation();

  function onSubmit() {
    resetPasswordFn({ newPassword: formData.newPassword, token })
      .unwrap()
      .then(() => {
        toast.success("Your Password has changed");
        router.push(`/${locale}/user/login`);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 bg-white text-[#161616} rounded-lg text-center flex flex-col justify-center items-center gap-12 "
    >
      <h2 className="text-3xl capitalize font-bold"> ENTER NEW PASSWORD</h2>
      <Controller
        name={"newPassword"}
        control={control}
        defaultValue={""}
        rules={{
          required: "This field is required",
          pattern: {
            value: passwordRegex,
            message: "Please Enter Valid Password format",
          },
        }}
        render={({ field }) => (
          <CustomizedTextField
            disabled={resetPasswordResponse.isLoading}
            textLabelClass={"font-semibold text-xl"}
            placeholder={"New Password"}
            textlabel={"New Password"}
            field={field}
            formerHelperStyles={{ style: { fontSize: "1rem" } }}
            errors={errors}
            type={showNewPassword ? "text" : "password"}
            variant={"outlined"}
            size={"small"}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    edge="end"
                  >
                    {showNewPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        name={"confirmNewPassword"}
        control={control}
        defaultValue={""}
        rules={{
          required: "This Field is required",
          validate(value) {
            if (value !== formData.newPassword)
              return "Password does not match";
          },
        }}
        render={({ field }) => (
          <CustomizedTextField
            disabled={resetPasswordResponse.isLoading}
            textLabelClass={"font-semibold text-xl"}
            placeholder={"Confirm New Password "}
            textlabel={"Confirm New Password "}
            field={field}
            formerHelperStyles={{ style: { fontSize: "1rem" } }}
            errors={errors}
            type={showConfirmNewPassword ? "text" : "password"}
            variant={"outlined"}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmNewPassword}
                    edge="end"
                  >
                    {showConfirmNewPassword ? (
                      <MdVisibility />
                    ) : (
                      <MdVisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size={"small"}
          />
        )}
      />
      <Button
        sx={{
          padding: "0.85rem",
          fontSize: "1.2rem",
          backgroundColor: "#ed0534",
          "&:hover": {
            backgroundColor: "#161616",
          },
        }}
        type="submit"
        variant="contained"
        size="large"
      >
        {resetPasswordResponse.isLoading ? <MiniSpinner /> : "Confirm Password"}
      </Button>
    </form>
  );
}

export default ResetPasswordPage;
