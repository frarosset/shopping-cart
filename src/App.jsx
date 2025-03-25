import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import { HeadingLevelContextProvider } from "./contexts/HeadingLevelContext.jsx";
import { SavedProductsContextProvider } from "./contexts/SavedProductsContext.jsx";

function App() {
  return (
    <SavedProductsContextProvider>
      <HeadingLevelContextProvider>
        <Header />
        <HeadingLevelContextProvider>
          <Outlet />
        </HeadingLevelContextProvider>
      </HeadingLevelContextProvider>
    </SavedProductsContextProvider>
  );
}

export default App;
