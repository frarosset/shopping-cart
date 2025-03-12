function CategorySectionList({ sectionList, className = "" }) {
  return (
    <ul
      className={`category-section-list ${className}`}
      data-testid="category-section-list"
    >
      {sectionList.map((section) => (
        <li key={section}>{section}</li>
      ))}
    </ul>
  );
}

export default CategorySectionList;
