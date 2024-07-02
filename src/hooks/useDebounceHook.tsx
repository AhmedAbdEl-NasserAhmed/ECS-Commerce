import { useEffect, useState } from "react";

interface Props {
  value: number;
}

function useDebounceHook<T>(value: T) {
  const [debounceValue, setDebounceValue] = useState<T>();

  useEffect(() => {
    const debounceCall = setTimeout(() => {
      setDebounceValue(value);
    }, 500);

    return () => clearTimeout(debounceCall);
  }, [value]);

  return debounceValue;
}

export default useDebounceHook;
