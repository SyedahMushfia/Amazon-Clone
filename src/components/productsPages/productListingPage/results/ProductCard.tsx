import StarRating from "../../StarRating";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RenderColourOptions from "../../RenderColourOptions";
import { Link } from "react-router-dom";
import useFetchCountry from "../../../useFetchCountry";
import {
  calculateDiscountedPrice,
  formatSalesCount,
  calculateDeliveryDate,
} from "../../../../utils";
import FormattedPrice from "../../FormattedPrice";
import { ProductDetails, Data } from "../../../../interfaces";

interface ProductListProps {
  allProducts: ProductDetails[]; // Array of product details to display
  matchedCategory: Data | undefined; // Data of the matched product category
}

function ProductCard(props: ProductListProps) {
  // Fetch user's country
  const { country } = useFetchCountry();

  return (
    <>
      {props.matchedCategory?.id &&
        props.allProducts.map((details, index) => (
          <div
            key={`${details.name}-${index}`}
            className="mr-[1%] mb-[1%] flex border-[1px] border-gray-100 rounded-[6px]"
          >
            <div
              className={`bg-gray-100 w-[25%] rounded-l-[4px] ${
                props.matchedCategory?.id === "Chairs" ? "h-[50vh]" : null
              }`}
            >
              <img
                src={details.imageURLs[0]}
                alt={details.name}
                className={`mix-blend-multiply  ${
                  props.matchedCategory?.id === "Chairs"
                    ? "py-[5%] px-[15%] h-[98%]"
                    : "py-[15%] px-[5%]"
                }`}
                key={details.name}
              />
            </div>
            <div className="bg-white w-[75%] rounded-r-[4px] pl-[1.5%]">
              <Link to="">
                <h1 className="text-clamp17 my-[0.75%] line-clamp-2">
                  {details.name}
                </h1>
              </Link>
              <div className="flex items-center -mt-[0.75%]">
                <StarRating
                  rating={details.rating}
                  fontSize="clamp(0.5625rem, 0.2984rem + 1.1268vi, 1.3125rem)"
                />
                <KeyboardArrowDownIcon
                  style={{
                    fontSize: "clamp(0.375rem, 0.1109rem + 1.1268vi, 1.125rem)",
                  }}
                  className="-ml-[1.75%] text-gray-400"
                />
                <p className="text-clamp11 text-cyan-800 font-sans">
                  {details.reviewsCount.toLocaleString()}
                </p>
              </div>
              <p className="text-clamp13 text-gray-700 mb-[1%]">{`${formatSalesCount(
                details.monthlySalesCount
              )} bought in past month`}</p>
              <div className="flex items-baseline">
                <p>
                  {/* Conditional Rendering of Discounted Price */}
                  {details.discount ? (
                    <>
                      <sup>
                        <span className="text-clamp10 align-super">$</span>
                      </sup>
                      <FormattedPrice
                        price={calculateDiscountedPrice(
                          details.listPrice,
                          details.discount
                        )}
                      />
                    </>
                  ) : (
                    <>
                      <sup>
                        <span className="text-clamp10 align-super">$</span>
                      </sup>
                      <FormattedPrice price={details.listPrice} />
                    </>
                  )}
                </p>
                {/* Display List Price if Discounted */}
                {details.discount ? (
                  <p className=" text-clamp13 text-gray-700 ml-[1%]">
                    List:
                    <span className="line-through ml-[5%]">
                      ${details.listPrice}
                    </span>
                  </p>
                ) : null}
              </div>
              <p className="mt-[1%] text-clamp13">
                Delivery{"  "}
                <span className="font-bold tracking-wide">
                  {calculateDeliveryDate()}
                </span>
              </p>
              <p className="text-clamp1 mt-[0.5%]">Ships to {country}</p>
              <button className="bg-yellow-400 px-[1.75%] py-[0.5%] mt-[1%] mb-[1%] rounded-[25px] text-clamp10">
                Add to cart
              </button>
              {details.Color ? (
                <RenderColourOptions colors={details.Color} />
              ) : null}
            </div>
          </div>
        ))}
    </>
  );
}

export default ProductCard;
