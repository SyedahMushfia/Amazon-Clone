import { useStateContext } from "../../context/StateContext";
import { CartItem } from "../../interfaces";
import { GetColorName } from "hex-color-to-color-name";
import { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  removeCartItemFromFirestore,
  updateCartItemInFirestore,
} from "../../utils";

interface CartItemProps {
  product: CartItem;
}

// Function to format the currency for display
const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

function CartItems(props: CartItemProps) {
  const { state, dispatch } = useStateContext();

  const quantityArray = ["0 (Delete)", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Array for quantity options

  // State for selected quantity, initialized with the product's quantity
  const [selectedQuantity, setSelectedQuantity] = useState(
    props.product.quantity || quantityArray[1]
  );

  // State for calculating total price based on quantity
  const [totalPrice, setTotalPrice] = useState(
    props.product.price * Number(selectedQuantity)
  );

  // State to manage toggle dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Reference to the button element
  const dropdownButtonRef = useRef<HTMLDivElement>(null);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(true);
  };

  // Handler for clicks outside the dropdown to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownButtonRef.current &&
      !dropdownButtonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // To add event listener for outside clicks when the dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Effect to update selected quantity and total price when product quantity changes
  useEffect(() => {
    setSelectedQuantity(props.product.quantity);
    setTotalPrice(props.product.price * Number(props.product.quantity));
  }, [props.product.quantity]);

  // Handler for quantity selection
  const handleQuantityClick = (quantity: string | number) => {
    setSelectedQuantity(quantity);

    if (quantity === "0 (Delete)") {
      // Remove item from cart if 'Delete' is selected
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: { name: props.product.name },
      });
      removeCartItemFromFirestore(state.user, props.product);
    } else {
      // Update the item quantity in the cart
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { name: props.product.name, quantity: Number(quantity) },
      });
      updateCartItemInFirestore(state.user, {
        ...props.product,
        quantity: Number(quantity),
      });
    }
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <>
      <div className="flex   h-[25vh] my-[1.5%] ml-[1.5%]">
        <div className=" w-[20%] h-full ">
          <img
            src={props.product.image}
            alt={props.product.name}
            className="h-full w-full object-contain object-center"
          />
        </div>
        <div className=" w-[65%] font-sans ml-[1%]">
          <h1 className="line-clamp-2 text-clamp17 leading-6 ">
            {props.product.name}
          </h1>
          <div className="mt-[2%] text-clamp6 text-green-600">
            <p>In Stock</p>
          </div>
          <div className="flex">
            <input type="checkbox" id="hasGiftCheckbox" />
            <label
              htmlFor="hasGiftCheckbox"
              className="font-sans text-clamp6 ml-[1%]"
            >
              This is a gift <span className="text-cyan-800">Learn more</span>
            </label>
          </div>
          {props.product.color && (
            <div className="font-sans text-clamp6">
              <span className="font-bold">Color:</span>{" "}
              {GetColorName(props.product.color)}
            </div>
          )}
          {props.product.Size && (
            <div className="font-sans text-clamp6">
              <span className="font-bold">Size:</span> {props.product.Size}
            </div>
          )}
          {props.product.Style && (
            <div className="font-sans text-clamp6">
              <span className="font-bold">Style:</span> {props.product.Style}
            </div>
          )}
          <div className="flex justify-start items-center gap-4 mt-[2%]">
            <div ref={dropdownButtonRef}>
              {!isOpen && (
                <button
                  onClick={toggleDropdown}
                  className=" w-[5.5vw] h-[5vh] border-[1px] border-slate-300 rounded-[8px] bg-slate-100 font-sans text-clamp1 pl-[3.5%] "
                >
                  Qty: {selectedQuantity}
                  <KeyboardArrowDownIcon
                    className="text-gray-600"
                    style={{
                      fontSize: "15px",
                    }}
                  />
                </button>
              )}
              {/* Render the dropdown menu when the dropdown is open */}
              {isOpen && (
                <div className="w-[6.5vw] h-[46.5vh] py-[5%] font-sans text-clamp4 bg-white border-[1px] border-gray-400 rounded-[8px] drop-shadow ">
                  {quantityArray.map((num, index) => {
                    return (
                      <ul key={index}>
                        <li
                          key={num}
                          onClick={() => handleQuantityClick(num)}
                          className={`pl-[12%] py-[1.5%] hover:cursor-pointer hover:bg-gray-100 hover:border-[1px] hover: border-gray-400 ${
                            selectedQuantity === num &&
                            "bg-cyan-50 border-[3px] border-cyan-600"
                          }`}
                        >
                          {num}
                        </li>
                        {num === 9 && (
                          <div className="border-slate-300 border-t-[0.5px] mb-[3%]">
                            {/*Line Break */}
                          </div>
                        )}
                      </ul>
                    );
                  })}
                </div>
              )}
            </div>
            <div
              className="font-sans text-clamp6 text-cyan-800 hover: cursor-pointer"
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: { name: props.product.name },
                });
                removeCartItemFromFirestore(state.user, props.product);
              }}
            >
              Delete
            </div>
            <div
              className="font-sans text-clamp6 text-cyan-800 hover: cursor-pointer"
              onClick={() => {
                dispatch({
                  type: "SAVE_FOR_LATER",
                  payload: {
                    name: props.product.name,
                    price: props.product.price,
                    image: props.product.image,
                    quantity: props.product.quantity,
                    color: props.product.color,
                    Style: props.product.Style,
                    monthlySalesCount: props.product.monthlySalesCount,
                    Size: props.product.Size,
                    shippingCharge: props.product.shippingCharge,
                  },
                });
              }}
            >
              Save for later
            </div>
            <div className="font-sans text-clamp6 text-cyan-800">Share</div>
          </div>
        </div>
        <div className="flex justify-end font-sans font-bold w-[17%] text-clamp17">
          {formatCurrency(totalPrice)}
        </div>
      </div>
      <div className="border-slate-300 border-t-[0.5px] my-[3%]">
        {/*Line Break */}
      </div>
    </>
  );
}

export default CartItems;
