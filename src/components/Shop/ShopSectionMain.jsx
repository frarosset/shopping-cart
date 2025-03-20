import { useParams } from "react-router-dom";
import CategoryList from "./CategoryList.jsx";
import Heading from "../Generic/Heading.jsx";
import styled from "styled-components";
import data from "../../assets/data.json";

const getSectionData = (section) => data.sections[section];

function ShopSectionMain({ className = "" }) {
  const hLevel = 2;
  const { section } = useParams();

  const sectionData = getSectionData(section);
  const sectionName = sectionData.name;
  const sectionCategories = sectionData.categories;

  return (
    <StyledMain className={className}>
      <StyledHeader>
        <StyledHeading hLevel={hLevel} $bgUrl={sectionData.image}>
          {sectionName}
        </StyledHeading>
        <StyledCategoryList categoryList={sectionCategories} />
      </StyledHeader>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  // width: 100%;
  // display: flex;
  // flex-direction: column;
  // gap: 1lh;
  // align-items: flex-start;
`;

const StyledCategoryList = styled(CategoryList)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0 var(--large-gap);
  padding: var(--mid-gap) var(--page-padding-lr);

  & a {
    text-transform: uppercase;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  color: var(--col-txt-alt);
  padding: var(--page-padding);

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--category-banner-fontsize);
  text-shadow: 0px 0px 10px var(--col-txt);
  text-transform: uppercase;

  width: 100%;
  min-height: var(--category-banner-height);

  background-image: url("${(props) => props.$bgUrl}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export default ShopSectionMain;
