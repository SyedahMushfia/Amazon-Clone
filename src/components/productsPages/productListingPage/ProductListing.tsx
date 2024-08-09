import { useParams, Navigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import DropdownButton from "./DropdownButton";
import ProductListingResults from "./results/ProductListingResults";

function ProductListing() {
  const { id } = useParams<{ id: string }>();

  // Redirect to NotFoundPage if 'id' parameter is missing
  if (!id) {
    return <Navigate to="/notFoundPage" />;
  }

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
          {id ? (
            <Sidebar id={id} /> // Display Sidebar based on 'id' parameter
          ) : (
            <div>Error: Sidebar data is missing or invalid.</div>
          )}
        </div>
        {/* Product listing results section */}
        {/* <div className="bg-white w-[80%]">
          {id ? (
            <ProductListingResults id={id} />
          ) : (
            <div>Error: Products results are missing or invalid</div>
          )}
        </div> */}
      </div>
    </>
  );
}

export default ProductListing;
