import { useState, useEffect } from "react";

const useFetchFromApiUrl = (apiUrl) => {
  const [data, setData] = useState(null);

  // fetch on mount or on apiUrl change
  useEffect(() => {
    fetchData(apiUrl, setData);
  }, [apiUrl]);

  return { data };
};

const fetchData = (apiUrl, setData) => {
  fetch(apiUrl, { mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      setData(response);
    });
};

export default useFetchFromApiUrl;
