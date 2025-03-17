import { Link } from "react-router-dom";
import { getPriceStr } from "../../utils/priceUtils.js";
import data from "../../assets/data.json";

const currency = data.currency;

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

      <span className="full-price">
        {getPriceStr(productData.price, currency)}
      </span>
    </div>
  );
}

export default ProductItem;
