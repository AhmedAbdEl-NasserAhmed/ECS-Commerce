export interface IPaginationControllersState {
  enablePagination: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  canGoNextPage: boolean;
  canGoPrevPage: boolean;
}
