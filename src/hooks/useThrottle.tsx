import { useCallback, useEffect, useRef, useState } from "react";

const useThrottle = (value, delay = 500) => {
  const [throttledValue, setThrottledValue] = useState("");

  const lastCall = useRef(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      setThrottledValue(value);
    }
  }, [delay, value]);

  return throttledValue;
};

export default useThrottle;
