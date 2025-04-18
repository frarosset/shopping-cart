import App from "./App.jsx";
import ErrorPage from "./components/Errors/ErrorPage.jsx";
import ErrorRedirect from "./components/Errors/ErrorRedirect.jsx";
import ShopMain from "./components/Shop/ShopMain.jsx";
import ShopSectionMain from "./components/Shop/ShopSectionMain.jsx";
import ShopCategoryMain from "./components/Shop/ShopCategoryMain.jsx";
import SearchMain from "./components/Shop/SearchMain.jsx";
import WishlistMain from "./components/Shop/WishlistMain.jsx";
import HomeMain from "./components/Home/HomeMain.jsx";
import CartMain from "./components/Shop/CartMain.jsx";
import ProductMain from "./components/Shop/ProductMain.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorRedirect />,
    children: [
      { index: true, element: <HomeMain /> },
      { path: "/shop", element: <ShopMain /> },
      { path: "/shop/:section", element: <ShopSectionMain /> },
      { path: "/shop/c/:category", element: <ShopCategoryMain /> },
      { path: "/shop/p/:id", element: <ProductMain /> },
      { path: "/search", element: <SearchMain /> },
      { path: "/wishlist", element: <WishlistMain /> },
      { path: "/cart", element: <CartMain /> },
      { path: "/error", element: <ErrorPage /> },
    ],
  },
];

export default routes;
