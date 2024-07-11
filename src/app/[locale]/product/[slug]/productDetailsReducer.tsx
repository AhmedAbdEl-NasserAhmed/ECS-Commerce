import { AdminProductProps } from "@/types/types";

export enum ProductDetailsAction {
  SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT",
  SET_CURRENT_PRODUCT_INDEX = "SET_CURRENT_PRODUCT_INDEX",
  SET_IMAGE_INDEX = "SET_IMAGE_INDEX",
  SET_SELECTED_COLOR = "SET_SELECTED_COLOR",
  SET_PRODUCT_QUANTITY = "SET_PRODUCT_QUANTITY",
  SET_COLOR_EXISTED = "SET_COLOR_EXISTED",
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

export function reducerFn(state = initialState, action) {
  if (action.type === ProductDetailsAction.SET_SELECTED_PRODUCT) {
    return { ...state, selectedProduct: action.payload.value };
  }

  if (action.type === ProductDetailsAction.SET_CURRENT_PRODUCT_INDEX) {
    return { ...state, currentProductIndex: action.payload.value };
  }

  if (action.type === ProductDetailsAction.SET_IMAGE_INDEX) {
    return { ...state, imageIndex: action.payload.value };
  }

  if (action.type === ProductDetailsAction.SET_SELECTED_COLOR) {
    return { ...state, selectedColor: action.payload.value };
  }

  if (action.type === ProductDetailsAction.SET_PRODUCT_QUANTITY) {
    return { ...state, productQuantity: action.payload.value };
  }

  if (action.type === ProductDetailsAction.SET_COLOR_EXISTED) {
    return { ...state, isColorExisted: action.payload.value };
  }
}
