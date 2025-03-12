function List({ items, className = "", testId = "" }) {
  return (
    <ul className={className} data-testid={testId}>
      {items.map((item) => (
        <li key={item.key}>{item.element}</li>
      ))}
    </ul>
  );
}

export default List;
