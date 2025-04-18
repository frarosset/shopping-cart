import { useState } from "react";
import { useDebouncedEffect } from "../custom-hooks/useDebouncedEffect.jsx";

const useFetchFromApiUrl = (apiUrl, resetOnFetch = false) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFromApiUrl = (apiUrl, resetOnFetch = false, signal) =>
    fetchData(apiUrl, resetOnFetch, signal, setData, setError, setLoading);

  // fetch on mount or on apiUrl change
  // See : https://bigsondev.com/blog/fetch-data-in-react-as-user-types-or-clicks/
  useDebouncedEffect(
    () => {
      const controller = new AbortController();

      fetchData(
        apiUrl,
        resetOnFetch,
        controller.signal,
        setData,
        setError,
        setLoading
      );

      return () => controller.abort();

      // While resetOnFetch might change, it should not trigger fetching data if apiUrl is not changed
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [apiUrl],
    300
  );

  return { data, loading, error, fetchFromApiUrl };
};

const fetchData = (
  apiUrl,
  resetOnFetch,
  signal,
  setData,
  setError,
  setLoading
) => {
  setLoading(true);

  if (resetOnFetch) {
    setData(null);
    setError(null);
  }

  fetch(apiUrl, { mode: "cors", signal: signal })
    .then((response) => {
      // Server error
      if (response.status >= 400) {
        const err = new Error(`${response.status}: ${response.statusText}`);
        err.status = response.status;
        throw err;
      }

      return response.json();
    })
    .then((response) => {
      setData(response);
      setError(null);
    })
    .catch((error) => {
      // Ignore abort errors
      if (error.name === "AbortError") {
        return;
      }

      setError(error);
      setData(null);
    })
    .finally(() => {
      // see: https://stackoverflow.com/a/77342496
      if (!signal || !signal.aborted) setLoading(false);
    });
};

export default useFetchFromApiUrl;
