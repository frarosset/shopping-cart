const baseApiUrl = "https://dummyjson.com/products";

const queriesToString = (queryKeys, queries = {}) => {
  const sep = (first) => (first ? "?" : "&");

  const str = queryKeys.reduce((str, key, idx) => {
    const val = queries[key];
    if (val != null) {
      str += `${sep(idx == 0)}${key}=${val}`;
    }
    return str;
  }, "");

  return str;
};

const getSingleProductApiUrl = (id, queries = {}) => {
  const queryKeys = ["select"];

  const queriesStr = queriesToString(queryKeys, queries);
  return `${baseApiUrl}/${id}${queriesStr}`;
};

const getAllProductsApiUrl = (queries = {}) => {
  const queryKeys = ["sortBy", "order", "limit", "skip", "select"];

  const queriesStr = queriesToString(queryKeys, queries);
  return `${baseApiUrl}${queriesStr}`;
};

export { getSingleProductApiUrl, getAllProductsApiUrl };
