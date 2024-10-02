import { useStateContext } from "../../context/StateContext";
import { formatSalesCount } from "../../utils";
import { GetColorName } from "hex-color-to-color-name";

const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

function SavedItems() {
  const { state, dispatch } = useStateContext();

  return (
    <>
      <div className="px-[2.25%] py-[1.5%]">
        <h1 className="text-clamp18 font-bold">
          {state.savedItems.length === 1
            ? `Saved for later (${state.savedItems.length} item)`
            : `Saved for later (${state.savedItems.length} items)`}
        </h1>
        <div className="border-slate-300 border-t-[0.5px] mb-[2%]">
          {/*Line Break */}
        </div>
      </div>
      <div className="flex justify-start gap-4 pl-[2.25%] font-sans pb-[5%]">
        {state.savedItems.map((product) => (
          <div className=" w-[27%] px-[1.5%] py-[1.5%] border-[1px]">
            <div className="w-[16.5vw] h-[34vh]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain object-center"
              />
            </div>
            <h2 className="line-clamp-2 text-clamp17 leading-6">
              {product.name}
            </h2>
            <p className="text-clamp17 font-bold mb-[8%]">
              {formatCurrency(product.price)}
            </p>
            <p className="text-clamp6">{`${formatSalesCount(
              product.monthlySalesCount
            )} bought in past month`}</p>
            <p className="text-clamp6 text-green-600">In Stock</p>
            {product.color && (
              <p className="text-clamp6">
                <span>Color: </span>
                {GetColorName(product.color)}
              </p>
            )}
            {product.Style && (
              <p className="text-clamp6">
                <span className="font-bold">Style: </span>
                {product.Style}
              </p>
            )}
            {/* Button to move item to cart */}
            <button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART", // Add product to cart
                  payload: product,
                });

                dispatch({
                  type: "REMOVE_FROM_SAVED", // Remove product from saved items
                  payload: { name: product.name },
                });
              }}
              className="hover: cursor-pointer border-[1px] border-slate-400 rounded-[1rem] px-[33%] py-[2.5%] mt-[4%] text-clamp3"
            >
              Move to cart
            </button>
            <p
              className="text-clamp6 text-cyan-800 my-[5%] hover: cursor-pointer"
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_SAVED",
                  payload: { name: product.name },
                });
              }}
            >
              Delete
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default SavedItems;
