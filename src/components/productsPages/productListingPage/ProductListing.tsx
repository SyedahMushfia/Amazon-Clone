import { useParams, Navigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import DropdownButton from "./DropdownButton";
import ProductListingResults from "./results/ProductListingResults";
import { useProductDetails, useSidebarData } from "../useDataFetchingHooks";
import useProductFilters from "./useProductFilters";

function ProductListing() {
  const { id } = useParams<{ id: string }>();
  // Fetch product details
  const { allProducts } = useProductDetails();

  // Fetch sidebar data
  const { sidebarData } = useSidebarData();

  // Get filtered products and handler functions
  const {
    filteredProducts,
    handleBrandFilterChange,
    handlePriceFilterChange,
    handleRatingsChange,
  } = useProductFilters(allProducts, id);

  // Redirect to NotFoundPage if 'id' parameter is missing
  if (!id) {
    return <Navigate to="/notFoundPage" />;
  }

  // Find the matching product and sidebar data based on the 'id' parameter
  const matchedCategory = {
    product: allProducts.find((product) => product.id === id),
    sidebarData: sidebarData.find((sidebar) => sidebar.id === id),
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
        <DropdownButton />
      </div>
      <div className="flex gap-[1.75%] bg-white pt-[1.5%]">
        <div className=" w-[20%] bg-white ml-[1%]">
          {matchedCategory ? (
            <Sidebar
              id={id}
              sidebarData={matchedCategory.sidebarData} // Pass the relevant sidebar data for the category
              onBrandFilterChange={handleBrandFilterChange} // Pass brand filter change handler
              onPriceFilterChange={handlePriceFilterChange} // Pass price filter change handler
              onRatingsFilterChange={handleRatingsChange} // Pass rating filter change handler
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
              allProducts={filteredProducts} // Display the product list
              matchedCategory={matchedCategory.product}
              isStarInteractive={false} // Disable interactive star ratings and use component for UI only
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
