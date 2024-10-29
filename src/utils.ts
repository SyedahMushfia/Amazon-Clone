import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { User } from "firebase/auth";
import { CartItem } from "./interfaces";

// Function to calculate the discounted price based on list price and discount percentage
export const calculateDiscountedPrice = (
  listPrice: number,
  discount: number
): number => {
  const discountedPrice = parseFloat(
    (listPrice - listPrice * (discount / 100)).toFixed(2)
  ); // Calculate the discounted price and format it to 2 decimal places
  return discountedPrice;
};

// Function to format sales count in a compact notation if it exceeds 1000
export const formatSalesCount = (num: number) => {
  if (num >= 1000) {
    const formattedSalesCount = new Intl.NumberFormat("en-US", {
      notation: "compact",
    }).format(num);
    return `${formattedSalesCount}+`; // Append a '+' sign to indicate more than the formatted value
  } else return num; // Return the number as is if it's less than 1000
};

// Function to calculate the delivery date by adding 20 days to the current date
export const calculateDeliveryDate = () => {
  const currentDate = new Date(); // Get the current date
  currentDate.setDate(currentDate.getDate() + 20); // Add 20 days to the current date

  return currentDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const getFromLocalStorage = (key: string) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : null;
};

export const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const updateCartItemInFirestore = async (
  user: User | null,
  cartItem: CartItem
) => {
  if (!user) {
    console.error("No user is logged in!");
    return;
  }

  if (user) {
    try {
      const cartItemRef = doc(db, "users", user.uid, "cart", cartItem.name);
      await setDoc(
        cartItemRef,
        {
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price,
          quantity: cartItem.quantity,
          shippingCharge: cartItem.shippingCharge,
        },
        { merge: true }
      );
      console.log("Cart item saved/updated in Firestore");
    } catch (error) {
      console.error("Error saving/updating cart item:", error);
    }
  }
};

export const removeCartItemFromFirestore = async (
  user: User | null,
  cartItem: CartItem
) => {
  if (!user) {
    console.error("No user is logged in!");
    return;
  }

  if (user) {
    try {
      const cartItemRef = doc(db, "users", user.uid, "cart", cartItem.name);
      await deleteDoc(cartItemRef);
      console.log("Cart item removed from Firestore");
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  }
};

export const saveCartOnLogout = async (
  user: User | null,
  cartItems: CartItem[]
) => {
  if (user) {
    try {
      if (user) {
        for (const item of cartItems) {
          const cartItemRef = doc(db, "users", user.uid, "cart", item.name);
          await setDoc(cartItemRef, item, { merge: true });
        }
        console.log("Cart saved to Firestore on logout");
      }
    } catch (error) {
      console.error("Error saving cart on logout:", error);
    }
  }
};

export const updateSavedItemsInFirestore = async (
  user: User | null,
  savedItem: CartItem
) => {
  if (!user) {
    console.error("No user is logged in!");
    return;
  }

  if (user) {
    try {
      const savedItemRef = doc(
        db,
        "users",
        user.uid,
        "savedItems",
        savedItem.name
      );
      await setDoc(
        savedItemRef,
        {
          name: savedItem.name,
          image: savedItem.image,
          price: savedItem.price,
          quantity: savedItem.quantity,
        },
        { merge: true }
      );
      console.log("Saved item updated in Firestore");
    } catch (error) {
      console.error("Error saving saved item:", error);
    }
  }
};

export const removeSavedItemsFromFirestore = async (
  user: User | null,
  savedItem: CartItem
) => {
  if (!user) {
    console.error("No user is logged in!");
    return;
  }

  if (user) {
    try {
      const savedItemRef = doc(
        db,
        "users",
        user.uid,
        "savedItems",
        savedItem.name
      );
      await deleteDoc(savedItemRef);
      console.log("Saved item removed from Firestore");
    } catch (error) {
      console.error("Error removing saved item:", error);
    }
  }
};

export const saveAllSavedItemsOnLogout = async (
  user: User | null,
  savedItems: CartItem[]
) => {
  if (user) {
    try {
      if (user) {
        for (const item of savedItems) {
          const savedItemRef = doc(
            db,
            "users",
            user.uid,
            "savedItems",
            item.name
          );
          await setDoc(savedItemRef, item, { merge: true });
        }
        console.log("All saved items are saved to Firestore on logout");
      }
    } catch (error) {
      console.error("Error saving all saved items on logout:", error);
    }
  }
};
