import { useEffect, useReducer } from "react";
import { initialState, reducerFn } from "./reducer";
import { IPaginationControllersActions } from "./interfaces/handlers";
import { IPaginationControllersState } from "./interfaces";
import { PaginationActionsEnum } from "./enums/actions";

const useBaseTablePagination = (serverNumPages: number) => {
  const [paginationData, dispatchPaginationAction] = useReducer(
    reducerFn,
    initialState
  );

  const paginationControllers: IPaginationControllersState &
    IPaginationControllersActions = {
    enablePagination: true,
    page: paginationData.page,
    pageSize: paginationData.pageSize,
    totalPages: paginationData.totalPages,
    canGoNextPage: paginationData.page < paginationData.totalPages - 1,
    canGoPrevPage: paginationData.page > 0,
    onPrevHandler: () => {
      dispatchPaginationAction({ type: PaginationActionsEnum.PREV });
    },
    onNextHandler: () => {
      dispatchPaginationAction({ type: PaginationActionsEnum.NEXT });
    },
    onFirstHandler: () => {
      dispatchPaginationAction({ type: PaginationActionsEnum.FIRST });
    },
    onLastHandler: () => {
      dispatchPaginationAction({ type: PaginationActionsEnum.LAST });
    },
    onChangeNumberOfPages(numberOfPages: number) {
      dispatchPaginationAction({
        type: PaginationActionsEnum.CHANGE_PAGE_SIZE,
        payload: { pageSize: numberOfPages },
      });
    },
    goToPage(page) {
      dispatchPaginationAction({
        type: PaginationActionsEnum.GO_TO_PAGE,
        payload: { page },
      });
    },
  };

  useEffect(() => {
    dispatchPaginationAction({
      type: PaginationActionsEnum.CHANGE_TOTAL_PAGES,
      payload: {
        totalPages: serverNumPages,
      },
    });
  }, [serverNumPages]);

  return { paginationControllers, paginationData };
};

export default useBaseTablePagination;
