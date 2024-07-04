import { TextField } from "@mui/material";
import styles from "./SmartSearchMultipleInput.module.scss";
import { useEffect, useReducer } from "react";
import {
  initialState,
  reducerFn,
  SmartSearchActions,
} from "./MultipleSearchInputReducer";
import useClickOutside from "@/hooks/useClickOutside";
import SelectedItem from "./SelectedItem/SelectedItem";

function SmartSearchMultipleInput({
  data,
  onChange,
  name,
  placeholder,
  textLabel,
  getSmartSearchValue,
  disabled,
}) {
  const [smartSearchMultipleState, dispatch] = useReducer(
    reducerFn,
    initialState
  );

  function action(type, payload = null) {
    dispatch({ type, payload });
  }

  useEffect(() => {
    onChange(smartSearchMultipleState.multipleItemsId);
  }, [smartSearchMultipleState.multipleItemsId, onChange]);

  useEffect(() => {
    if (data?.length > 0) {
      action(SmartSearchActions.OPEN_MENU);
    } else {
      action(SmartSearchActions.CLOSE_MENU);
    }
  }, [data?.length]);

  useEffect(() => {
    if (getSmartSearchValue) {
      getSmartSearchValue(smartSearchMultipleState.inputValue);
    }
  }, [getSmartSearchValue, smartSearchMultipleState.inputValue]);

  const menuRef = useClickOutside({
    close: (v) => action(SmartSearchActions.CLOSE_MENU),
    value: false,
  });

  function hanldeDelete(item) {
    action(SmartSearchActions.ADD_ITEM, {
      name: item.name,
      value: item["_id"],
    });

    action(SmartSearchActions.ADD_ID, { value: item["_id"] });
  }

  return (
    <div className="relative w-full">
      <div className="relative flex flex-col gap-4">
        {<label className="font-semibold text-xl">{textLabel}</label>}
        <TextField
          disabled={disabled}
          className=" w-full"
          placeholder={placeholder}
          onChange={(e) =>
            action(SmartSearchActions.CHANGE_INPUT, { value: e.target.value })
          }
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
      </div>

      <ul
        ref={menuRef}
        style={{ height: smartSearchMultipleState.openMenu ? "150px" : "0" }}
        className={styles["smartSearchList"]}
      >
        {data?.map((item) => {
          return (
            <li
              style={{
                backgroundColor:
                  smartSearchMultipleState.multipleItemsId.includes(item["_id"])
                    ? "#1ca56aa4 "
                    : "",
                color: smartSearchMultipleState.multipleItemsId.includes(
                  item["_id"]
                )
                  ? "white"
                  : "",
              }}
              key={item.name}
              onClick={() =>
                smartSearchMultipleState.multipleItemsId.includes(item["_id"])
                  ? null
                  : hanldeDelete(item)
              }
            >
              {item.name}
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
              onClick={
                disabled
                  ? null
                  : () => {
                      action(SmartSearchActions.DELETE_ITEM, {
                        value: item.name,
                      });
                      action(SmartSearchActions.DELETE_ID, {
                        value: item.value,
                      });
                    }
              }
              key={item.name}
              item={item}
            />
          );
        })}
        {smartSearchMultipleState.multipleItems.length > 0 && (
          <span
            onClick={disabled ? null : () => action(SmartSearchActions.RESET)}
            className={styles["smartSearchList__close"]}
          >
            clear All
          </span>
        )}
      </ul>
    </div>
  );
}

export default SmartSearchMultipleInput;
