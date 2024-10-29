import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeCardNumberElement } from "@stripe/stripe-js";
import { StripeElementChangeEvent } from "@stripe/stripe-js";
import { ChangeEvent, FormEvent, useState } from "react";

interface PaymentMethodFormProps {
  onHandleCardDetails: (details: {
    card: StripeCardNumberElement | null;
  }) => void;
}

function PaymentMethodForm(props: PaymentMethodFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

  const elements = useElements();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent click event from propagating to parent elements
    e.stopPropagation();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const cardNumber = elements?.getElement(CardNumberElement);

    if (cardNumber) {
      props.onHandleCardDetails({
        card: cardNumber,
      });
    } else {
      console.error("Failed to retrieve card elements.");
    }
  };

  const handleChange = (e: StripeElementChangeEvent) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" ml-[5%] my-[1%]  pt-[1.5%] border-[1px] border-slate-300 rounded-[8px]">
          <div className="pl-[2.5%] pr-[3%]">
            <h2 className="text-clamp15 font-bold tracking-wide ">
              Your credit and debit cards
            </h2>
            <div className="border-slate-300 border-t-[0.5px] mt-[1%] mb-[2%]">
              {/*Line Break */}
            </div>
            <div className="flex items-center mb-[4%]">
              <AddIcon
                onClick={handleOpen}
                className="ml-[1%] text-gray-300 hover:cursor-pointer"
                style={{
                  fontSize: "clamp(1.125rem, 0.8609rem + 1.1268vw, 1.875rem)",
                }}
              />
              <div className="w-[4%] ml-[1%]">
                <img src="images/card-logo-compact.gif" />
              </div>
              <p
                onClick={handleOpen}
                className="ml-[3%] text-clamp10 text-cyan-700 hover:underline hover:cursor-pointer hover:text-amber-700"
              >
                Add a credit or debit card
              </p>
              <ArrowForwardIosIcon
                className="text-cyan-700 mt-[0.5%]"
                style={{
                  fontSize: "clamp(0.25rem, 0.118rem + 0.5634vw, 0.625rem)",
                }}
              />
              <p className="text-clamp7 text-gray-600 ml-[1%]">
                Amazon accepts all major credit cards.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-b-[10px] border-t-[1px] border-t-slate-300 py-[14px] pl-[2%]">
            <button className="text-clamp10 bg-yellow-200 border-[2px] border-yellow-400 py-[0.5%] px-[1.5%] rounded-[25px]">
              Use this payment method
            </button>
          </div>
        </div>
      </form>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div
            className="bg-white w-[53vw] rounded-[10px]"
            onClick={stopPropagation}
          >
            <div className="bg-gray-100 rounded-t-[10px] border-b-[1px] border-b-gray-300 flex justify-between items-center py-[2%] px-[3%] text-clamp2 font-bold">
              <h2>Add a credit or debit card</h2>
              <CloseIcon
                onClick={handleClose}
                className="hover:cursor-pointer"
              />
            </div>
            <div className="flex py-[2%] border-b-[1px] border-b-gray-300">
              <form className="basis-3/5" onSubmit={handleSubmit}>
                <div>
                  <div className="flex items-center ml-[13%] mb-[2%]">
                    <label
                      htmlFor="cardNumber"
                      className="text-clamp4 font-bold tracking-wide mb-[0.5%]"
                    >
                      Card number
                    </label>

                    <div className="text-clamp10 border-[1px] border-gray-700 ml-[4%] rounded-[5px] px-[4%] py-[2%] w-[12.5vw] outline-none">
                      <CardNumberElement
                        id="cardNumber"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex items-center ml-[11%]">
                    <label
                      htmlFor="cardholderName"
                      className="text-clamp4 font-bold tracking-wide mb-[0.5%]"
                    >
                      Name on card
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      value={cardholderName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCardholderName(e.target.value)
                      }
                      className="text-clamp10 border-[1px]  border-gray-700 ml-[4.5%] rounded-[5px] px-[1%] py-[0.75%] outline-none"
                    />
                  </div>
                  <div className="flex items-center ml-[8%] mt-[2%]">
                    <label
                      htmlFor="cardExpiry"
                      className="text-clamp4 font-bold tracking-wide mb-[0.5%]"
                    >
                      Expiration date
                    </label>
                    <div className="text-clamp10 border-[1px] border-gray-700 ml-[4.5%] rounded-[5px] px-[4%] py-[2%] w-[6.5vw] outline-none">
                      <CardExpiryElement
                        id="cardExpiry"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex items-center ml-[11%] -mt-[1.75%]">
                    <div className="flex flex-col justify-center mt-[5%]">
                      <label
                        htmlFor="cardCVC"
                        className="text-clamp4 font-bold tracking-wide mb-[0.5%]"
                      >
                        Security Code
                      </label>
                      <span className="text-clamp4 font-bold tracking-wide ml-[25%] -mt-[2%]">
                        (CVV/CVC)
                      </span>
                    </div>
                    <div className="text-clamp10 border-[1px] border-gray-700 ml-[4.5%] rounded-[5px] px-[4%] py-[2%] w-[4.75vw] outline-none">
                      <CardCvcElement id="cardCVC" onChange={handleChange} />
                    </div>
                    <p className="text-clamp10 ml-[3%]">
                      (
                      <span className="text-cyan-700 text-clamp10">
                        What's this?
                      </span>
                      )
                    </p>
                  </div>
                </div>
              </form>
              <div className=" bg-slate-200 h-auto w-[0.05vw] ">
                {/* Line Break */}
              </div>
              <div className="ml-[2%] ">
                <p className="text-clamp10 mb-[0.5%]">
                  Amazon accepts all major credit and debit cards:
                </p>
                <img src="images/card-icons.png" alt="" />
              </div>
            </div>
            <div className="flex justify-end bg-gray-100 rounded-b-[10px] py-[1%] pr-[3%]">
              <button
                onClick={handleClose}
                className="hover:cursor-pointer text-clamp10 bg-white border-[1px] border-gray-800 mr-[1%] py-[0.5%] px-[1.5%] rounded-[25px]"
              >
                Cancel
              </button>
              <button className="text-clamp10 bg-yellow-400 py-[0.5%] px-[1.5%] rounded-[25px]">
                Add your card
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentMethodForm;
