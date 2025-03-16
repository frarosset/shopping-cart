import { useState, useEffect } from "react";

const useFetchFromApiUrl = (apiUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch on mount or on apiUrl change
  useEffect(() => {
    const controller = new AbortController();

    fetchData(apiUrl, controller.signal, setData, setError, setLoading);

    return () => controller.abort();
  }, [apiUrl]);

  return { data, loading, error };
};

const fetchData = (apiUrl, signal, setData, setError, setLoading) => {
  setLoading(true);

  fetch(apiUrl, { mode: "cors", signal: signal })
    .then((response) => {
      // Server error
      if (response.status >= 400) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    })
    .then((response) => {
      setData(response);
      setError(null);
    })
    .catch((error) => {
      // Ignore abort errors
      if (error === "AbortError") return;

      setError(error);
      setData(null);
    })
    .finally(() => setLoading(false));
};

export default useFetchFromApiUrl;
