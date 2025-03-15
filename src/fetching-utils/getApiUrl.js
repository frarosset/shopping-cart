const baseApiUrl = "https://dummyjson.com/products";

const queriesToString = (queryKeys, queries = {}) => {
  const sep = (first) => (first ? "?" : "&");

  const str = queryKeys.reduce((str, key) => {
    const val = queries[key];
    if (val != null) {
      str += `${sep(str === "")}${key}=${val}`;
    }
    return str;
  }, "");

  return str;
};

const getSingleProductApiUrl = (id, queries = {}) => {
  const queryKeys = ["select"];

  const queriesStr = queriesToString(queryKeys, queries);
  return encodeURI(`${baseApiUrl}/${id}${queriesStr}`);
};

const getAllProductsApiUrl = (queries = {}) => {
  const queryKeys = ["sortBy", "order", "limit", "skip", "select"];

  const queriesStr = queriesToString(queryKeys, queries);
  return encodeURI(`${baseApiUrl}${queriesStr}`);
};

const getCategoryProductsApiUrl = (category, queries = {}) => {
  const queryKeys = ["sortBy", "order", "limit", "skip", "select"];

  const queriesStr = queriesToString(queryKeys, queries);
  return encodeURI(`${baseApiUrl}/category/${category}${queriesStr}`);
};

const getSearchProductsApiUrl = (searchQuery, queries = {}) => {
  const queryKeys = ["q", "sortBy", "order", "limit", "skip", "select"];
  const queriesWithSearchQuery = Object.assign({}, { q: searchQuery }, queries);

  const queriesStr = queriesToString(queryKeys, queriesWithSearchQuery);
  return encodeURI(`${baseApiUrl}/search${queriesStr}`);
};

export {
  getSingleProductApiUrl,
  getAllProductsApiUrl,
  getCategoryProductsApiUrl,
  getSearchProductsApiUrl,
};
