"use client";

import { useState } from "react";
import { InputProps } from "../../types/types";
import DynamicPlaceHolder from "../DynamicPlaceHolder/DynamicPlaceHolder";
import styles from "./Input.module.scss";

function Input({ type, placeholder, extraPlaceholder }: InputProps) {
  const [value, setValue] = useState<string>("");

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.input}
        placeholder={placeholder}
        type={type}
      />
      {extraPlaceholder && (
        <DynamicPlaceHolder
          className={value !== "" ? "not-empty" : ""}
          extraPlaceholder={extraPlaceholder}
        />
      )}
    </div>
  );
}

export default Input;
