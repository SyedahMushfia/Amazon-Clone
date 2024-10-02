import { createContext, useContext, useReducer } from "react";
import { FilterContextType, FilterProviderProps } from "../interfaces";
import { initialState, filterReducer } from "./filterReducer";

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export function useFilterContext() {
  const filter = useContext(FilterContext);

  if (filter === undefined) {
    throw new Error("useFilterContext must be used with FilterContext");
  }
  return filter;
}
