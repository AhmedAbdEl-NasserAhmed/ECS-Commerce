import { useEffect, useState } from "react";

export function useHandleWindowWidth() {
  const [isWidthHiger, setIsWidthHigher] = useState<boolean>(true);

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
