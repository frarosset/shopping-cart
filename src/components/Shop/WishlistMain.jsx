import Heading from "../Generic/Heading.jsx";
import styled from "styled-components";
import { useContext } from "react";
import SavedProductsContext from "../../contexts/SavedProductsContext.jsx";
import MessageWithImageBelow from "../Generic/MessageWithImageBelow.jsx";
import ProductList from "./ProductList.jsx";
import { Link } from "react-router-dom";

function WishlistMain({ className = "" }) {
  const { wishlist } = useContext(SavedProductsContext);

  return (
    <StyledMain className={className}>
      <StyledHeader>
        <Heading>Wishlist</Heading>
      </StyledHeader>

      {wishlist &&
        (wishlist.length > 0 ? (
          <ProductList productDataList={wishlist} />
        ) : (
          <MessageWithImageBelow imageUrl="/images/vector/empty-wishlist.jpg">
            Your wishlist is empty!
            <Link to="/shop">Go shopping now!</Link>
          </MessageWithImageBelow>
        ))}
    </StyledMain>
  );
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 var(--page-padding-lr);
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
  align-items: center;
  padding: var(--page-padding-tb) 0;
`;

export default WishlistMain;
