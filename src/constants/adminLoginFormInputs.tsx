import { IconButton, InputAdornment } from "@mui/material";
import { emailRegex } from "./regx";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export function adminLoginFormInputs(
  showPassword: boolean,
  handleClickShowPassword: () => void
) {
  return [
    {
      id: "1",
      name: "loginEmail",
      textlabel: "User Name",
      defaultValue: "",
      rules: {
        required: "Please Enter A Valid Email",
        pattern: {
          value: emailRegex,
          message: "Please Enter Valid Email Format",
        },
      },
      formerHelperStyles: { style: { fontSize: "1rem" } },
      placeholder: "Enter username",
      type: "text",
      sx: {
        helperText: {
          fontSize: "4rem",
        },
        input: {
          fontSize: "1.4rem",
        },

        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: "1px",
            borderRadius: "40px",
            borderColor: "#dcdbdb",
            backgroundColor: "#ffffff52",
          },

          "& .MuiInputBase-input": {
            paddingBlock: "1rem",
            paddingInline: "1.8rem",
            fontSize: "1.5rem",
            color: "#525151",

            "&::placeholder": {
              color: "#939393",
              fontSize: "1.5rem",
              opacity: 1,
            },
          },

          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
          },

          "&:hover fieldset": {
            borderColor: "#dcdbdb",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#dcdbdb",
          },
        },
      },
    },
    {
      id: "2",
      name: "loginPassword",
      textlabel: "Password",
      defaultValue: "",
      rules: {
        required: "Please Enter A Valid password",
      },
      formerHelperStyles: { style: { fontSize: "1rem" } },
      placeholder: "Enter password",
      type: showPassword ? "text" : "password",
      sx: {
        helperText: {
          fontSize: "4rem",
        },
        input: {
          fontSize: "1.4rem",
        },

        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: "1px",
            borderRadius: "40px",
            borderColor: "#dcdbdb",
            backgroundColor: "#ffffff52",
          },

          "& .MuiInputBase-input": {
            paddingBlock: "1rem",
            paddingInline: "1.8rem",
            fontSize: "1.5rem",
            color: "#525151",

            "&::placeholder": {
              color: "#939393",
              fontSize: "1.5rem",
              opacity: 1,
            },
          },

          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
          },

          "&:hover fieldset": {
            borderColor: "#dcdbdb",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#dcdbdb",
          },
        },
      },
      inputProps: {
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
      },
    },
  ];
}
