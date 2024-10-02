import React, { createContext, useContext, useReducer } from "react";
import { CartContextProps, StateProviderProps } from "../interfaces";
import { initialState, reducer } from "./StateReducer";

export const StateContext = createContext<CartContextProps | undefined>(
  undefined
);

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const cart = useContext(StateContext);

  if (cart === undefined) {
    throw new Error("useStateContext must be used with StateProvider");
  }

  return cart;
};
