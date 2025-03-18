import ProductList from "./ProductList.jsx";
import useFetchFromApiUrl from "../../fetching-utils/useFetchFromApiUrl.jsx";

function ProductFetchList({ apiUrl, className = "" }) {
  const { data, error } = useFetchFromApiUrl(apiUrl);

  return (
    <div
      className={`product-fetch-list ${className}`}
      data-testid="product-fetch-list"
    >
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
