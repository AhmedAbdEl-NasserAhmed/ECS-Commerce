"use client";

import chroma from "chroma-js";

import { ColourOption, SelecteMenuProps } from "../../types/types";
import Select, { StylesConfig } from "react-select";
import { useId } from "react";
import { Box } from "@mui/material";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function SelectMenu({
  field,
  className,
  hasError,
  options,
  placeholder,
  name,
  errors,
}: SelecteMenuProps) {
  const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      borderColor: `${hasError ? "rgb(186, 9, 9)" : "#3dbadd"}`,
      borderRadius: "5px",
      borderWidth: "2px",
      ":hover": {
        borderColor: `${hasError ? "rgb(186, 9, 9)" : "#3dbadd"}`,
      },
      ":focus": {
        borderColor: `${hasError ? "rgb(186, 9, 9)" : "#3dbadd"}`,
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  return (
    <Box component="div" className="flex flex-col gap-2 ">
      <Select
        {...field}
        instanceId={useId()}
        placeholder={placeholder}
        className={className}
        closeMenuOnSelect={false}
        menuShouldScrollIntoView={true}
        isMulti
        options={options}
        styles={colourStyles}
      />
      {errors[name] && <ErrorMessage message={errors[name]?.message} />}
    </Box>
  );
}

export default SelectMenu;
