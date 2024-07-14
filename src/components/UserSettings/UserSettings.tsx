import { emailRegex, passwordRegex } from "@/constants/regx";
import { useAppSelector } from "@/lib/hooks";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function UserSettings() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const formData = watch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const user = useAppSelector((state) => state.usersSlice.user);

  const token = useAppSelector((state) => state.usersSlice.token);

  function onSubmit() {}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-[0px_0px_7px_5px_#0000000a] w-full  "
    >
      <div className="p-8 flex flex-col gap-12 grow ">
        <h2 className="text-3xl text-black font-bold flex justify-center">
          ACCOUNT DETAILS
        </h2>
        <Controller
          name={"name"}
          control={control}
          defaultValue={user?.name || ""}
          rules={{
            required: "This field is required",
            minLength: {
              value: 4,
              message: "The name should be more than 4 characters ",
            },
          }}
          render={({ field }) => (
            <CustomizedTextField
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
          defaultValue={user?.email || ""}
          rules={{
            required: "Please Enter A Valid Email",
            pattern: {
              value: emailRegex,
              message: "Please Enter Valid Email Format",
            },
          }}
          render={({ field }) => (
            <CustomizedTextField
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
          name={"password"}
          control={control}
          defaultValue={""}
          rules={{
            required: "Please Enter A Valid Password",
            pattern: {
              value: passwordRegex,
              message:
                "password must be at least 8 characters long and include an uppercase letter, lowercase letter, digit, and special character (e.g., #?!@$%^&*-)",
            },
          }}
          render={({ field }) => (
            <CustomizedTextField
              textLabelClass={"font-semibold text-xl"}
              placeholder={"Password "}
              textlabel={"Password "}
              field={field}
              formerHelperStyles={{ style: { fontSize: "1rem" } }}
              errors={errors}
              type={showPassword ? "text" : "password"}
              variant={"outlined"}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
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
              backgroundColor: "#141414",
            },
          }}
          type="submit"
          variant="contained"
          size="large"
        >
          Update
        </Button>
      </div>
    </form>
  );
}

export default UserSettings;
