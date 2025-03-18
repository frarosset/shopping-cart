import ProductList from "./ProductList.jsx";
import useFetchFromApiUrl from "../../fetching-utils/useFetchFromApiUrl.jsx";

function ProductFetchList({ apiUrl, className = "" }) {
  const { data } = useFetchFromApiUrl(apiUrl);

  return (
    <div
      className={`product-fetch-list ${className}`}
      data-testid="product-fetch-list"
    >
      {data && data.products && <ProductList productDataList={data.products} />}
    </div>
  );
}

export default ProductFetchList;
