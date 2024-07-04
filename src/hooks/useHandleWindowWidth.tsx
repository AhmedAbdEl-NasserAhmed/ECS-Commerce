import { useEffect, useState } from "react";

export function useHandleWindowWidth() {
  const [isWidthHiger, setIsWidthHigher] = useState<boolean>(
    window.innerWidth > 1020
  );

  useEffect(() => {
    const handleResize = () => {
      setIsWidthHigher(window.innerWidth > 1020);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isWidthHiger;
}
