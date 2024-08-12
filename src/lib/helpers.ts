import { AdminProductProps } from "@/types/types";

export const getAddProductServerData = (
  data: AdminProductProps,
  lang: string
) => {
  const formData = new FormData();

  const excludeKeys = [
    "images",
    "subCategory",
    "colors",
    "colors-quantity",
    "quantity",
    "name-en",
    "name-ar",
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

  const nameEnValue = data?.["name-en"];

  const nameArValue = data?.["name-ar"];

  const nameValue =
    typeof data?.["name-en"] === "string"
      ? { en: nameEnValue, ar: nameArValue }
      : nameEnValue;

  formData.append("name", JSON.stringify(nameValue));

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
    formData.append("subCategory", subCategory["_id"]);
  });

  return formData;
};

export function getSumFrom(list, matchedList, matchedKey = "label") {
  return list
    ?.map((item) => {
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

export function concatCartItemsHandler(arr1, arr2) {
  let concatedArr = [];

  if (arr1) {
    concatedArr = concatedArr.concat(arr1);
  }

  if (arr2) {
    concatedArr = concatedArr.concat(arr2);
  }

  return concatedArr;
}

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

export const formatCurrency = (n: number, locale: string = "en" as string) => {
  const _locale = locale === "en" ? "en-US" : "ar-EG";
  return (n || 0).toLocaleString(_locale, {
    style: "currency",
    currency: "EGP",
  });
};

export const groupBy = function (list, groupKey = "name") {
  if (!list) return {};
  let output = {};

  for (let i = 0; i < list.length; i++) {
    if (list[i][groupKey] in output) {
      output[list[i][groupKey]] = output[list[i][groupKey]].concat(list[i]);
    } else {
      output[list[i][groupKey]] = [list[i]];
    }
  }

  return output;
};

export function prepareUsersAnalyticsData(users) {
  return sortCategorizedUsersByDayMonth(groupByUsersByDate(users));
}

export function groupByUsersByDate(users) {
  const categorizedUsers = groupBy(
    users?.map((user) => ({
      ...user,
      createdAt: `${new Date(user?.createdAt).getDate()}/${
        new Date(user?.createdAt).getMonth() + 1
      }`,
    })),
    "createdAt"
  );
  return categorizedUsers;
}
function sortCategorizedUsersByDayMonth(categorizedList) {
  return Object.keys(categorizedList)
    ?.sort((a, b) => {
      const dayA = +a.split("/")[0];
      const dayB = +b.split("/")[0];
      return dayA - dayB;
    })
    .sort((a, b) => {
      const monthA = +a.split("/")[1];
      const monthB = +b.split("/")[1];
      return monthA - monthB;
    });
}

export function getExpirationDateFromToken(token) {
  // Split the token into its three parts
  const parts = token.split(".");

  // Decode the payload (the second part of the token)
  const payload = JSON.parse(base64UrlDecode(parts[1]));

  // Extract the expiration time (exp) and convert to a JavaScript Date
  const expirationDate = new Date(payload.exp * 1000);

  // Log the expiration date
  return expirationDate.toString();
}

// Function to decode base64 URL encoded string
function base64UrlDecode(str) {
  // Convert Base64URL to Base64 by replacing characters
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Decode the Base64 string
  return decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}
