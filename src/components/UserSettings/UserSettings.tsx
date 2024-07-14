import { emailRegex, passwordRegex } from "@/constants/regx";
import { useUpdatePasswordMutation } from "@/lib/features/api/usersApi";
import { logoutUser } from "@/lib/features/usersSlice/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import CustomizedTextField from "@/ui/TextField/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function UserSettings() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const formData = watch();

  const [updatePasswordFm, updatePasswordResponse] =
    useUpdatePasswordMutation();

  const dispatch = useAppDispatch();

  const { locale } = useParams();

  const router = useRouter();

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState<boolean>(false);

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () =>
    setShowConfirmNewPassword((show) => !show);

  const user = useAppSelector((state) => state.usersSlice.user);

  // const token = useAppSelector((state) => state.usersSlice.token);

  console.log(formData);

  function onSubmit(data) {
    updatePasswordFm({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    })
      .unwrap()
      .then(() => {
        toast.success("Your Password changed successfully");
        dispatch(logoutUser());
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        router.push(`/${locale}`);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.data.message);
      });
  }

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
              disabled={updatePasswordResponse.isLoading}
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
              disabled={updatePasswordResponse.isLoading}
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
          name={"oldPassword"}
          control={control}
          defaultValue={""}
          rules={{
            required: "This Field is required",
          }}
          render={({ field }) => (
            <CustomizedTextField
              disabled={updatePasswordResponse.isLoading}
              textLabelClass={"font-semibold text-xl"}
              placeholder={" Old Password "}
              textlabel={" Old Password "}
              field={field}
              formerHelperStyles={{ style: { fontSize: "1rem" } }}
              errors={errors}
              type={showOldPassword ? "text" : "password"}
              variant={"outlined"}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowOldPassword}
                      edge="end"
                    >
                      {showOldPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size={"small"}
            />
          )}
        />
        <Controller
          name={"newPassword"}
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
              disabled={updatePasswordResponse.isLoading}
              textLabelClass={"font-semibold text-xl"}
              placeholder={"New Password "}
              textlabel={"New Password "}
              field={field}
              formerHelperStyles={{ style: { fontSize: "1rem" } }}
              errors={errors}
              type={showNewPassword ? "text" : "password"}
              variant={"outlined"}
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
              size={"small"}
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
              disabled={updatePasswordResponse.isLoading}
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
          disabled={updatePasswordResponse.isLoading}
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
          {updatePasswordResponse.isLoading ? <MiniSpinner /> : "Update"}
        </Button>
      </div>
    </form>
  );
}

export default UserSettings;
