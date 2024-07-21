export interface IPaginationControllersActions {
  onPrevHandler: () => void;
  onNextHandler: () => void;
  onFirstHandler: () => void;
  onLastHandler: () => void;
  onChangeNumberOfPages?: (numberOfPages: number) => void;
  goToPage?: (page: number) => void;
  enablePaginationHandler?: (shouldBeEnabled: boolean) => void;
}
