import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/views/Home";
import RoutingErrorsPage from "@/components/custom/RoutingErrorsPage";
import ProductsListPage from "@/components/custom/ProductsListPage";
import ProductDetailPage from "@/components/custom/ProductDetailPage";
import ProductsCategoryPage from "@/components/custom/ProductsCategoryPage";
// import SignUp from "@/views/SignUp";
// import SignIn from "@/views/SignIn";
// import ForgetPassword from "@/views/ForgetPassword";

const routes = createBrowserRouter([
  {
    path: paths.root,
    element: <DefaultLayout />,
    errorElement: <RoutingErrorsPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: paths.productsFromApi,
        element: <ProductsListPage />,
      },

      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },

      {
        path: "/products/category/:category", // Dynamic category page
        element: <ProductsCategoryPage />, // You will render products of a specific category here
      },
      

      //    include more nested routes as written below
      //   {
      //     path: paths.signUp,
      //     element: <SignUp />,
      //   },
      //   {
      //     path: paths.signIn,
      //     element: <SignIn />,
      //   },
      //   {
      //     path: paths.forgetPassword,
      //     element: <ForgetPassword />,
      //   },
    ],
  },
  // ... other top-level routes
]);

export default routes;
