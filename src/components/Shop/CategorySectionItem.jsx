import SectionItem from "./SectionItem.jsx";
import Heading from "../Generic/Heading.jsx";
import Image from "../Generic/Image.jsx";
import data from "../../assets/data.json";
import styled from "styled-components";

const getSectionData = (section) => data.sections[section];

function CategorySectionItem({ section, className = "" }) {
  const sectionData = getSectionData(section);

  return (
    <StyledCategorySectionItem
      className={`category-section-item ${className}`}
      data-testid="category-section-item"
    >
      <StyledImg
        src={sectionData.image}
        // alt={`${sectionName} image`}
        // loading={"lazy"}
      />
      <StyledSectionHeading>
        <SectionItem section={section} />
      </StyledSectionHeading>
    </StyledCategorySectionItem>
  );
}

const StyledCategorySectionItem = styled.div`
  position: relative;

  width: var(--section-item-width);
  height: var(--section-item-width);
  border-radius: 50%;

  overflow: hidden;

  * {
    transition: transform var(--section-transition-duration);
  }
`;

const StyledSectionHeading = styled(Heading)`
  height: 100%;
  width: 100%;

  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: var(--heading-subtext-font);
  font-size: var(--heading-subtext-font-size);
  color: var(--col-txt-alt);

  backdrop-filter: brightness(0.8);

  & a {
    width: 100%;
    height: 100%;
    padding: var(--small-gap);

    display: flex;
    align-items: center;
    justify-content: center;

    text-transform: uppercase;
    text-align: center;
  }
`;

const StyledImg = styled(Image)`
  object-fit: cover;
  aspect-ratio: 1;
  position: absolute;
  inset: 0;

  ${StyledCategorySectionItem}:hover & {
    transform: scale(var(--section-item-hover-thumbnail-scale));
  }
`;

export default CategorySectionItem;
