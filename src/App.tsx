import Home from "./components/home/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ImageStylingContext, images } from "./context/ImageStylingContext";
import CheckoutPage from "./components/checkoutPage/CheckoutPage";
import NotFoundPage from "./components/NotFoundPage";
import ProductListing from "./components/productsPage/productListingPage/ProductListing";
import Header from "./components/header/Header";
import { lazy, Suspense } from "react";
const SignIn = lazy(() => import("./components/home/SignIn"));
import CheckVisibilityWrapper from "./components/home/CheckVisibilityWrapper";
import LoadingCircle from "./components/home/LoadingCircle";
import ScrollToTop from "./components/footer/ScrollToTop";
import FooterNav from "./components/footer/FooterNav";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ImageStylingContext.Provider value={images}>
        <LayoutComponent />
      </ImageStylingContext.Provider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/productListing/:id",
        element: <ProductListing />,
      },
    ],
  },
  {
    path: "/notFoundPage",
    element: <NotFoundPage />,
  },
]);

function LayoutComponent() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* This wrapper is used to check component visibility. */}
      <CheckVisibilityWrapper>
        <Suspense fallback={<LoadingCircle />}>
          <SignIn />
        </Suspense>
      </CheckVisibilityWrapper>
      <ScrollToTop />
      <FooterNav />
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
