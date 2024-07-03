import useClickOutside from "@/hooks/useClickOutside";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./SmartSearchInput.module.scss";

console.log(styles["smartSearchList"]);

function SmartSearchInput({
  data,
  onChange,
  name,

  placeholder,
  textLabel,
  getSmartSearchValue,
}) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const [inputValue, setInputvalue] = useState<string>("");

  const [userSelectedValue, setUserSelectedValue] = useState<string>("");

  const menuRef = useClickOutside({ close: setOpenMenu, value: false });

  useEffect(() => {
    if (getSmartSearchValue) {
      getSmartSearchValue(inputValue);
    }
  }, [inputValue, getSmartSearchValue]);

  useEffect(() => {
    if (data?.length > 0 && userSelectedValue === "") {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }, [data?.length, userSelectedValue]);

  return (
    <div className="w-full">
      <div className="relative flex flex-col gap-4">
        {<label className="font-semibold text-xl">{textLabel}</label>}
        <TextField
          style={{ backgroundColor: userSelectedValue !== "" ? "#f5f5f5" : "" }}
          className=" w-full"
          placeholder={placeholder}
          onChange={(e) => setInputvalue(e.target.value)}
          name={name}
          value={inputValue}
          sx={{
            helperText: {
              fontSize: "4rem",
            },
            input: {
              fontSize: "1.4rem",
            },

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "10px",
                borderColor: "#dcdbdb",
                backgroundColor: "#ffffff52",
              },

              "& .MuiInputBase-input": {
                backgroundColor: "none",
                paddingBlock: "1rem",
                paddingInline: "1.8rem",
                color: "#383737",

                "&::placeholder": {
                  color: "#939393",
                  fontSize: "1.2rem",
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
          }}
          inputProps={{ readOnly: userSelectedValue !== "" }}
        />
        {userSelectedValue !== "" && (
          <span
            onClick={() => {
              setUserSelectedValue("");
              setInputvalue("");
              onChange("");
            }}
            style={{ top: "60%", right: "15px", cursor: "pointer" }}
            className={styles["close-btn"]}
          >
            X
          </span>
        )}
      </div>

      <ul
        ref={menuRef}
        style={{ height: openMenu ? "150px" : "0" }}
        className={styles["smartSearchList"]}
      >
        {data?.map((user) => {
          return (
            <li
              key={user.id}
              onClick={() => {
                onChange(user.name);
                setInputvalue(user.name);
                setUserSelectedValue(user.name);
                setOpenMenu(false);
              }}
            >
              {user.name}{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SmartSearchInput;
