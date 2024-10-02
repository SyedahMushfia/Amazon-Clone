import { CartState, CartAction, CartItem } from "../interfaces";

// Initial state for the cart and saved items
export const initialState: CartState = {
  cart: [],
  savedItems: [],
};

// Function to calculate the total price of the items in the cart
export const getCartTotal = (cart: CartItem[]) => {
  return cart?.reduce((accumulator: number, product): number => {
    const totalPrice = product.price * Number(product.quantity);
    return accumulator + totalPrice;
  }, 0);
};

// Reducer to handle cart-related actions
export const reducer = (state: CartState, action: CartAction): CartState => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_CART": {
      // Check if the product already exists in the cart
      const existingItem = state.cart.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        // If the product exists, increase the quantity
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.name === action.payload.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If the product does not exist, add it to the cart with quantity 1
        return {
          ...state,
          cart: [
            ...state.cart,
            { ...action.payload, quantity: action.payload.quantity || 1 },
          ],
        };
      }
    }
    case "UPDATE_QUANTITY": {
      const { name, quantity } = action.payload;

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.name === name ? { ...item, quantity } : item
        ),
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.name !== action.payload.name),
      };
    }
    case "SAVE_FOR_LATER": {
      // Find the item to be saved for later
      const savedItem = state.cart.find(
        (item) => item.name === action.payload.name
      );
      if (savedItem) {
        // If the item is found, move it from cart to saved items
        return {
          ...state,
          cart: state.cart.filter((item) => item.name !== action.payload.name),
          savedItems: [...state.savedItems, savedItem],
        };
      }
      return state;
    }
    case "REMOVE_FROM_SAVED": {
      return {
        ...state,
        savedItems: state.savedItems.filter(
          (item) => item.name !== action.payload.name
        ),
      };
    }
    default:
      return state;
  }
};
