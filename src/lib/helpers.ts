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

export function getUniqueValues(arr, values: string[]) {
  const uniqueItems = new Set();

  return arr?.filter((item) => {
    if (!item) return;
    const compositeKey = values?.map((value) => item[value])?.join("|");
    if (uniqueItems.has(compositeKey)) {
      return false;
    } else {
      uniqueItems.add(compositeKey);
      return true;
    }
  });
}

export const queryBuilder = (query) => {
  let queryString = "";

  for (let key in query) {
    queryString += `${key}=${query[key]}`;
    queryString += "&";
  }

  return queryString.slice(0, -1);
};

export function isProductExisted(uniquteValues: string[], value: string, arr) {
  const uniqueProducts = [];

  if (!arr) return;

  arr?.map((item) => {
    if (uniquteValues.includes(item[value])) {
      return;
    } else {
      uniqueProducts.push(item);
    }
  });
  return uniqueProducts;
}

export const formatCurrency = (n: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
  }).format(n);
};
