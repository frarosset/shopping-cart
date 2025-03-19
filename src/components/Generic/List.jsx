const List = ({ items, className = "" }) => {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.key}>{item.element}</li>
      ))}
    </ul>
  );
};

export default List;
