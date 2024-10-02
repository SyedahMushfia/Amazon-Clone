import ProductCard from "./ProductCard";
import { ProductDetails, Data } from "../../../../interfaces";

interface ProductListProps {
  allProducts: ProductDetails[]; // Array of product details to display
  matchedCategory: Data | undefined; // Data of the matched product category
  isStarInteractive: boolean;
  id: string;
}

function ProductListingResults(props: ProductListProps) {
  return (
    <>
      <div className="font-sans">
        <div>
          <h2 className="text-clamp5 font-bold">Results</h2>
          <p className="text-clamp13 text-gray-700 -mt-[0.25%] mb-[0.5%]">
            Check each product page for other buying options.
          </p>
        </div>
        <div>
          <ProductCard
            allProducts={props.allProducts} // Pass the filtered or full list of products to the ProductCard component
            matchedCategory={props.matchedCategory}
            isStarInteractive={false}
            id={props.id}
          />
        </div>
      </div>
    </>
  );
}

export default ProductListingResults;
