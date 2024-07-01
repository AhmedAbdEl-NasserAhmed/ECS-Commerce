import { useEffect, useState } from "react";

interface Props {
  value: number;
}

function useDebounceHook(value: number) {
  const [debounceValue, setDebounceValue] = useState<number>(null);

  useEffect(() => {
    const debounceCall = setTimeout(() => {
      setDebounceValue(value);
    }, 500);

    return () => clearTimeout(debounceCall);
  }, [value]);

  return debounceValue;
}

export default useDebounceHook;
