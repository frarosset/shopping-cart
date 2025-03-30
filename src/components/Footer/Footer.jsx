import Attribution from "./Attribution.jsx";
import CreditFooter from "./CreditFooter.jsx";
import data from "../../assets/data.json";
import styled from "styled-components";

function Footer() {
  return (
    <StyledFooter>
      <MainFooterContainer>
        <StyledTitleContainer>
          <StyledShopName>{data.shopName}</StyledShopName>
          <StyledShopSlogan>{data.slogan}</StyledShopSlogan>
        </StyledTitleContainer>
        <Attribution />
      </MainFooterContainer>
      <CreditFooter darkTheme={true} />
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  background: var(--footer-background);
  color: var(--footer-col);
  display: flex;
  flex-direction: column;
  padding: var(--page-padding);
  gap: var(--page-gap);
  width: 100%;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--page-padding-lr);

  @media screen and (min-width: 550px) {
    flex-direction: row;
  }
`;

const StyledShopName = styled.p`
  font-family: var(--footer-shop-name-font);
  font-size: var(--footer-shop-name-fontsize);
`;

const StyledShopSlogan = styled.p`
  text-transform: uppercase;
  font-size: calc(0.45 * var(--footer-shop-name-fontsize));
  width: max-content;

  && {
    text-wrap: balance;
  }
`;

export default Footer;
