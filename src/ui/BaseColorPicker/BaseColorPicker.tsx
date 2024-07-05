"use client";

import chroma from "chroma-js";

import { ColourOption, BaseColorPickerProps } from "../../types/types";
import Select, { StylesConfig } from "react-select";
import { useEffect, useId, useState } from "react";
import { Box } from "@mui/material";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ColorPickerInput from "../ColorPicketInput/ColorPickerInput";
import { colorPickerDefaultColors } from "@/constants/colorOptions";

function BaseColorPicker({
  field,
  className,
  textLabelClass,
  placeholder,
  textLabel,
  name,
  isMulti,
  errors,
  disabled,
  onChange,
}: BaseColorPickerProps) {
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
      width: "85%",
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

  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    if (selectedColors.length > 0) {
      onChange(selectedColors);
    }
  }, [selectedColors]);

  const onSelectColorHandler = (color) => {
    setSelectedColors((state) => state.concat(color));
  };

  return (
    <Box className="flex flex-col gap-4 ">
      {textLabel && <label className={textLabelClass}>{textLabel}</label>}
      <Box className="relative">
        <Select
          {...field}
          instanceId={useId()}
          isDisabled={disabled}
          placeholder={placeholder}
          className={className}
          closeMenuOnSelect={true}
          menuShouldScrollIntoView={true}
          isMulti={isMulti}
          options={[...colorPickerDefaultColors, ...selectedColors]}
          styles={colourStyles}
        />
        <ColorPickerInput
          options={colorPickerDefaultColors}
          onSelectColorHandler={onSelectColorHandler}
          disabled={disabled}
        />
      </Box>
      {errors[name] && <ErrorMessage message={errors[name]?.message} />}
    </Box>
  );
}

export default BaseColorPicker;
