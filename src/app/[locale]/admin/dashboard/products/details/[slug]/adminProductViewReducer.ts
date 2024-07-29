import { AdminProductProps } from "@/types/types";

export enum ProductViewActions {
  SET_PRODUCT = "SET_PRODUCT",
  SET_CURRENT_PRODUCT_INDEX = "SET_CURRENT_PRODUCT_INDEX",
  SET_IMAGE_INDEX = "SET_IMAGE_INDEX",
  SET_SELECTED_COLOR = "SET_SELECTED_COLOR",
  SET_PRODUCT_QUANTITY = "SET_PRODUCT_QUANTITY",
  SET_AVERAGE_RATING_STAR = "SET_AVERAGE_RATING_STAR",
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
  averageRatingStar: 0 as number,
};

export const reducerFn = (state, action) => {
  if (action.type === ProductViewActions.SET_PRODUCT) {
    return { ...state, selectedProduct: action.payload.value };
  }
  if (action.type === ProductViewActions.SET_CURRENT_PRODUCT_INDEX) {
    return { ...state, currentProductIndex: action.payload.value };
  }
  if (action.type === ProductViewActions.SET_IMAGE_INDEX) {
    return { ...state, imageIndex: action.payload.value };
  }
  if (action.type === ProductViewActions.SET_SELECTED_COLOR) {
    return { ...state, selectedColor: action.payload.value };
  }
  if (action.type === ProductViewActions.SET_PRODUCT_QUANTITY) {
    return { ...state, productQuantity: action.payload.value };
  }
  if (action.type === ProductViewActions.SET_AVERAGE_RATING_STAR) {
    return { ...state, averageRatingStar: action.payload.value };
  }
};
