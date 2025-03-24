// Code imported from: https://bigsondev.com/blog/fetch-data-in-react-as-user-types-or-clicks/

import { useCallback, useEffect } from "react";

export const useDebouncedEffect = (effect, deps, delay) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};
