import { setCookie, getCookie, deleteCookie } from "cookies-next";

import { createSlice } from "@reduxjs/toolkit";

interface CookieSlice {
  cookieItems: any;
}

const initialState: CookieSlice = {
  cookieItems: {
    cartItems: [],
    wishListItems: [],
  },
};

const cookieSlice = createSlice({
  name: "cookieSlice",
  initialState,
  reducers: {
    init(state, action) {
      state.cookieItems[action.payload.cookieId] = action.payload.data;
    },

    addItem(state, action) {
      state.cookieItems[action.payload.cookieId] = [
        ...state.cookieItems[action.payload.cookieId],
        action.payload.data,
      ];
    },

    removeItem(state, action) {
      state.cookieItems[action.payload.cookieId] = action.payload.data;
    },

    emptyCookieItems(state, action) {
      state.cookieItems[action.payload] = [];
    },

    setCookieItems(state, action) {
      state.cookieItems[action.payload.cookieId] = action.payload.data;
    },
  },
});

function cookiesSetter(cookieId, getState) {
  setCookie(
    cookieId,
    JSON.stringify(getState().cookieSlice.cookieItems[cookieId]),
    {
      maxAge: 86400,
    }
  );
}

export function addItemThunk(cookieId, data) {
  return function (dispatch, getState) {
    dispatch(addItem({ data, cookieId }));
    cookiesSetter(cookieId, getState);
  };
}

export function removeItemThunk(cookieId, data) {
  return function (dispatch, getState) {
    dispatch(removeItem({ data, cookieId }));
    if (getState().cookieSlice.cookieItems[cookieId].length === 0) {
      deleteCookie(cookieId);
    } else {
      cookiesSetter(cookieId, getState);
    }
  };
}

export function clearCookiesThunk(cookieId) {
  return function (dispatch) {
    dispatch(emptyCookieItems(cookieId));
    deleteCookie(cookieId);
  };
}

export function setCookiesThunk(cookieId, data) {
  return function (dispatch, getState) {
    dispatch(setCookieItems({ data, cookieId }));
    cookiesSetter(cookieId, getState);
  };
}

export function initThunk(cookieId, data) {
  return function (dispatch) {
    dispatch(
      init({
        data,
        cookieId,
      })
    );
  };
}

export const { addItem, removeItem, emptyCookieItems, setCookieItems, init } =
  cookieSlice.actions;

export default cookieSlice.reducer;
