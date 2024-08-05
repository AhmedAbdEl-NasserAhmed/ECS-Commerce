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

  Array.from(data.subCategory[lang]).forEach((subCategory) => {
    formData.append("subCategory", subCategory[lang]);
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

export const formatCurrency = (n: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EGP",
  }).format(n);
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
