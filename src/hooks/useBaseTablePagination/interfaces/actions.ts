import { PaginationActionsEnum } from "../enums/actions";

export interface NextAction {
  type: PaginationActionsEnum.NEXT;
}

export interface PrevAction {
  type: PaginationActionsEnum.PREV;
}

export interface FirstAction {
  type: PaginationActionsEnum.FIRST;
}
export interface LastAction {
  type: PaginationActionsEnum.LAST;
}
export interface GoToPageAction {
  type: PaginationActionsEnum.GO_TO_PAGE;
  payload: { page: number };
}
export interface ChangePageSizeAction {
  type: PaginationActionsEnum.CHANGE_PAGE_SIZE;
  payload: { pageSize: number };
}
export interface ChangeTotalPagesAction {
  type: PaginationActionsEnum.CHANGE_TOTAL_PAGES;
  payload: { totalPages: number };
}
export interface EnablePaginationAction {
  type: PaginationActionsEnum.ENABLE_PAGINATION;
  payload: { enablePagination: boolean };
}
