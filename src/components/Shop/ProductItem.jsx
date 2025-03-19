import { Link } from "react-router-dom";
import { PriceContainer } from "../StyledProductInfo.jsx";
import data from "../../assets/data.json";

import StarRatingIcons from "../Icons/StarRatingIcons.jsx";

const maxRating = data.maxRating;

const showStockInfoOn = ["Low Stock", "Out of Stock"];

function ProductItem({ productData, className = "" }) {
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
        {<h3 className="title">{productData.title}</h3>}
      </Link>

      <div className="rating-container">
        <span className="rating">{productData.rating}</span>
        <StarRatingIcons rating={productData.rating} total={maxRating} />
      </div>
      <PriceContainer {...productData} />
    </div>
  );
}

export default ProductItem;
