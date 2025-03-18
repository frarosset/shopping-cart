import { Link } from "react-router-dom";
import { getDiscountedPrice, getPriceStr } from "../../utils/priceUtils.js";
import data from "../../assets/data.json";

import StarRatingIcons from "../Icons/StarRatingIcons.jsx";

const currency = data.currency;
const maxRating = data.maxRating;

function ProductItem({ productData, className = "" }) {
  const discountedPrice = getDiscountedPrice(
    productData.price,
    productData.discountPercentage
  );

  return (
    <div className={`product-item ${className}`} data-testid="product-item">
      {productData.discountPercentage > 0 && (
        <span className="discount-percentage">
          {`-${productData.discountPercentage} %`}
        </span>
      )}
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

      <div className="price-container">
        <span className="full-price">
          {getPriceStr(productData.price, currency)}
        </span>
        {productData.discountPercentage > 0 && (
          <span className="discounted-price">
            {getPriceStr(discountedPrice, currency)}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
