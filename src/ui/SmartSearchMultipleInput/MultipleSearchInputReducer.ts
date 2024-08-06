export enum SmartSearchActions {
  CLOSE_MENU = "CLOSE_MENU",
  OPEN_MENU = "OPEN_MENU",
  CHANGE_INPUT = "CHANGE_INPUT",
  ADD_ITEM = "SELECT_ITEM",
  ADD_ID = "SELECT_ID",
  DELETE_ITEM = "DELETE_ITEM",
  DELETE_ID = "DELETE_ID",
  RESET = "RESET",
  RESET_INPUT_VALUE = "RESET_INPUT_VALUE",
  DEFAULT_VALUE = "DEFAULT_VALUE",
  DEFAULT_IDS_VALUE = "DEFAULT_IDS_VALUE",
}

interface State {
  multipleItems: { name: string; value: string }[];
  multipleItemsId: string[];
  openMenu: boolean;
  inputValue: string;
}

export const initialState: State = {
  multipleItems: [],
  multipleItemsId: [],
  openMenu: false,
  inputValue: "",
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

  if (action.type === SmartSearchActions.ADD_ITEM) {
    return {
      ...state,
      multipleItems: [
        ...state.multipleItems,
        { name: action.payload.name, ["_id"]: action.payload.value },
      ],
    };
  }

  if (action.type === SmartSearchActions.DELETE_ITEM) {
    return {
      ...state,
      multipleItems: state.multipleItems.filter(
        (item) => item.name[action.payload.lang] !== action.payload.value
      ),
    };
  }

  if (action.type === SmartSearchActions.DELETE_ID) {
    return {
      ...state,
      multipleItemsId: state.multipleItemsId.filter(
        (item) => item !== action.payload.value
      ),
    };
  }

  if (action.type === SmartSearchActions.DEFAULT_VALUE) {
    return {
      ...state,
      multipleItems: [...action.payload.value],
    };
  }

  if (action.type === SmartSearchActions.DEFAULT_IDS_VALUE) {
    return {
      ...state,
      multipleItemsId: action.payload.value,
    };
  }

  if (action.type === SmartSearchActions.ADD_ID) {
    return {
      ...state,
      multipleItemsId: [...state.multipleItemsId, action.payload.value],
    };
  }

  if (action.type === SmartSearchActions.RESET) {
    return {
      ...initialState,
    };
  }
  if (action.type === SmartSearchActions.RESET_INPUT_VALUE) {
    return {
      ...state,
      inputValue: "",
    };
  }
};
