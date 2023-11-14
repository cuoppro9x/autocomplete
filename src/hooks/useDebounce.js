import { useEffect, useState } from "react";

const useDebounce = (callback, delay) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  const debounceFunction = (...args) => {
    clearTimeout(timer);
    setTimer(setTimeout(() => callback(...args), delay));
  };

  return debounceFunction;
};

export default useDebounce;