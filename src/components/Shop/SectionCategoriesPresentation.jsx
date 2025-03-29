import Heading from "../Generic/Heading.jsx";
import useSortBy from "../../custom-hooks/useSortBy.jsx";
import ProductFetchList from "./ProductFetchList.jsx";
import { getCategoryProductsApiUrl } from "../../fetching-utils/getApiUrl.js";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import data from "../../assets/data.json";

const productsLimit = 10;
const productDataKeys = [
  "title",
  "price",
  "discountPercentage",
  "rating",
  "thumbnail",
  "availabilityStatus",
  "stock",
];
const productKeysStr = productDataKeys.join(",");

function SectionCategoriesPresentation({ sectionCategories, className = "" }) {
  const { sortBy, order } = useSortBy(); // get default values

  const getApiUrl = (category) =>
    getCategoryProductsApiUrl(category, {
      select: productKeysStr,
      sortBy: sortBy,
      order: order,
      limit: productsLimit,
    });

  return (
    <HeadingLevelContextProvider>
      <ul className={className}>
        {sectionCategories.map((category) => {
          const categoryName = data.categories[category].name;

          return (
            <li key={category}>
              <header>
                <Heading>{categoryName}</Heading>
              </header>
              <ProductFetchList apiUrl={getApiUrl(category)} rowScroll={true} />
            </li>
          );
        })}
      </ul>
    </HeadingLevelContextProvider>
  );
}

export default SectionCategoriesPresentation;
