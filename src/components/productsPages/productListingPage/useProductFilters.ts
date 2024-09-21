import { useState, useEffect } from "react";
import { Data, ProductDetails } from "../../../interfaces";
import { getFromLocalStorage, saveToLocalStorage } from "../../../utils";

const useProductFilters = (allProducts: Data[], id: string | undefined) => {
  // State to manage the list of filtered products based on selected brands and price range
  const [filteredProducts, setFilteredProducts] = useState<ProductDetails[]>(
    []
  );

  // State to manage the selected brands from the BrandsFilter component
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    return getFromLocalStorage(`selectedBrands-${id}`) || [];
  });

  // State to store the selected price range from the PriceRangeSlider component
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>(() => {
    return getFromLocalStorage(`selectedPriceRange-${id}`) || [0, 550];
  });

  // State to store the selected rating from the StarRating component
  const [selectedRatings, setSelectedRatings] = useState<number>(() => {
    return getFromLocalStorage(`selectedRatings-${id}`) || 4;
  });

  // Find the product matching the current id
  const matchedProduct = allProducts.find((product) => product.id === id);

  // Effect to restore saved filters (brands, price range, and products) from localStorage
  useEffect(() => {
    if (matchedProduct && matchedProduct.data) {
      const savedBrands = getFromLocalStorage(`selectedBrands-${id}`);
      const savedPriceRange = getFromLocalStorage(`selectedPriceRange-${id}`);
      const savedRatings = getFromLocalStorage(`selectedRatings-${id}`);
      const savedProducts = getFromLocalStorage(`filteredProducts-${id}`);

      // Restore brands, price range and rating if available
      if (savedBrands) {
        setSelectedBrands(savedBrands);
      }
      if (savedPriceRange) {
        setSelectedPriceRange(savedPriceRange);
      }

      if (savedRatings) {
        setSelectedRatings(savedRatings);
      }

      // Restore filtered products if available
      if (savedProducts) {
        setFilteredProducts(savedProducts);
      }

      // Apply the filters after restoring saved state
      const filtered = matchedProduct.data
        .filter((product: ProductDetails) =>
          savedBrands && savedBrands.length > 0
            ? savedBrands.includes(product.brand)
            : true
        )
        .filter(
          (product: ProductDetails) =>
            product.listPrice >= savedPriceRange &&
            product.listPrice <= savedPriceRange
        )
        .filter((product: ProductDetails) =>
          savedRatings ? product.rating >= savedRatings : true
        );

      setFilteredProducts(filtered);
      saveToLocalStorage(`filteredProducts-${id}`, filtered);
    }
  }, [selectedBrands, selectedPriceRange, selectedRatings, matchedProduct, id]);

  // Effect to re-apply filters whenever selected brands, price range or ratings change
  useEffect(() => {
    if (matchedProduct && matchedProduct.data) {
      const filtered = matchedProduct.data
        .filter((product: ProductDetails) =>
          selectedBrands.length > 0
            ? selectedBrands.includes(product.brand)
            : true
        )
        .filter(
          (product: ProductDetails) =>
            product.listPrice >= selectedPriceRange[0] &&
            product.listPrice <= selectedPriceRange[1]
        )
        .filter((product: ProductDetails) =>
          selectedRatings ? product.rating >= selectedRatings : true
        );

      setFilteredProducts(filtered);
      saveToLocalStorage(`filteredProducts-${id}`, filtered);
    }
  }, [selectedBrands, selectedPriceRange, selectedRatings, matchedProduct, id]);

  // Handle changes in selected brands and save to localStorage
  const handleBrandFilterChange = (selectedBrands: string[]) => {
    setSelectedBrands(selectedBrands);
    saveToLocalStorage(`selectedBrands-${id}`, selectedBrands);
  };

  // Handle changes in selected price range and save to localStorage
  const handlePriceFilterChange = (minPrice: number, maxPrice: number) => {
    const updatedPriceRange = [minPrice, maxPrice];
    setSelectedPriceRange(updatedPriceRange);
    saveToLocalStorage(`selectedPriceRange-${id}`, updatedPriceRange);
  };

  // Handle changes in selected rating and save to localStorage
  const handleRatingsChange = (rating: number) => {
    setSelectedRatings(rating);
    saveToLocalStorage(`selectedRatings-${id}`, rating);
  };

  return {
    filteredProducts,
    handleBrandFilterChange,
    handlePriceFilterChange,
    handleRatingsChange,
  };
};

export default useProductFilters;
