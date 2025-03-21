import { createContext, useContext } from "react";

const HeadingLevelContext = createContext(0);

function HeadingLevelContextProvider({ children }) {
  const headingLevel = useContext(HeadingLevelContext);
  const nextLevel = headingLevel + 1;
  return (
    <HeadingLevelContext.Provider value={nextLevel}>
      {children}
    </HeadingLevelContext.Provider>
  );
}

export default HeadingLevelContext;
export { HeadingLevelContextProvider };
