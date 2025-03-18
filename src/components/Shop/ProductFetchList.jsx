import ProductList from "./ProductList.jsx";
import useFetchFromApiUrl from "../../fetching-utils/useFetchFromApiUrl.jsx";

function ProductFetchList({ apiUrl, resetOnFetch = false, className = "" }) {
  const { data, error, loading } = useFetchFromApiUrl(apiUrl, resetOnFetch);

  return (
    <div
      className={`product-fetch-list ${className}`}
      data-testid="product-fetch-list"
    >
      {loading && (
        <span data-testid="product-fetch-list-loading">"Loading ..."</span>
      )}
      {data && data.products && <ProductList productDataList={data.products} />}
      {error && (
        <span data-testid="product-fetch-list-error">
          "Error " + error.message
        </span>
      )}
    </div>
  );
}

export default ProductFetchList;
