import { Link } from "react-router-dom";
import {
  Thumbnail,
  Title,
  PriceContainer,
  RatingContainer,
  DiscountPercentage,
  AvailabilityStatus,
} from "../StyledProductInfo.jsx";
import data from "../../assets/data.json";

function ProductItem({ productData, className = "" }) {
  const hLevel = 3;

  return (
    <div className={`product-item ${className}`} data-testid="product-item">
      <div className="highlight-container">
        <DiscountPercentage {...productData} />
        <AvailabilityStatus
          {...productData}
          ignoreStatusList={[data.availability.inStock]}
        />
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
