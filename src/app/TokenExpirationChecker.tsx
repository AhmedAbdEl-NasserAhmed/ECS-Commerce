import useCheckTokenExpiration from "@/hooks/useCheckTokenExpiration";

const TokenExpirationChecker = () => {
  useCheckTokenExpiration();
  return null;
};

export default TokenExpirationChecker;
