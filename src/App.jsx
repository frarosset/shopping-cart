import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header/Header.jsx";
import { HeadingLevelContextProvider } from "./contexts/HeadingLevelContext.jsx";
import { SavedProductsContextProvider } from "./contexts/SavedProductsContext.jsx";
import Footer from "./components/Footer/Footer.jsx";
import styled from "styled-components";

function App() {
  const location = useLocation();

  useEffect(() => {
    // scroll to top at each route change
    if (window) window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHomepage = location.pathname == "/";

  return (
    <>
      <FullpageContainer $isHomepage={isHomepage}>
        <SavedProductsContextProvider>
          <HeadingLevelContextProvider>
            <Header />
            <HeadingLevelContextProvider>
              <Outlet />
            </HeadingLevelContextProvider>
          </HeadingLevelContextProvider>
        </SavedProductsContextProvider>
      </FullpageContainer>
      <Footer />
    </>
  );
}

const FullpageContainer = styled.div`
  width: 100%;
  flex: 1;
  min-height: 100vh;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  align-items: flex-start;
  flex-direction: column;

  & > main {
    flex: 1;
    width: 100%;
  }

  ${({ $isHomepage }) =>
    $isHomepage &&
    `
    background-image: url("/images/home.jpg");

    && header {
      background: transparent;
      color: var(--col-white);
    }
      `}
`;

export default App;
