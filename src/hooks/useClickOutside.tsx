"use client";

import { useEffect, useRef } from "react";

function useClickOutside({ close, StopBubbling = true }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLDivElement;

      if (ref.current && !ref.current.contains(target)) {
        close();
      }
    }

    window.addEventListener("click", handleClick, true);

    return () => window.removeEventListener("click", handleClick, StopBubbling);
  }, [close, StopBubbling]);

  return ref;
}

export default useClickOutside;
