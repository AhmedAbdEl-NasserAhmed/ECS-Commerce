import { AdminProductProps } from "@/types/types";

export const getAddProductServerData = (data: AdminProductProps) => {
  const formData = new FormData();

  const excludeKeys = ["images"];

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
      formData.append("images", data["images"][imageKey]);
    }
  });

  return formData;
};
