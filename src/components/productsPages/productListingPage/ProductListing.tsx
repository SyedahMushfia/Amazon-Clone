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
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const savedSelectedBrands = localStorage.getItem(`selectedBrands-${id}`);
    return savedSelectedBrands ? JSON.parse(savedSelectedBrands) : [];
  });

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
    if (matchedCategory.product) {
      const savedBrands = localStorage.getItem(`selectedBrands-${id}`);
      const savedProducts = localStorage.getItem(`filteredProducts-${id}`);

      if (savedBrands) {
        const parsedBrands = JSON.parse(savedBrands);
        setSelectedBrands(parsedBrands);
        console.log(`Got ${parsedBrands} after refresh`); // Log the parsed brands
      }

      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        setFilteredProducts(parsedProducts);
        console.log(`Got ${parsedProducts} after refresh`); // Log the parsed products
      } else {
        setFilteredProducts(matchedCategory.product.data); // Set default data
      }
    }
  }, [matchedCategory.product, id]);

  // Function to handle changes in the selected brands from the BrandsFilter component
  const handleBrandFilterChange = (selectedBrands: string[]) => {
    setSelectedBrands(selectedBrands);

    // If there is a matched product category, filter the products based on the selected brands
    if (matchedCategory.product) {
      const filtered =
        selectedBrands.length === 0
          ? matchedCategory.product?.data // If no brands are selected, show all products
          : matchedCategory.product?.data.filter(
              (detail) => selectedBrands.includes(detail.brand) // Filter products that match the selected brands
            );
      setFilteredProducts(filtered); // Update the state with the filtered products
      console.log(`Filtered products ${filteredProducts}`);

      localStorage.setItem(
        `selectedBrands-${id}`,
        JSON.stringify(selectedBrands)
      );
      console.log(
        `Saved ${selectedBrands} to localStorage in ProductListing.tsx`
      );
      localStorage.setItem(`filteredProducts-${id}`, JSON.stringify(filtered));
      console.log(
        `Saved ${filteredProducts} to localStorage in ProductListing.tsx`
      );
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
              id={id}
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
