const baseApiUrl = "https://dummyjson.com/products";

const queriesToString = (queries = {}) => {
  const sep = (first) => (first ? "?" : "&");
  const keys = Object.keys(queries);

  const str = keys.reduce((str, key, idx) => {
    const val = queries[key];
    str += `${sep(idx == 0)}${key}=${val}`;
    return str;
  }, "");

  return str;
};

const getSingleProductApiUrl = (id, queries = {}) => {
  const queriesStr = queriesToString(queries);
  return `${baseApiUrl}/${id}${queriesStr}`;
};

export { getSingleProductApiUrl };
