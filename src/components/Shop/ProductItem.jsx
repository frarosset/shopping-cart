function ProductItem({ productData, className = "" }) {
  return (
    <div className={`product-item ${className}`} data-testid="product-item">
      <h3>{productData.title}</h3>
    </div>
  );
}

export default ProductItem;
