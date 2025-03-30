import data from "../../assets/data.json";
import styled from "styled-components";
import { Link } from "react-router-dom";

function HomeMain() {
  return (
    <StyledMain>
      <StyledTitleContainer>
        <StyledShopName>{data.shopName}</StyledShopName>
        <StyledShopSlogan>{data.slogan}</StyledShopSlogan>
      </StyledTitleContainer>
      <StyledShopContainer>
        <Link to="/shop">SHOP NOW</Link>
      </StyledShopContainer>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledTitleContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: var(--header-col);
`;

const StyledShopName = styled.p`
  font-family: var(--home-shop-name-font);
  font-size: var(--home-shop-name-fontsize);
  width: 100%;
  text-align: center;
`;

const StyledShopSlogan = styled.p`
  text-transform: uppercase;
  font-size: calc(0.45 * var(--home-shop-name-fontsize));
  width: 100%;
  text-align: center;
`;

const StyledShopContainer = styled.div`
  font-family: var(--home-shop-name-font);
  font-size: calc(0.45 * var(--home-shop-name-fontsize));
  text-align: center;
  width: 100%;
  position: absolute;
  bottom: var(--home-shop-padding-bottom);
`;

export default HomeMain;
