import Heading from "../Generic/Heading.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import data from "../../assets/data.json";

function SectionCategoriesPresentation({ sectionCategories, className = "" }) {
  return (
    <HeadingLevelContextProvider>
      <ul className={className}>
        {sectionCategories.map((category) => {
          const categoryName = data.categories[category].name;

          return (
            <li>
              <header>
                <Heading>{categoryName}</Heading>
              </header>
            </li>
          );
        })}
      </ul>
    </HeadingLevelContextProvider>
  );
}

export default SectionCategoriesPresentation;
