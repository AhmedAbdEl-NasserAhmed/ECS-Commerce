import { DEFAULT_PAGE_SIZE } from "@/ui/BaseReactTable/BaseReactTable";
import { IPaginationControllersState } from "../interfaces";
import { Action } from "../types/action";
import { PaginationActionsEnum } from "../enums/actions";

export const initialState: IPaginationControllersState = {
  enablePagination: true,
  page: 0,
  pageSize: DEFAULT_PAGE_SIZE,
  totalPages: 1,
  canGoNextPage: true,
  canGoPrevPage: false,
};

export const reducerFn = (
  state: IPaginationControllersState = initialState,
  action: Action
) => {
  switch (action.type) {
    case PaginationActionsEnum.FIRST:
      return {
        ...state,
        page: 0,
      };
    case PaginationActionsEnum.NEXT:
      if (state.page < state.totalPages) {
        return {
          ...state,
          page: state.page + 1,
        };
      }
      return { ...state };
    case PaginationActionsEnum.PREV:
      if (state.page > 0) {
        return {
          ...state,
          page: state.page - 1,
        };
      }
      return { ...state };
    case PaginationActionsEnum.LAST:
      return {
        ...state,
        page: state.totalPages - 1,
      };
    case PaginationActionsEnum.GO_TO_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
    case PaginationActionsEnum.CHANGE_PAGE_SIZE:
      return {
        ...state,
        page: 0,
        pageSize: action.payload.pageSize,
      };
    case PaginationActionsEnum.CHANGE_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload.totalPages,
      };
    case PaginationActionsEnum.ENABLE_PAGINATION:
      return {
        ...state,
        enablePagination: action.payload.enablePagination,
      };
    default:
      return initialState;
  }
};
