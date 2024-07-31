"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function ScrollToTop({ children }) {
  const pathName = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return children;
}

export default ScrollToTop;
