"use client";
import styles from "./LoginForm.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import CustomizedTextField from "@/ui/TextField/TextField";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import { useForm, Controller } from "react-hook-form";

interface Data {
  loginEmail: string;
  loginPassword: string;
}

function LoginForm() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Data>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function onSubmit(data: Data) {
    const isAuthenticated = false;

    if (!isAuthenticated && data.loginEmail && data.loginPassword) {
      router.push("/admin/dashboard/product");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white px-6 py-8 sm:px-9 sm:py-10 w-3/4 md:w-[60%] lg:w-1/2 xl:w-1/3 2xl:w-1/3 rounded-lg shadow-lg "
    >
      <Box component="div" display="flex" flexDirection="column" gap={4}>
        <Typography
          variant="h2"
          component="h2"
          className={`${styles["form-header"]} text-[2rem] sm:text-[2.2rem] md:text-[2.4rem] h-[4vh]  font-extrabold `}
        >
          Welcome Back,
        </Typography>
        <Box component="div" display="flex" flexDirection="column" gap={3}>
          <Controller
            name="loginEmail"
            control={control}
            defaultValue=""
            rules={{ required: "Please Enter An Email Address" }}
            render={({ field }) => (
              <CustomizedTextField
                field={field}
                error={!!errors.loginEmail}
                helperText={errors.loginEmail ? errors.loginEmail.message : ""}
                type="text"
                width="100%"
                label="Email"
                variant="outlined"
                size="medium"
              />
            )}
          />
          <Controller
            name="loginPassword"
            control={control}
            defaultValue=""
            rules={{ required: "Please Enter A valid Password" }}
            render={({ field }) => (
              <CustomizedTextField
                error={!!errors.loginPassword}
                helperText={
                  errors.loginPassword ? errors.loginPassword.message : ""
                }
                field={field}
                width="100%"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                size="medium"
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
        <Button
          sx={{
            backgroundColor: "#3dbadd",
            "&:hover": {
              backgroundColor: "#28abcf",
            },
          }}
          type="submit"
          variant="contained"
          size="large"
          endIcon={<HiArrowRightEndOnRectangle />}
        >
          Log In
        </Button>
        <Box component="div" className="text-center">
          <Link
            className="text-cyan-500 font-semibold sm:text-md md:text-xl "
            href=""
          >
            Forgotten password ?
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
