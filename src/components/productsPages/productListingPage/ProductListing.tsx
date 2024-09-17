import { useParams, Navigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import DropdownButton from "./DropdownButton";
import ProductListingResults from "./results/ProductListingResults";
import { useProductDetails, useSidebarData } from "../dataFetchingHooks";
import { useEffect, useState } from "react";
import { Data, ProductDetails } from "../../../interfaces";

function ProductListing() {
  const { id } = useParams<{ id: string }>();
  // Fetch product details
  const { productDetails, allProducts } = useProductDetails();

  // Fetch sidebar data
  const { sidebarData } = useSidebarData();

  // State to manage the list of filtered products based on selected brands
  const [filteredProducts, setFilteredProducts] = useState<ProductDetails[]>(
    []
  );

  // State to manage the selected brands from the BrandsFilter component
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    JSON.parse(localStorage.getItem("selectedBrands") || "[]")
  );

  // Redirect to NotFoundPage if 'id' parameter is missing
  if (!id) {
    return <Navigate to="/notFoundPage" />;
  }

  // Find the matching product and sidebar data based on the 'id' parameter
  const matchedCategory = {
    product: allProducts.find((product) => product.id === id),
    sidebarData: sidebarData.find((sidebar) => sidebar.id === id),
  };

  useEffect(() => {
    const savedFilteredProducts = JSON.parse(
      localStorage.getItem("filteredProducts") || "[]"
    );
    if (savedFilteredProducts.length > 0) {
      setFilteredProducts(savedFilteredProducts);
    } else if (matchedCategory.product) {
      // Initially, all products are displayed before any filters are applied
      setFilteredProducts(matchedCategory.product.data);
    }
  }, [matchedCategory.product]);

  // Function to handle changes in the selected brands from the BrandsFilter component
  const handleBrandFilterChange = (selectedBrands: string[]) => {
    setSelectedBrands(selectedBrands);
    localStorage.setItem("selectedBrands", JSON.stringify(selectedBrands));

    // If there is a matched product category, filter the products based on the selected brands
    if (matchedCategory.product) {
      const filtered =
        selectedBrands.length === 0
          ? matchedCategory.product?.data // If no brands are selected, show all products
          : matchedCategory.product?.data.filter(
              (detail) => selectedBrands.includes(detail.brand) // Filter products that match the selected brands
            );
      setFilteredProducts(filtered); // Update the state with the filtered products
      localStorage.setItem("filteredProducts", JSON.stringify(filtered));
    }
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
              sidebarData={matchedCategory.sidebarData} // Pass the relevant sidebar data for the category
              onBrandFilterChange={handleBrandFilterChange} // Handle brand filter changes from the Sidebar
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
