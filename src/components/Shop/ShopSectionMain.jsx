import { useParams } from "react-router-dom";

function ShopSectionMain({ className = "" }) {
  const { section } = useParams();

  return (
    <main
      className={`shop-section-main ${className}`}
      data-testid="shop-section-main"
    >
      {section}
    </main>
  );
}

export default ShopSectionMain;
