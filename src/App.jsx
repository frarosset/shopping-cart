import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header/Header.jsx";
import { HeadingLevelContextProvider } from "./contexts/HeadingLevelContext.jsx";
import { SavedProductsContextProvider } from "./contexts/SavedProductsContext.jsx";
import CreditFooter from "./components/CreditFooter.jsx";

function App() {
  const location = useLocation();

  useEffect(() => {
    // scroll to top at each route change
    const app = document.getElementById("root");
    if (app) app.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <SavedProductsContextProvider>
        <HeadingLevelContextProvider>
          <Header />
          <HeadingLevelContextProvider>
            <Outlet />
          </HeadingLevelContextProvider>
        </HeadingLevelContextProvider>
      </SavedProductsContextProvider>
      <CreditFooter />
    </>
  );
}

export default App;
