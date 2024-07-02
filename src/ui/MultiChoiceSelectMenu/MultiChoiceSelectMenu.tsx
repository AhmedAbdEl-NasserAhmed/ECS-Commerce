"use client";

import chroma from "chroma-js";

import { ColourOption, SelecteMenuProps } from "../../types/types";
import Select, { StylesConfig } from "react-select";
import { useId } from "react";
import { Box } from "@mui/material";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function MultiChoiceSelectMenu({
  field,
  className,
  options,
  textLabelClass,
  placeholder,
  textLabel,
  name,
  isMulti,
  errors,
}: SelecteMenuProps) {
  const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "white",
      fontSize: "1.2rem",

      borderColor: `${
        errors[name]
          ? "rgb(186, 9, 9)"
          : state.isFocused
          ? "#dcdbdb"
          : "#e7e7e7"
      }`,
      boxShadow: "none",
      borderRadius: "10px",
      "&:hover": {
        borderColor: `${errors[name] ? "rgb(186, 9, 9)" : "#e7e7e7"}`,
      },
      height: "42px",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#b0b0b0",
      opacity: 1,
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
          ? ""
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
    <Box className="flex flex-col gap-4 ">
      {textLabel && <label className={textLabelClass}>{textLabel}</label>}
      <Select
        {...field}
        instanceId={useId()}
        placeholder={placeholder}
        className={className}
        closeMenuOnSelect={true}
        menuShouldScrollIntoView={true}
        isMulti={isMulti}
        options={options}
        styles={colourStyles}
      />
      {errors[name] && <ErrorMessage message={errors[name]?.message} />}
    </Box>
  );
}

export default MultiChoiceSelectMenu;
