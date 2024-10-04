"use client";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import TokenExpirationChecker from "./TokenExpirationChecker";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <TokenExpirationChecker />
      {children}
    </Provider>
  );
}
