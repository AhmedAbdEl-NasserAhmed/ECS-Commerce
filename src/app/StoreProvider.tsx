"use client";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import TokenExpirationChecker from "./TokenExpirationChecker";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
    >
      <Provider store={store}>
        <TokenExpirationChecker />
        {children}
      </Provider>
    </GoogleOAuthProvider>
  );
}
