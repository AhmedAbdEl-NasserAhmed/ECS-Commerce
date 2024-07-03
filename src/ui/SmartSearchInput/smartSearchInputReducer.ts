export enum SmartSearchActions {
  CLOSE_MENU = "CLOSE_MENU",
  OPEN_MENU = "OPEN_MENU",
  CHANGE_INPUT = "CHANGE_INPUT",
  SELECT_ITEM = "SELECT_ITEM",
  RESET = "RESET",
}

export const initialState = {
  openMenu: false,
  inputValue: "",
  userSelectedValue: "",
};

export const reducerFn = function (state = initialState, action) {
  if (action.type === SmartSearchActions.CLOSE_MENU) {
    return { ...state, openMenu: false };
  }
  if (action.type === SmartSearchActions.OPEN_MENU) {
    return { ...state, openMenu: true };
  }
  if (action.type === SmartSearchActions.CHANGE_INPUT) {
    return { ...state, inputValue: action.payload.value };
  }
  if (action.type === SmartSearchActions.SELECT_ITEM) {
    return {
      ...state,
      openMenu: false,
      inputValue: action.payload.value,
      userSelectedValue: action.payload.value,
    };
  }
  if (action.type === SmartSearchActions.RESET) {
    return { ...initialState };
  }
  return state;
};
