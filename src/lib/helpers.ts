import { AdminProductProps } from "@/types/types";

export const getAddProductServerData = (data: AdminProductProps) => {
  const formData = new FormData();

  const excludeKeys = [
    "images",
    "subCategory",
    "colors",
    "colors-quantity",
    "quantity",
  ];

  for (let key in data) {
    if (excludeKeys.includes(key)) continue;

    if (typeof data[key] !== "object") {
      formData.append(key, data[key]);
    }
    if (typeof data[key] === "object") {
      formData.append(key, JSON.stringify(data[key]));
    }
  }

  data.colors.forEach((color) => {
    formData.append(
      "colors",
      JSON.stringify({
        ...color,
        quantity: +data[`colors-quantity`][color.label],
      })
    );
  });

  formData.append(
    "quantity",
    JSON.stringify(getSumFrom(data["colors"], data[`colors-quantity`]))
  );

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

export function getSumFrom(list, matchedList, matchedKey = "label") {
  return list
    .map((item) => {
      if (!matchedList?.[item[matchedKey || "label"]]) return 0;
      return +matchedList?.[item[matchedKey || "label"]];
    })
    .reduce((acc, cur) => acc + cur, 0);
}

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

export function getCookie(name) {
  if (typeof document === "undefined") {
    // document is not available (e.g., during server-side rendering)
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
