import { useParams, Navigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import DropdownButton from "./DropdownButton";
import ProductListingResults from "./results/ProductListingResults";
import { useProductDetails, useSidebarData } from "../useDataFetchingHooks";
import { useState, useEffect } from "react";
import { ProductDetails } from "../../../interfaces";
import { calculateDiscountedPrice } from "../../../utils";
import { useFilterContext } from "../../../context/FilterContext";

function ProductListing() {
  const { id } = useParams<{ id: string }>();
  // Fetch product details
  const { allProducts, } = useProductDetails();

  const { state, dispatch } = useFilterContext();

  // Fetch sidebar data
  const { sidebarData } = useSidebarData();

  // State for sorted products
  const [sortedProducts, setSortedProducts] = useState<ProductDetails[]>([]);

  // Redirect to NotFoundPage if 'id' parameter is missing
  if (!id) {
    return <Navigate to="/notFoundPage" />;
  }

  // Find the matching product and sidebar data based on the 'id' parameter
  const matchedCategory = {
    product: allProducts.find((product) => product.id === id),
    sidebarData: sidebarData.find((sidebar) => sidebar.id === id),
  };

  let filteredProducts: ProductDetails[] = [];

  if (matchedCategory.product && matchedCategory.product.data) {
    filteredProducts = matchedCategory.product.data.filter((product) => {
      const matchedBrands =
        state.selectedBrands.length > 0
          ? state.selectedBrands.includes(product.brand)
          : true;

      const finalPrice = product.discount
        ? calculateDiscountedPrice(product.listPrice, product.discount)
        : product.listPrice;

      // Check if the product price falls within the selected price range
      const matchedPriceRange =
        finalPrice >= state.selectedPriceRange[0] &&
        finalPrice <= state.selectedPriceRange[1];

      const matchedRating =
        state.selectedRating > 0
          ? product.rating >= state.selectedRating
          : true;

      return matchedBrands && matchedPriceRange && matchedRating;
    });
  }

  if (filteredProducts.length === 0 && matchedCategory.product) {
    return <div>No results found based on your filters.</div>;
  }
  console.log(filteredProducts);

  // Sort products based on selected option
  const sortProducts = (option: string, products: ProductDetails[]) => {
    let sortedProducts = [...products];
    switch (option) {
      case "Price: Low to High":
        sortedProducts.sort((a, b) => {
          const priceA = a.discount
            ? a.listPrice - (a.listPrice * a.discount) / 100
            : a.listPrice;
          const priceB = b.discount
            ? b.listPrice - (b.listPrice * b.discount) / 100
            : b.listPrice;
          return priceA - priceB;
        });
        break;
      case "Price: High to Low":
        sortedProducts.sort((a, b) => {
          const priceA = a.discount
            ? a.listPrice - (a.listPrice * a.discount) / 100
            : a.listPrice;
          const priceB = b.discount
            ? b.listPrice - (b.listPrice * b.discount) / 100
            : b.listPrice;
          return priceB - priceA;
        });
        break;
      case "Avg. Customer Review":
        sortedProducts.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case "Newest Arrivals":
        sortedProducts.sort(
          (a, b) =>
            new Date(b.dateFirstAvailable).getTime() -
            new Date(a.dateFirstAvailable).getTime()
        );
        break;
      case "Best Sellers":
        sortedProducts.sort(
          (a, b) => b.monthlySalesCount - a.monthlySalesCount
        );
        break;
      case "Featured":
      default:
        // "Featured" should show products in their original order
        sortedProducts = [...products];
        break;
    }
    return sortedProducts;
  };

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const sorted = sortProducts(state.sortOrder, filteredProducts);

      // Only update sortedProducts if there's an actual change
      setSortedProducts((prevProducts) => {
        if (JSON.stringify(prevProducts) !== JSON.stringify(sorted)) {
          return sorted;
        }
        return prevProducts; // Avoid unnecessary state updates
      });
    } else {
      setSortedProducts(filteredProducts);
    }
  }, [state.sortOrder, filteredProducts]);

  // Callback to update sorted products from DropdownButton
  const handleSort = (option: string) => {
    dispatch({ type: "SET_SORT_OPTION", payload: option, id: id });
  };

  return (
    <>
      <div className="flex justify-between items-center h-[6.5vh] bg-white text-clamp13 border-b-[1px] border-b-gray-300 drop-shadow">
        {/* Section displaying search results count */}
        <p className="ml-[1%]">
          1-16 of over 20,000 results for{" "}
          <span className="font-bold text-amber-700">"{id}"</span>
        </p>
        {/* Dropdown button for sorting options */}
        <DropdownButton onSort={handleSort} id={id} />
      </div>
      <div className="flex gap-[1.75%] bg-white pt-[1.5%]">
        <div className=" w-[20%] bg-white ml-[1%]">
          {matchedCategory ? (
            <Sidebar
              id={id}
              sidebarData={matchedCategory.sidebarData} // Pass the relevant sidebar data for the category
              isStarInteractive={true} // Enable interactive star ratings
            />
          ) : (
            <div>Error: Sidebar data is missing or invalid.</div>
          )}
        </div>
        {/* Product listing results section */}
        <div className="bg-white w-[80%]">
          {matchedCategory ? (
            <ProductListingResults
              allProducts={
                sortedProducts.length > 0 ? sortedProducts : filteredProducts
              } // Display the product list
              matchedCategory={matchedCategory.product}
              isStarInteractive={false} // Disable interactive star ratings and use component for UI only
              id={id}
            />
          ) : (
            <div>Error: Products results are missing or invalid</div>
          )}
        </div>
      </div>
    </>
  );
}
export default ProductListing;
