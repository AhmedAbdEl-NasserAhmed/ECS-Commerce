"use client";

import nearestColor from "nearest-color";

import { useState } from "react";
import { colorsOptions } from "@/constants/colorOptions";
import Image from "next/image";
import toast from "react-hot-toast";
import { HiMiniPlusCircle } from "react-icons/hi2";

const DEFAULT_COLOR = "#000000";

function ColorPickerInput({ setColorOptions, colorsOption }) {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  const nearest = nearestColor.from(colorsOptions);

  const getColorNameFromHex = (hex: string) => {
    const color = nearest(hex);

    return color ? color.name : "Unknown Color";
  };

  function handleAddColor() {
    if (!color) return;

    const colorName = getColorNameFromHex(color);

    const existedColor = colorsOption.find(
      (color) => color.label === colorName
    );

    if (existedColor) {
      toast.error("This color is already exist");
      return;
    }

    const newColor = { value: colorName, label: colorName, color };

    setColorOptions((data) => [...data, newColor]);

    setColor(DEFAULT_COLOR);
  }

  return (
    <>
      <div
        style={{ right: "45px", top: "38px" }}
        className="absolute z-10 flex flex-col gap-10 pointer cursor-pointer"
      >
        <input
          type="color"
          className="absolute w-full h-full opacity-0"
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <Image src="/color-wheel.png" alt="img" height={20} width={20} />
      </div>
      <div
        style={{ right: "80px", top: "38px", fontSize: "20px" }}
        className="absolute z-10 "
      >
        <button style={{ color: color }} onClick={handleAddColor} type="button">
          <HiMiniPlusCircle />
        </button>
      </div>
    </>
  );
}

export default ColorPickerInput;
