import { Link } from "react-router-dom";

function ProductItem({ productData, className = "" }) {
  return (
    <div className={`product-item ${className}`} data-testid="product-item">
      <span className="discount-percentage">
        {`-${productData.discountPercentage} %`}
      </span>
      <Link to={`/shop/p/${productData.id}`}>
        <img
          className="thumbnail"
          src={productData.thumbnail}
          alt={productData.title}
        />
        {<h3 className="title">{productData.title}</h3>}
      </Link>
      <span className="full-price">{productData.price} €</span>
    </div>
  );
}

export default ProductItem;
