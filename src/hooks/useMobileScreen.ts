import { useEffect, useState } from "react";

const useMobileScreen = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window != undefined) {
      setWindowWidth(window.innerWidth);
    }
  }, [typeof window]);

  const isMobileScreen = windowWidth < 768;

  return isMobileScreen;
};

export default useMobileScreen;
