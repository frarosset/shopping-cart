import { useState, useEffect } from "react";

const useFetchFromApiUrl = (apiUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch on mount or on apiUrl change
  useEffect(() => {
    fetchData(apiUrl, setData, setError, setLoading);
  }, [apiUrl]);

  return { data, loading, error };
};

const fetchData = (apiUrl, setData, setError, setLoading) => {
  setLoading(true);

  fetch(apiUrl, { mode: "cors" })
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
      setError(error);
      setData(null);
    })
    .finally(() => setLoading(false));
};

export default useFetchFromApiUrl;
