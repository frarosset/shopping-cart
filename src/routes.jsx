import App from "./App.jsx";
import ShopMain from "./components/Shop/ShopMain.jsx";
import ShopSectionMain from "./components/Shop/ShopSectionMain.jsx";
import ShopCategoryMain from "./components/Shop/ShopCategoryMain.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <div>Home</div> },
      { path: "/shop", element: <ShopMain /> },
      { path: "/shop/:section", element: <ShopSectionMain /> },
      { path: "/shop/c/:category", element: <ShopCategoryMain /> },
      { path: "/shop/p/:productId", element: <div>Product</div> },
    ],
  },
];

export default routes;
