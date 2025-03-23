import App from "./App.jsx";
import ErrorPage from "./components/Errors/ErrorPage.jsx";
import ErrorRedirect from "./components/Errors/ErrorRedirect.jsx";
import ShopMain from "./components/Shop/ShopMain.jsx";
import ShopSectionMain from "./components/Shop/ShopSectionMain.jsx";
import ShopCategoryMain from "./components/Shop/ShopCategoryMain.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorRedirect />,
    children: [
      { index: true, element: <div>Home</div> },
      { path: "/shop", element: <ShopMain /> },
      { path: "/shop/:section", element: <ShopSectionMain /> },
      { path: "/shop/c/:category", element: <ShopCategoryMain /> },
      { path: "/shop/p/:productId", element: <div>Product</div> },
    ],
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
];

export default routes;
