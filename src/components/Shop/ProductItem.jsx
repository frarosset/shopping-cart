import { Link } from "react-router-dom";
import {
  Title,
  PriceContainer,
  RatingContainer,
} from "../StyledProductInfo.jsx";

const showStockInfoOn = ["Low Stock", "Out of Stock"];

function ProductItem({ productData, className = "" }) {
  const hLevel = 3;

  return (
    <div className={`product-item ${className}`} data-testid="product-item">
      <div className="highlight-container">
        {productData.discountPercentage > 0 && (
          <span className="discount-percentage">
            {`-${productData.discountPercentage} %`}
          </span>
        )}
        {showStockInfoOn.includes(productData.availabilityStatus) && (
          <span className="availability-status">
            {productData.availabilityStatus}
          </span>
        )}
      </div>
      <Link to={`/shop/p/${productData.id}`}>
        <img
          className="thumbnail"
          src={productData.thumbnail}
          alt={productData.title}
        />
        <Title {...productData} hLevel={hLevel} nRows={2} />
      </Link>
      <RatingContainer {...productData} />
      <PriceContainer {...productData} />
    </div>
  );
}

export default ProductItem;
