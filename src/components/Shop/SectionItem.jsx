import { Link } from "react-router-dom";
import styled from "styled-components";
import data from "../../assets/data.json";

function SectionItem({ section, className = "" }) {
  const sectionData = data.sections[section];
  const sectionName = sectionData.name;

  return (
    <span className={`section-item ${className}`} data-testid="section-item">
      {
        <StyledSectionItem to={`/shop/${section}`}>
          {sectionName}
        </StyledSectionItem>
      }
    </span>
  );
}

const StyledSectionItem = styled(Link)`
  font-family: var(--shop-link-font);
`;

export default SectionItem;
