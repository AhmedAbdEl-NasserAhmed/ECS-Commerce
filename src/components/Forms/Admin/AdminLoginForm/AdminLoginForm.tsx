"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import CustomizedTextField from "@/ui/TextField/TextField";
import { useForm, Controller } from "react-hook-form";
import { LoginFormData } from "@/types/types";
import Image from "next/image";
import { adminLoginFormInputs } from "@/constants/adminLoginFormInputs";
import { useAdminLoginMutation } from "@/lib/features/api/adminApi";
import toast from "react-hot-toast";

function AdminLoginForm() {
  const router = useRouter();

  const { locale } = useParams();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [adminFc, adminState] = useAdminLoginMutation();

  function onSubmit(data: LoginFormData) {
    adminFc({
      email: "admin@gmail.com",
      password: "admin123456",
    })
      .unwrap()
      .then((res) => {
        localStorage.setItem("userToken", res.token);
        toast.success("Welcome Back");
        router.push(`/${locale}/admin/dashboard/product`);
      })
      .catch((err) => toast.error(err.data.message));
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-[85vw] md:w-[70vw] flex-col lg:flex-row rounded-xl shadow-lg h-[95vh] lg:h-[65vh] overflow-hidden "
    >
      <Box className="relative p-9 flex flex-col justify-between lg:w-1/2 w-full h-full bg-[url('/sign-in-img.png')] bg-no-repeat bg-cover bg-center   ">
        <Image
          src="/logo-login.png"
          alt="logo image"
          width={250}
          height={250}
          objectFit="contain"
        />
        <p className="text-white text-[1.67rem] font-medium text-center w-4/5 ml-auto mr-auto mb-[5rem]">
          Nulla laborum sit voluptate anim in. Nulla ut qui ex ipsum id aliqua
          amet exercitation. Anim ididunt anim anim voluptate enim.
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
            Welcome Back!
          </Typography>

          <Typography
            variant="h5"
            component="h5"
            className=" text-[1.4rem] tracking-wider "
          >
            Sign in to continue to{" "}
            <Link className="text-blue-400" href="/">
              Pite Tech
            </Link>
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
                      textLabelClass={input.textLabelClass}
                      textlabel={input.textlabel}
                      formerHelperStyles={input.formerHelperStyles}
                      field={field}
                      error={!!errors[input.name as keyof LoginFormData]}
                      helperText={
                        errors[input.name as keyof LoginFormData]
                          ? errors[input.name as keyof LoginFormData]?.message
                          : ""
                      }
                      type={input.type}
                      placeholder={input.placeholder}
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
            Forgot password ?
          </Link>
        </Box>
        <Button
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
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default AdminLoginForm;
