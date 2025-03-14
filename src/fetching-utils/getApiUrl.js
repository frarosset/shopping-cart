const baseApiUrl = "https://dummyjson.com/products";

const getSingleProductApiUrl = (id) => {
  return `${baseApiUrl}/${id}`;
};

export { getSingleProductApiUrl };
