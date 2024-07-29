import ProductCard from "./ProductCard";

interface ProductListProps {
  id: string | undefined;
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
          <ProductCard id={props.id} />
        </div>
      </div>
    </>
  );
}

export default ProductListingResults;
