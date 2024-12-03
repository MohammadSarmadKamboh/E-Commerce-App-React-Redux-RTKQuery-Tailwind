import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/views/Home";
import RoutingErrorsPage from "@/components/custom/RoutingErrorsPage";
import ProductsList from "@/components/custom/ProductsList";
import ProductDetail from "@/components/custom/ProductDetail";
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
        element: <ProductsList />,
      },

      {
        path: paths.productDetail,
        element: <ProductDetail />,
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
