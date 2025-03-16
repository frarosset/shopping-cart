import { useState, useEffect } from "react";

const useFetchFromApiUrl = (apiUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch on mount or on apiUrl change
  useEffect(() => {
    fetchData(apiUrl, setData, setLoading);
  }, [apiUrl]);

  return { data, loading };
};

const fetchData = (apiUrl, setData, setLoading) => {
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
    })
    .catch(() => {
      setData(null);
    })
    .finally(() => setLoading(false));
};

export default useFetchFromApiUrl;
