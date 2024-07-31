import { useEffect, useState } from "react";

const useWindowResize = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const resize = (e) => {
      setWindowWidth(window.innerWidth);
    };
    if (typeof window !== undefined) {
      window.addEventListener("resize", resize);
    }

    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener("resize", resize);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window != undefined) {
      setWindowWidth(window.innerWidth);
    }
  }, [typeof window]);

  return windowWidth;
};

export default useWindowResize;
