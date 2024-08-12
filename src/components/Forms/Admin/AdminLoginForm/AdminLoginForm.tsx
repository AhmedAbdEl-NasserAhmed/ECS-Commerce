"use client";

import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import CustomizedTextField from "@/ui/TextField/TextField";
import { useForm, Controller } from "react-hook-form";
import { LoginFormData } from "@/types/types";
import { adminLoginFormInputs } from "@/constants/adminLoginFormInputs";
import { useUserloginMutation } from "@/lib/features/api/usersApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/hooks";
import { loginUser } from "@/lib/features/usersSlice/usersSlice";
import { useTranslations } from "next-intl";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";

function AdminLoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [adminFn, adminState] = useUserloginMutation();

  const dispatch = useAppDispatch();

  const t = useTranslations("Login");
  const tMessage = useTranslations("messages");

  const formTranslation = useTranslations("Form");

  function onSubmit(data: LoginFormData) {
    adminFn({
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then((res) => {
        toast.success(t("welcome"));

        localStorage.setItem("userToken", res.token);

        localStorage.setItem("user", JSON.stringify(res.data));

        dispatch(loginUser({ user: res.data, token: res.token }));
      })
      .catch((err) => toast.error(tMessage(err.data.message)));
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-[85vw] md:w-[70vw] flex-col lg:flex-row rounded-xl shadow-lg h-[95vh] lg:h-[65vh] overflow-hidden "
    >
      <Box className="relative p-9 flex flex-col justify-between lg:w-1/2 w-full h-full bg-[url('/sign-in-img.png')] bg-no-repeat bg-cover bg-center   ">
        <h1
          style={{
            fontSize: "3rem",
            color: "white",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          ORCA Ecommerce
        </h1>
        <p className="text-white text-[1.67rem] font-medium text-center w-4/5 ml-auto mr-auto mb-[5rem]">
          {t("greeting")}
        </p>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        className=" px-12 py-10  grow bg-white rounded-xl lg:rounded-none"
      >
        <Box className="flex flex-col gap-4">
          <Typography
            variant="h2"
            component="h2"
            className=" text-[2rem] font-medium tracking-wide   "
          >
            {t("welcome")}!
          </Typography>

          <Typography
            variant="h5"
            component="h5"
            className=" text-[1.4rem] tracking-wider "
          >
            {t("sign in description")}{" "}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          {adminLoginFormInputs(showPassword, handleClickShowPassword).map(
            (input) => {
              return (
                <Controller
                  key={input.id}
                  name={input.name as keyof LoginFormData}
                  control={control}
                  defaultValue={input.defaultValue}
                  rules={input.rules}
                  render={({ field }) => (
                    <CustomizedTextField
                      disabled={adminState.isLoading}
                      textLabelClass={input.textLabelClass}
                      textlabel={formTranslation(input.textlabel)}
                      formerHelperStyles={input.formerHelperStyles}
                      field={field}
                      errors={errors}
                      type={input.type}
                      placeholder={formTranslation(input.placeholder)}
                      variant="outlined"
                      size="small"
                      sx={input.sx}
                      inputProps={input.inputProps}
                    />
                  )}
                />
              );
            }
          )}
        </Box>
        <Box className="flex justify-end">
          <Link
            className="text-blue-500 font-semibold sm:text-md md:text-xl "
            href=""
          >
            {t("Forgot password")}
          </Link>
        </Box>
        <Button
          disabled={adminState.isLoading}
          sx={{
            padding: "0.85rem",
            fontSize: "1.2rem",
            backgroundColor: "#5b93ff",
            "&:hover": {
              backgroundColor: "#4f80e1",
            },
          }}
          type="submit"
          variant="contained"
          size="large"
        >
          {adminState.isLoading ? <MiniSpinner /> : t("Login")}
        </Button>
      </Box>
    </Box>
  );
}

export default AdminLoginForm;
