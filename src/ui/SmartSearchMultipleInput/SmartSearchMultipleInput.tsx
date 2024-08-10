import { TextField } from "@mui/material";
import styles from "./SmartSearchMultipleInput.module.scss";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  initialState,
  reducerFn,
  SmartSearchActions,
} from "./MultipleSearchInputReducer";
import useClickOutside from "@/hooks/useClickOutside";
import SelectedItem from "./SelectedItem/SelectedItem";
import MiniSpinner from "../MiniSpinner/MiniSpinner";

function SmartSearchMultipleInput({
  data,
  onChange,
  name,
  placeholder,
  textLabel,
  getSmartSearchValue,
  disabled,
  shouldReset,
  existedItems,
  isFetching,
  onBlur = null,
  onFocus = null,
  lang,
}) {
  console.log("lang", lang);
  const [smartSearchMultipleState, dispatch] = useReducer(
    reducerFn,
    initialState
  );

  function action(type, payload = null) {
    dispatch({ type, payload });
  }

  useEffect(() => {
    if (existedItems?.length > 0) {
      action(SmartSearchActions.DEFAULT_VALUE, { value: existedItems });
      action(SmartSearchActions.DEFAULT_IDS_VALUE, {
        value: existedItems
          .filter((item) => item["_id"])
          .map((item) => item["_id"]),
      });
    }
  }, [existedItems]);

  useEffect(() => {
    if (shouldReset) {
      action(SmartSearchActions.RESET);
    }
  }, [shouldReset]);

  useEffect(() => {
    onChange(smartSearchMultipleState.multipleItems);
  }, [smartSearchMultipleState.multipleItems, onChange]);

  useEffect(() => {
    if (smartSearchMultipleState.inputValue) {
      action(SmartSearchActions.OPEN_MENU);
    } else {
      action(SmartSearchActions.CLOSE_MENU);
    }
  }, [smartSearchMultipleState.inputValue]);

  useEffect(() => {
    if (getSmartSearchValue) {
      getSmartSearchValue(smartSearchMultipleState.inputValue);
    }
  }, [getSmartSearchValue, smartSearchMultipleState.inputValue]);

  const menuRef = useClickOutside({
    close: (v) => action(SmartSearchActions.CLOSE_MENU),
    value: false,
  });

  function hanldeAdditem(item) {
    action(SmartSearchActions.ADD_ITEM, {
      name: {
        [lang]: item.name[lang],
      },
      value: item["_id"],
    });

    onBlurHandler();

    action(SmartSearchActions.RESET_INPUT_VALUE);

    action(SmartSearchActions.ADD_ID, { value: item["_id"] });
  }

  const onBlurHandler = () => {
    if (onBlur) return onBlur();
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
          // disabled={disabled}
          className=" w-full"
          placeholder={placeholder}
          onChange={(e) => {
            action(SmartSearchActions.CHANGE_INPUT, { value: e.target.value });
            onFocusHandler(e);
          }}
          name={name}
          value={smartSearchMultipleState.inputValue}
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
                borderRadius: "1rem",

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
        />

        {isFetching && (
          <span
            className="absolute w-6 h-6 "
            style={{ top: "60%", insetInlineEnd: "15px" }}
          >
            <MiniSpinner />
          </span>
        )}
      </div>

      <ul
        ref={menuRef}
        style={{ height: smartSearchMultipleState.openMenu ? "150px" : "0" }}
        className={styles["smartSearchList"]}
      >
        {!data?.length && (
          <div className="flex justify-center items-center h-full font-semibold text-xl">
            <p>No Collections Available</p>
          </div>
        )}

        {data?.map((item) => {
          return (
            <li
              className="text-[#161616} font-semibold capitalize"
              style={{
                backgroundColor:
                  smartSearchMultipleState.multipleItemsId?.includes(
                    item["_id"]
                  )
                    ? "#ed0533 "
                    : "",
                color: smartSearchMultipleState.multipleItemsId?.includes(
                  item["_id"]
                )
                  ? "white"
                  : "",
              }}
              key={item.name[lang]}
              onClick={() =>
                smartSearchMultipleState.multipleItemsId?.includes(item["_id"])
                  ? null
                  : hanldeAdditem(item)
              }
            >
              {item.name[lang]}
            </li>
          );
        })}
      </ul>
      <ul
        style={{ marginTop: "10px" }}
        className="flex items-center gap-5 flex-wrap "
      >
        {smartSearchMultipleState.multipleItems.map((item) => {
          return (
            <SelectedItem
              disabled={disabled}
              onClick={
                disabled
                  ? null
                  : () => {
                      action(SmartSearchActions.DELETE_ITEM, {
                        value: item.name[lang],
                        lang: lang,
                      });
                      action(SmartSearchActions.DELETE_ID, {
                        value: item["_id"],
                      });
                    }
              }
              key={item.name[lang]}
              lang={lang}
              item={item}
            />
          );
        })}
        {smartSearchMultipleState.multipleItems.length > 0 && (
          <span
            onClick={disabled ? null : () => action(SmartSearchActions.RESET)}
            className={`${styles["smartSearchList__close"]} ${
              disabled ? "opacity-30" : "opacity-100"
            } `}
          >
            clear All
          </span>
        )}
      </ul>
    </div>
  );
}

export default SmartSearchMultipleInput;
