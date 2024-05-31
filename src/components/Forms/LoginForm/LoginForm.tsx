"use client";
import styles from "./LoginForm.module.scss";
import Link from "next/link";
import Button from "@/ui/Button/Button";
import { useRouter } from "next/navigation";
import {
  Box,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import CustomizedTextField from "@/ui/TextField/TextField";

const CustomTextField = styled(TextField)({
  input: {
    fontSize: "1.3rem",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgb(6 182 212)",
      borderRadius: "5px",
      borderWidth: "2px",
    },

    "&:hover fieldset": {
      borderColor: "rgb(6 182 212)", // Border color on hover
    },

    "&.Mui-focused fieldset": {
      borderColor: "rgb(6 182 212)", // Border color when focused
    },
  },
});

function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isAuthenticated = false;

    if (!isAuthenticated) {
      router.push("/admin/dashboard/product");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white px-6 py-8 sm:px-9 sm:py-10 w-3/4 md:w-[60%] lg:w-1/2 xl:w-1/3 2xl:w-1/3 rounded-lg shadow-lg "
    >
      <Box component="div" display="flex" flexDirection="column" gap="3rem">
        <h2
          className={`${styles["form-header"]} text-[2rem] sm:text-[2.2rem] md:text-[2.4rem] h-[4vh]  font-extrabold `}
        >
          Welcome Back,
        </h2>
        <div className="flex flex-col gap-8  ">
          <CustomizedTextField
            variant="outlined"
            name="email"
            type="text"
            width="100%"
            label="Email"
            size="medium"
          />
          <CustomizedTextField
            width="100%"
            type={showPassword ? "text" : "password"}
            name="password"
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
        </div>
        {/* <div className="flex flex-col gap-8 sm:gap-10 items-center">
          <Button
            width="100%"
            icon={<HiArrowRightEndOnRectangle />}
            variation="rgb(6 182 212)"
          >
            Login
          </Button>
        </div> */}
        <div className="text-center">
          <Link
            className="text-cyan-500 font-semibold sm:text-md md:text-xl "
            href=""
          >
            Forgotten password?
          </Link>
        </div>
      </Box>
    </form>
  );
}

export default LoginForm;
