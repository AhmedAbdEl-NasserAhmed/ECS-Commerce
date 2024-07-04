import useClickOutside from "@/hooks/useClickOutside";
import { TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import styles from "./SmartSearchInput.module.scss";
import {
  SmartSearchActions,
  initialState,
  reducerFn,
} from "./smartSearchInputReducer";

function SmartSearchInput({
  data,
  onChange,
  name,
  placeholder,
  textLabel,
  getSmartSearchValue,
  shouldReset,
}) {
  const [smartSearchState, dispatch] = useReducer(reducerFn, initialState);

  function action(type, payload = null) {
    dispatch({ type, payload });
  }

  const menuRef = useClickOutside({
    close: (v) => action(SmartSearchActions.CLOSE_MENU),
    value: false,
  });

  useEffect(() => {
    if (shouldReset) {
      action(SmartSearchActions.RESET);
    }
  }, [shouldReset]);

  useEffect(() => {
    if (getSmartSearchValue) {
      getSmartSearchValue((prev) => ({
        ...prev,
        name: smartSearchState.inputValue,
      }));
    }
  }, [smartSearchState.inputValue, getSmartSearchValue]);

  useEffect(() => {
    if (data?.length > 0 && smartSearchState.userSelectedValue === "") {
      action(SmartSearchActions.OPEN_MENU);
    } else {
      action(SmartSearchActions.CLOSE_MENU);
    }
  }, [data?.length, smartSearchState.userSelectedValue]);

  return (
    <div className="relative w-full">
      <div className="relative flex flex-col gap-4">
        {<label className="font-semibold text-xl">{textLabel}</label>}
        <TextField
          style={{
            backgroundColor:
              smartSearchState.userSelectedValue !== "" ? "#f5f5f5" : "",
          }}
          className=" w-full"
          placeholder={placeholder}
          onChange={(e) =>
            action(SmartSearchActions.CHANGE_INPUT, { value: e.target.value })
          }
          name={name}
          value={smartSearchState.inputValue}
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
          inputProps={{ readOnly: smartSearchState.userSelectedValue !== "" }}
        />
        {smartSearchState.userSelectedValue !== "" && (
          <span
            onClick={() => {
              onChange("");
              action(SmartSearchActions.RESET);
              getSmartSearchValue({
                id: "",
                name: "",
              });
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
        style={{ height: smartSearchState.openMenu ? "150px" : "0" }}
        className={styles["smartSearchList"]}
      >
        {data?.map((user) => {
          return (
            <li
              key={user.name}
              onClick={() => {
                onChange(user.name);
                action(SmartSearchActions.SELECT_ITEM, { value: user.name });
                if (getSmartSearchValue) {
                  getSmartSearchValue(user);
                }
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
