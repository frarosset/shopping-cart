import { Link } from "react-router-dom";
import {
  Thumbnail,
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
        <Thumbnail {...productData} />
        <Title {...productData} hLevel={hLevel} nRows={2} />
      </Link>
      <RatingContainer {...productData} />
      <PriceContainer {...productData} />
    </div>
  );
}

export default ProductItem;
