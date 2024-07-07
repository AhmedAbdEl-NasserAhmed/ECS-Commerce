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
  existedColors,
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
      width: "100%",
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

  const [selectedColors, setSelectedColors] = useState([...existedColors]);

  const [alreadySelectedColors, setAlreadySelectedColors] = useState([
    ...colorPickerDefaultColors,
  ]);

  useEffect(() => {
    if (field.value.length === 0) {
      onSelectColorHandler(undefined, "clear");
    }
  }, [field.value]);

  useEffect(() => {
    if (selectedColors.length > 0) {
      onChange(selectedColors);
    }
  }, [selectedColors]);

  const addToList = (color) => {
    const alreadyDefaultColor = colorPickerDefaultColors.some(
      (defaultColor) => defaultColor.value === color.value
    );

    console.log("alreadyDefaultColor", alreadyDefaultColor);

    setAlreadySelectedColors((state) => {
      if (alreadyDefaultColor) return state;
      return state.concat(color);
    });
  };

  const onSelectColorHandler = (color, actionType) => {
    switch (actionType) {
      case "select-option":
        setSelectedColors((state) => state.concat(color));
        addToList(color);
        break;
      case "remove-value":
        setSelectedColors((state) =>
          state.filter((c) => c.value !== color.value)
        );
        break;
      case "clear":
        setSelectedColors([]);
        setAlreadySelectedColors(colorPickerDefaultColors);
        break;
    }
  };

  return (
    <Box className="flex flex-col flex-wrap gap-4">
      {textLabel && <label className={textLabelClass}>{textLabel}</label>}
      <Box className="flex gap-2">
        <Box className="grow">
          <Select
            {...field}
            onChange={(value, selectedItem) => {
              onChange(value);
              const lastActionOption =
                selectedItem.removedValue || selectedItem.option;
              onSelectColorHandler(lastActionOption, selectedItem.action);
            }}
            instanceId={useId()}
            isDisabled={disabled}
            placeholder={placeholder}
            className={className}
            closeMenuOnSelect={true}
            menuShouldScrollIntoView={true}
            isMulti={isMulti}
            options={[...alreadySelectedColors, ...selectedColors]}
            styles={colourStyles}
          />
        </Box>
        <ColorPickerInput
          options={alreadySelectedColors}
          onSelectColorHandler={onSelectColorHandler}
          disabled={disabled}
        />
      </Box>
      {errors[name] && <ErrorMessage message={errors[name]?.message} />}
    </Box>
  );
}

export default BaseColorPicker;
