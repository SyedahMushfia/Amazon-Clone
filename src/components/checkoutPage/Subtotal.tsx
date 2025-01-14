import { useStateContext } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";

//For currency formatting:
const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

interface CurrencyComponentProps {
  totalPrice: number;
}

function Subtotal(props: CurrencyComponentProps) {
  const { state } = useStateContext();

  const navigate = useNavigate();

  const formattedValue = formatCurrency(props.totalPrice);

  const handleCheckoutClick = () => {
    console.log(state.user);
    if (state.user) navigate("/checkout");
    else navigate("/signIn");
  };

  return (
    <>
      <div className="bg-white flex-[1_1_22.25%] mr-[1.5%] mt-[1.5%] px-[1.75%] py-[1.5%] h-[25vh]">
        <h1 className="font-sans text-[20px]">
          {/* Display total items and formatted subtotal price */}
          Subtotal ({state.cart.reduce(
            (acc, item) => acc + item.quantity,
            0
          )}{" "}
          {state.cart.reduce((acc, item) => acc + item.quantity, 0) === 1
            ? "item"
            : "items"}
          ): <strong>{formattedValue}</strong>
        </h1>
        <div className="flex mb-[5%]">
          <input type="checkbox" id="hasGiftCheckbox" />
          <label
            htmlFor="hasGiftCheckbox"
            className="font-sans text-[14px] ml-[2%]"
          >
            This order contains a gift
          </label>
        </div>
        <button
          onClick={handleCheckoutClick}
          className="font-sans text-[13.5px] bg-amber-300 py-[2%]  w-[100%] rounded-[0.5rem]"
        >
          Proceed to checkout
        </button>
      </div>
    </>
  );
}

export default Subtotal;
