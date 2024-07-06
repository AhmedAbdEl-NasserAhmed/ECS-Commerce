import { AdminProductProps } from "@/types/types";
import { useRouter } from "next/router";

export const getAddProductServerData = (data: AdminProductProps) => {
  const formData = new FormData();

  const excludeKeys = ["images", "subCategory"];

  for (let key in data) {
    if (excludeKeys.includes(key)) continue;

    if (typeof data[key] !== "object") {
      formData.append(key, data[key]);
    }
    if (typeof data[key] === "object") {
      formData.append(key, JSON.stringify(data[key]));
    }
  }

  Object.keys(data.images).forEach((imageKey) => {
    if (data["images"]?.[imageKey]) {
      if (data["images"][imageKey] instanceof File) {
        formData.append("images", data["images"][imageKey]);
      } else {
        formData.append("images", JSON.stringify(data["images"][imageKey]));
      }
    }
  });

  Array.from(data.subCategory).forEach((subCategory) => {
    formData.append("subCategory", subCategory);
  });

  return formData;
};

export function getUniqueValues(arr, value) {
  const uniqueItems = new Set();

  return arr?.filter((item) => {
    const duplicatedValue = item[value];
    if (uniqueItems.has(duplicatedValue)) {
      return false;
    } else {
      uniqueItems.add(duplicatedValue);
      return true;
    }
  });
}
