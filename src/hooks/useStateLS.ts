import React, { useState, useEffect } from "react";

function useStateLS<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const valueInLS = window.localStorage.getItem(key);
    if (valueInLS) {
      return JSON.parse(valueInLS);
    }
    return initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useStateLS;
