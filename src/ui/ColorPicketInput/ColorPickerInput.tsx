"use client";

import { useEffect, useState } from "react";
import nearestColor from "nearest-color";
import { colorsOptions } from "@/constants/colorOptions";
import Image from "next/image";
import toast from "react-hot-toast";
import { HiMiniPlusCircle } from "react-icons/hi2";

const DEFAULT_COLOR = "#000000";

function ColorPickerInput({ options, disabled, onSelectColorHandler }) {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  const nearest = nearestColor.from(colorsOptions);

  const getColorNameFromHex = (hex: string) => {
    const color = nearest(hex);

    return color ? color.name : "Unknown Color";
  };

  useEffect(() => {
    if (disabled) {
      setColor(DEFAULT_COLOR);
    }
  }, [disabled]);

  function handleAddColor() {
    if (!color) return;

    const colorName = getColorNameFromHex(color);

    const existedColor = options.find((color) => color.label === colorName);

    if (existedColor) {
      toast.error("This color is already exist");
      return;
    }

    const newColor = { value: colorName, label: colorName, color };

    onSelectColorHandler(newColor, "select-option");

    setColor(DEFAULT_COLOR);

    toast.success("A new color is added");
  }

  return (
    <div className="flex items-center gap-2 ">
      <div className="relative">
        <input
          disabled={disabled}
          type="color"
          className="absolute w-full h-full opacity-0"
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <Image src="/color-wheel.png" alt="img" height={25} width={25} />
      </div>

      <div style={{ fontSize: "18px", lineHeight: "0" }}>
        <button style={{ color: color }} onClick={handleAddColor} type="button">
          <HiMiniPlusCircle />
        </button>
      </div>
    </div>
  );
}

export default ColorPickerInput;
