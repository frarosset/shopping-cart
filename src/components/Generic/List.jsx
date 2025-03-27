const List = ({ items, ref, className = "" }) => {
  return (
    <ul className={className} ref={ref}>
      {items.map((item) => (
        <li key={item.key}>{item.element}</li>
      ))}
    </ul>
  );
};

export default List;
