function CategorySectionList({ className = "" }) {
  return (
    <ul
      className={`category-section-list ${className}`}
      data-testid="category-section-list"
    ></ul>
  );
}

export default CategorySectionList;
