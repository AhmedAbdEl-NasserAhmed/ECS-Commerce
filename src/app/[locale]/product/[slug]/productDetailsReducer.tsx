import { AdminProductProps } from "@/types/types";

enum ProductDetailsAction {
  SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT",
}

export const initialState = {
  selectedProduct: {} as AdminProductProps,
  currentProductIndex: 0 as number,
  imageIndex: 0 as number,
  selectedColor: { color: "", value: "", label: "", quantity: 0 } as {
    value: string;
    color: string;
    label: string;
    quantity: number;
  },
  productQuantity: 0 as number,
  isColorExisted: false as boolean,
};

export function reducerFn(state = initialState, action) {}
