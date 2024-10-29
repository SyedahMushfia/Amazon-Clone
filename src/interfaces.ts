import React from "react";
import { User } from "firebase/auth";

export interface ProductProps {
  title: string;
  imageInfo: {
    image: string;
    name?: string;
  }[];
  link?: string;
}

export interface ProductDetails {
  name: string;
  imageURLs: string[];
  rating: number;
  reviewsCount: number;
  monthlySalesCount: number;
  isBestseller: boolean;
  listPrice: number;
  discount?: number;
  shippingCharge: number;
  Color?: string[];
  Size?: string;
  Style?: string;
  Pattern?: string;
  brand: string;
  earPlacement?: string;
  formFactor?: string;
  noiseControl?: string;
  impedance?: number;
  compatibleDevices?: string;
  specialFeature?: string;
  recommendedUses?: string;
  connectivityTechnology?: string;
  productDescription: string[];
  dateFirstAvailable: Date;
}

export interface Data {
  id: string;
  data: ProductDetails[];
}

// Interface for sidebar data structure
export interface SidebarDataDetails {
  [key: string]: string[] | number;
}

// Interface for sidebar collection containing id and data
export interface SidebarData {
  id: string;
  data: SidebarDataDetails[];
}

export interface FilterState {
  selectedBrands: string[];
  selectedPriceRange: number[];
  selectedRating: number;
  sortOrder: string;
}

export interface SetBrandAction {
  type: "SET_BRAND";
  payload: string; // Assuming each brand is represented as a string
  id: string;
}

export interface SetPriceRangeAction {
  type: "SET_PRICE_RANGE";
  payload: number[]; // A tuple for the price range
  id: string;
}

export interface SetRatingAction {
  type: "SET_RATING";
  payload: number; // A number for the rating
  id: string;
}

export interface ClearBrandsAction {
  type: "CLEAR_BRANDS"; // No payload needed for clearing brands
  id: string;
}

export interface ClearRatingAction {
  type: "CLEAR_RATING";
  id: string;
}

export interface SortAction {
  type: string;
  payload: any;
  id: string | undefined;
}

export type FilterAction =
  | SetBrandAction
  | SetPriceRangeAction
  | SetRatingAction
  | ClearBrandsAction
  | ClearRatingAction
  | SortAction;

export interface FilterContextType {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}

export interface FilterProviderProps {
  children: React.ReactNode;
}

export interface CartItem {
  name: string;
  price: number;
  image: string;
  color: string | undefined;
  Size: string | undefined;
  Style: string | undefined;
  quantity: number;
  monthlySalesCount: number;
  shippingCharge: number;
}

export interface CartState {
  cart: CartItem[];
  savedItems: CartItem[];
  user: User | null;
}

export interface AddToCartAction {
  type: "ADD_TO_CART";
  payload: CartItem;
}

export interface UpdateQuantityAction {
  type: "UPDATE_QUANTITY";
  payload: { name: string; quantity: number };
}

export interface RemoveFromCartAction {
  type: "REMOVE_FROM_CART";
  payload: { name: string };
}

export interface SaveForLaterAction {
  type: "SAVE_FOR_LATER";
  payload: CartItem;
}

export interface RemoveFromSavedAction {
  type: "REMOVE_FROM_SAVED";
  payload: { name: string };
}

export interface LoadCartAction {
  type: "LOAD_CART";
  payload: CartItem[];
}

export interface LoadSavedItemsAction {
  type: "LOAD_SAVED_ITEMS";
  payload: CartItem[];
}

export interface SetUserAction {
  type: "SET_USER";
  payload: User | null;
}

export type CartAction =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateQuantityAction
  | SaveForLaterAction
  | RemoveFromSavedAction
  | LoadCartAction
  | LoadSavedItemsAction
  | SetUserAction;

export interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

export interface StateProviderProps {
  children: React.ReactNode;
}

export interface InputField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
}

export interface Form {
  [key: string]: string;
}
