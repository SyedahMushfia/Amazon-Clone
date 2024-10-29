import { Link, useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import { useStateContext } from "../../context/StateContext";
import { getCartTotal } from "../../context/StateReducer";
import { FormEvent, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PaymentMethodForm from "./PaymentMethodForm";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { StripeCardNumberElement } from "@stripe/stripe-js";

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

function CheckoutPage() {
  const { state } = useStateContext();

  const navigate = useNavigate();

  const stripe = useStripe();

  const [isAddressSaved, setIsAddressSaved] = useState<Address | null>(null);

  const [succeeded, setIsSucceeded] = useState(false);
  const [processing, setIsProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [cardDetails, setCardDetails] =
    useState<StripeCardNumberElement | null>(null);

  const [isFixed, setIsFixed] = useState(false);
  const scrollPoint = 90;

  const cartTotal = getCartTotal(state.cart);
  const shippingTotal = state.cart.reduce(
    (acc, item) => acc + item.shippingCharge,
    0
  );
  const orderTotal = cartTotal + shippingTotal;

  // Fetch saved address when user state changes
  useEffect(() => {
    const fetchSavedAddress = async () => {
      if (state.user) {
        try {
          const addressCollectionRef = collection(
            db,
            "users",
            state.user.uid,
            "addresses"
          );
          const addressSnapshot = await getDocs(addressCollectionRef);

          if (!addressSnapshot.empty) {
            const addressData = addressSnapshot.docs[0].data() as Address;
            setIsAddressSaved(addressData);
          } else console.log("No saved addresses found.");
        } catch (error) {
          console.error("Error fetching saved address:", error);
        }
      }
    };

    fetchSavedAddress();
  }, [state.user]);

  const handleAddressSaved = (address: Address) => {
    setIsAddressSaved(address);
  };

  const handleScroll = () => {
    if (window.scrollY >= scrollPoint) setIsFixed(true);
    else setIsFixed(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCardDetails = (details: {
    card: StripeCardNumberElement | null;
  }) => {
    setCardDetails(details.card);
  };

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getCartTotal(state.cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [state.cart]);

  console.log("The secret is >>>", clientSecret);

  const handlePaymentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cardDetails) {
      setError("Payment information is incomplete.");
      setIsProcessing(false);
      return;
    }

    setIsProcessing(true);

    const payload = await stripe
      ?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardDetails,
        },
      })
      .then(({ paymentIntent }) => {
        setIsSucceeded(true);
        setError("");
        setIsProcessing(false);

        navigate("/orders");
      });
  };

  return (
    <>
      <div className="mx-[1.5%]">
        <div className="flex justify-start items-center gap-80 pt-[1%] pb-[0.25%] pl-[6%] pr-[9%] bg-gradient-to-t from-gray-100 via-white to-white">
          <Link to="/">
            <div className="mb-[2%]">
              <img src="images/amazon-dark-logo.png" alt="amazon-logo" />
            </div>
          </Link>

          <div className="text-clamp16">
            Checkout (
            <span className="text-clamp18 text-cyan-700">
              {state.cart.reduce((acc, item) => acc + item.quantity, 0)}{" "}
              {state.cart.reduce((acc, item) => acc + item.quantity, 0) === 1
                ? "item"
                : "items"}
            </span>
            )
          </div>
          <div className="ml-[5%]">
            <img src="images/secured-ssl._CB485936932_.png" alt="" />
          </div>
        </div>
        <div className="border-gray-300 border-t-[0.5px] mb-[1%]">
          {/*Line Break */}
        </div>
        <div className="flex justify-start px-[8%] gap-[4%]">
          <div className="w-[57vw]">
            {isAddressSaved ? (
              <>
                <div className="basis-3/4 flex justify-between">
                  <div className="text-clamp19 font-bold tracking-wide text-black basis-1/3">
                    1 <span className="ml-[2%]">Shipping address</span>
                  </div>
                  <div className="text-clamp10">
                    <p>{isAddressSaved.name}</p>
                    <p>{isAddressSaved.street}</p>
                    <p>
                      {isAddressSaved.city}, {isAddressSaved.state},{" "}
                      {isAddressSaved.zip}
                    </p>
                  </div>
                  <div className="text-clamp4 text-cyan-700">Change</div>
                </div>
              </>
            ) : (
              <div className="w-[57vw]">
                <div className="text-clamp19 font-bold tracking-wide text-amber-700">
                  1{" "}
                  <span className="ml-[2%]">Enter a new shipping address</span>
                </div>
                <AddressForm onAddressSave={handleAddressSaved} />
              </div>
            )}

            {isAddressSaved && (
              <>
                <div className="border-slate-300 border-t-[0.5px] my-[1%] ">
                  {/*Line Break */}
                </div>
                <div className="w-[57vw]">
                  <div className="text-clamp19 font-bold tracking-wide text-amber-700">
                    2 <span className="ml-[2%]">Choose a payment method</span>
                  </div>
                  <PaymentMethodForm onHandleCardDetails={handleCardDetails} />
                </div>
              </>
            )}
            <div className="border-slate-300 border-t-[2px] my-[5%] ">
              {/*Line Break */}
            </div>
            <div className="text-clamp6 text-gray-600">
              <p className="mb-[1%]">
                *Why has sales tax been applied? See tax and seller information.
              </p>
              <p className="mb-[1%]">
                Need help? Check our Help pages or contact us
              </p>
              <p className="mb-[1%]">
                For an item sold by Amazon.com: When you click the "Place your
                order" button, we'll send you an email message acknowledging
                receipt of your order. Your contract to purchase an item will
                not be complete until we send you an email notifying you that
                the item has been shipped.
              </p>
              <p className="mb-[1%]">
                All items in this order are sold by Amazon Export Sales LLC
                (AES), unless otherwise noted. By placing your order, you
                authorize AES to designate a carrier to clear the package and
                pay the import fees on your (or the recipient's) behalf. Customs
                declarations will be made in the name and on the behalf of your
                (or the recipient's) behalf by the designated carrier. You can
                find the complete terms and conditions of your order here
              </p>
              <p className="mb-[1%]">
                You may return new, unopened merchandise in original condition
                within 30 days of delivery. Exceptions and restrictions apply.
                See Amazon.com's Returns Policy.
              </p>
              <p className="mb-[1%]">
                Need to add more items to your order? Continue shopping on the
                Amazon.com homepage.
              </p>
            </div>
          </div>

          <form onSubmit={handlePaymentSubmit}>
            <div
              className={`border-[1px] border-slate-300 rounded-[8px] h-[58.75vh] basis-1/4 ${
                isFixed ? "w-[20vw] fixed left-[70.25%] top-3" : "relative"
              }`}
            >
              <div className="px-[5%] py-[5%] ">
                <button
                  disabled={processing || disabled || succeeded}
                  className={`text-clamp10 py-[1.5%] px-[38.5%] mb-[1%] rounded-[25px]
                    ${
                      disabled
                        ? "bg-gray-200 border-gray-300 border-[2px]"
                        : "bg-yellow-200 border-yellow-400"
                    }`}
                >
                  <span>{processing ? "Processing..." : "Buy now"}</span>
                </button>
                <p className="text-center text-clamp9 leading-4 mb-[3%]">
                  Choose a payment method to continue checking out. You'll still
                  have a chance to review and edit your order before it's final.
                </p>
                <div className="border-slate-300 border-t-[0.5px] mb-[4%] ">
                  {/*Line Break */}
                </div>
                <h2 className="font-bold text-clamp17 tracking-wide mb-[3%]">
                  Order Summary
                </h2>
                <div className="flex justify-between text-clamp9">
                  <p>
                    Items (
                    {state.cart.reduce((acc, item) => acc + item.quantity, 0)}):
                  </p>
                  <p>${cartTotal}</p>
                </div>
                <div className="flex justify-between text-clamp9">
                  <p>Shipping & handling:</p>
                  <p>${shippingTotal}</p>
                </div>
                <div className="border-slate-300 border-t-[0.5px] mt-[3%] mb-[4%]">
                  {/*Line Break */}
                </div>
                <div className="flex justify-between font-bold text-clamp17 tracking-wide text-red-800 ">
                  <h2>Order total:</h2>
                  <h2>${orderTotal}</h2>
                </div>
              </div>
              <div className="bg-gray-200 px-[5%] py-[5%] rounded-b-[8px]">
                <p className="text-clamp9 leading-4">
                  Products that originate from abroad, will be imported. If
                  applicable, these products could be subject to an import
                  declaration, import duties and or taxes that are already
                  included, at no extra cost to you{" "}
                  <span className="text-cyan-700">Learn more</span>
                </p>
                <p className="text-clamp9 leading-4 text-cyan-700 my-[1%]">
                  How are shipping costs calculated?
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
