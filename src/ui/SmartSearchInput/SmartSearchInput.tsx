import useClickOutside from "@/hooks/useClickOutside";
import { TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import styles from "./SmartSearchInput.module.scss";
import {
  SmartSearchActions,
  initialState,
  reducerFn,
} from "./smartSearchInputReducer";
import MiniSpinner from "../MiniSpinner/MiniSpinner";

function SmartSearchInput({
  data,
  onChange,
  name,
  placeholder,
  errors,
  textLabel,
  getSmartSearchValue,
  shouldReset,
  notAvailableMessage,
  value = "",
  disabled,
  isFetching,
  defaultValue,
  onFocus = null,
  onBlur = null,
  lang,
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
    if (defaultValue && !value) {
      if (defaultValue !== "" && smartSearchState.inputValue === "") {
        action(SmartSearchActions.SELECT_ITEM, {
          value: defaultValue,
        });
      }
    }
  }, [defaultValue, getSmartSearchValue, smartSearchState.inputValue, value]);

  useEffect(() => {
    if (shouldReset) {
      action(SmartSearchActions.RESET);
    }
  }, [shouldReset]);

  useEffect(() => {
    if (getSmartSearchValue && !smartSearchState.userSelectedValue) {
      getSmartSearchValue((prev) => ({
        ...prev,
        name: smartSearchState.inputValue,
      }));
    }
  }, [
    smartSearchState.inputValue,
    getSmartSearchValue,
    defaultValue,
    smartSearchState.userSelectedValue,
  ]);

  useEffect(() => {
    if (
      smartSearchState.inputValue !== "" &&
      smartSearchState.userSelectedValue === ""
    ) {
      action(SmartSearchActions.OPEN_MENU);
    } else {
      action(SmartSearchActions.CLOSE_MENU);
    }
  }, [
    data?.length,
    smartSearchState.inputValue,
    smartSearchState.userSelectedValue,
  ]);

  const onSelectItem = (data) => {
    onChange(data?.name?.[lang]);
    action(SmartSearchActions.SELECT_ITEM, { value: data?.name?.[lang] });
    if (getSmartSearchValue) {
      getSmartSearchValue(data);
    }
  };

  useEffect(() => {
    if (value && lang) {
      onSelectItem(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, lang]);

  const onBlurHandler = () => {
    if (onBlur) return onBlur;
    return;
  };

  const onFocusHandler = (e) => {
    if (onFocus) return onFocus(e);
    return;
  };

  return (
    <div className="relative w-full">
      <div className="relative flex flex-col gap-4">
        {<label className="font-semibold text-xl">{textLabel}</label>}
        <TextField
          onBlur={onBlurHandler}
          // onFocus={onFocusHandler}
          error={!!errors}
          helperText={errors?.message || ""}
          FormHelperTextProps={{ style: { fontSize: "1rem" } }}
          disabled={disabled}
          style={{
            backgroundColor:
              smartSearchState.userSelectedValue !== "" ? "#f5f5f5" : "",
          }}
          className=" w-full"
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            action(SmartSearchActions.CHANGE_INPUT, { value: e.target.value });
            onFocusHandler(e);
          }}
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
                borderColor: "rgb(186, 9, 9)",
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

        {isFetching && (
          <span
            className="absolute w-6 h-6 "
            style={{ top: "60%", right: "15px" }}
          >
            <MiniSpinner />
          </span>
        )}

        {smartSearchState.userSelectedValue !== "" && !isFetching && (
          <span
            onClick={
              disabled
                ? null
                : () => {
                    onChange("");
                    action(SmartSearchActions.RESET);
                    getSmartSearchValue({
                      id: "",
                      name: "",
                    });
                  }
            }
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
        {!data?.length && (
          <div className="flex justify-center items-center h-full font-semibold text-xl">
            <p>{notAvailableMessage}</p>
          </div>
        )}

        {data?.map((item) => {
          return (
            <li
              className="text-[#161616} font-semibold capitalize"
              key={item.name[lang || ""]}
              onClick={
                disabled
                  ? null
                  : () => {
                      onSelectItem(item);
                    }
              }
            >
              {item.name[lang || ""]}{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SmartSearchInput;
