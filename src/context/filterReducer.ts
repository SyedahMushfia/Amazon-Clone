import { FilterState, FilterAction } from "../interfaces";

// Initial state for the filter reducer, defining the default values for selected brands, price range, rating, and sort order.
export const initialState: FilterState = {
  selectedBrands: [],
  selectedPriceRange: [0, 550],
  selectedRating: 0,
  sortOrder: "",
};

// Reducer function to manage the state of filters based on dispatched actions.
export const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_BRAND": {
      const brand = action.payload;
      const id = action.id;
      const isBrandSelected = state.selectedBrands.includes(brand);

      const updatedBrands = isBrandSelected
        ? state.selectedBrands.filter((b) => b !== brand)
        : [...state.selectedBrands, brand];

      return { ...state, selectedBrands: updatedBrands };
    }
    case "CLEAR_BRANDS": {
      const id = action.id;
      return { ...state, selectedBrands: [] };
    }
    case "SET_PRICE_RANGE": {
      const updatedPriceRange = action.payload;
      const id = action.id;
      return { ...state, selectedPriceRange: updatedPriceRange };
    }
    case "SET_RATING": {
      const updatedRating = action.payload;
      const id = action.id;
      return { ...state, selectedRating: updatedRating };
    }
    case "CLEAR_RATING": {
      const id = action.id;
      return { ...state, selectedRating: 0 };
    }
    case "SET_SORT_ORDER": {
      const updatedSortOrder = action.payload;
      const id = action.id;
      return { ...state, sortOrder: updatedSortOrder };
    }
    default:
      return state;
  }
};
