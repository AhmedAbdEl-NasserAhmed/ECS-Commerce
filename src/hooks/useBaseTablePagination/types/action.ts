import {
  ChangePageSizeAction,
  ChangeTotalPagesAction,
  FirstAction,
  GoToPageAction,
  LastAction,
  NextAction,
  PrevAction,
} from "../interfaces";

export type Action =
  | NextAction
  | PrevAction
  | FirstAction
  | LastAction
  | GoToPageAction
  | ChangePageSizeAction
  | ChangeTotalPagesAction;
