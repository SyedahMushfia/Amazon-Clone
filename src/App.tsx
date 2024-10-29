import Home from "./components/home/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CartPage from "./components/checkoutPage/CartPage";
import NotFoundPage from "./components/NotFoundPage";
import ProductListing from "./components/productsPages/productListingPage/ProductListing";
import Header from "./components/header/Header";
import { lazy, Suspense, useEffect } from "react";
const SignIn = lazy(() => import("./components/home/SignIn"));
import CheckVisibilityWrapper from "./components/home/CheckVisibilityWrapper";
import LoadingCircle from "./components/home/LoadingCircle";
import ScrollToTop from "./components/footer/ScrollToTop";
import FooterNav from "./components/footer/FooterNav";
import SignInPage from "./components/signInPage/SignInPage";
import CreateAccountPage from "./components/signInPage/CreateAccountPage";
import CheckoutPage from "./components/checkoutPage/CheckoutPage";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useStateContext } from "./context/StateContext";
import { CartItem } from "./interfaces";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51QDLMSGCE3LP7lo1sJFtUkL4ZeyFD45NObleN0cQDbu9Ai9mdH2B3BZjiMbbC7AlbLvGx7GlnNnkWBANFyLxJGvS001TXAIykL"
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cart",
        element: <CartPage />,
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
  {
    path: "/signIn",
    element: <SignInPage />,
  },
  {
    path: "/register",
    element: <CreateAccountPage />,
  },
  {
    path: "/checkout",
    element: (
      <Elements stripe={promise}>
        <CheckoutPage />
      </Elements>
    ),
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
  const { state, dispatch } = useStateContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("The user is", uid);

        dispatch({
          type: "SET_USER",
          payload: user,
        });
      } else {
        console.log("User is logged out!");

        dispatch({
          type: "SET_USER",
          payload: null,
        });
      }
    });
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      if (!state.user) return;

      try {
        const cartItemsRef = collection(db, "users", state.user.uid, "cart");
        const cartItemsSnapshot = await getDocs(cartItemsRef);
        const cartItems: CartItem[] = cartItemsSnapshot.docs.map((doc) => {
          const data = doc.data() as CartItem;
          return {
            id: doc.id,
            ...data,
          };
        });
        dispatch({ type: "LOAD_CART", payload: cartItems });

        const savedItemsRef = collection(
          db,
          "users",
          state.user.uid,
          "savedItems"
        );
        const savedItemsSnapshot = await getDocs(savedItemsRef);
        const savedItems: CartItem[] = savedItemsSnapshot.docs.map((doc) => {
          const data = doc.data() as CartItem;
          return {
            id: doc.id,
            ...data,
          };
        });
        if (savedItems.length > 0)
          dispatch({ type: "LOAD_SAVED_ITEMS", payload: savedItems });
        console.log("Fetched items successfully.");
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchItems();
  }, [state.user, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
