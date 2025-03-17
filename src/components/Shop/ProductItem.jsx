import { Link } from "react-router-dom";

function ProductItem({ productData, className = "" }) {
  return (
    <div className={`product-item ${className}`} data-testid="product-item">
      {
        <Link to={`/shop/p/${productData.id}`}>
          {<h3>{productData.title}</h3>}
        </Link>
      }
    </div>
  );
}

export default ProductItem;
