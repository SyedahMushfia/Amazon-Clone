import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

function NavigationOne() {
  const { state } = useStateContext();

  return (
    <>
      <div className="bg-gray-900 h-[4.5vw] flex content-center justify-evenly w-full">
        <div className="w-[11%] flex flex-[1_1_11%] justify-evenly min-w-0 items-center ">
          {/* logo */}

          <div className="w-[40%] pl-[1%] ml-[3%] pt-[2%] min-w-[40%]">
            <Link to="/">
              <img src="/images/Amazon-logo.png" alt="amazon-logo" />
            </Link>
          </div>

          {/* location */}
          <div className=" flex font-sans items-center w-[43%] min-w-[43%] ml-[5%]">
            <div className="w-[19%] min-w-[22%] mt-[9%] -mr-[1%]">
              <img src="/images/location-icon.png" alt="location-icon" />
            </div>
            <div>
              <span className="mt-[2%] text-clamp1 block  text-zinc-300 font-medium tracking-wide">
                Deliver to
              </span>
              <span className="-mt-[10%] text-clamp2 block font-bold text-white">
                Sri Lanka
              </span>
            </div>
          </div>
        </div>
        <div className="w-[40%] flex items-center flex-[1_1_40%] bg-gray-900 min-w-0">
          {/* SearchBar */}
          <div className="flex items-center w-[8%] h-[68%] px-[1%] bg-gray-200 rounded-l-[12%] border-r-gray-400/50 border-r ">
            <p className="font-sans text-clamp2  pl-[5%] text-gray-600">All</p>
            <ArrowDropDownIcon
              className="text-gray-600 ml-[15%]"
              style={{
                fontSize: "clamp(0.4375rem, 0.1734rem + 1.1268vi, 1.1875rem)",
              }}
            />
          </div>
          <label htmlFor="searchBox" className="sr-only">
            Search Amazon
          </label>
          <input
            type="text"
            placeholder="Search Amazon"
            id="searchBox"
            name="searchBox"
            className="w-full pl-[2%] h-[68%] text-clamp2"
          />
          <div className="bg-orange-300 w-[7.5%] h-[68%] rounded-r-[12%] flex items-center">
            <SearchIcon
              className="ml-[15%]"
              style={{
                fontSize: "clamp(0.625rem, 0.1408rem + 2.0657vi, 2rem)",
              }}
            />
          </div>
        </div>

        <div className="flex justify-evenly w-[22%] flex-[1_1_22%]  items-center">
          {/* language */}
          <div className="flex w-[16%] ml-[5%] mt-[3%]">
            <div className="w-[30%] h-[6%] mt-[10%]">
              <img
                src="/images/flag-icon.png"
                alt="flag-icon"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-sans font-bold text-clamp4 ml-[5%] mt-[5%]">
              EN
            </span>
            <ArrowDropDownIcon
              className="text-zinc-400 -ml-[5%] mt-[5%]"
              style={{
                fontSize: "clamp(0.375rem, 0.0009rem + 1.5962vi, 1.4375rem)",
              }}
            />
          </div>
          {/* account & lists */}
          <div className="w-[32%] h-[65%] ">
            <span className="font-sans text-clamp3 text-white tracking-wide block mt-[2%]">
              Hello, sign in
            </span>
            <div className="flex -mt-[3%]">
              <span className="font-sans text-clamp4 font-bold text-white block ">
                Account & Lists
              </span>
              <ArrowDropDownIcon
                className="text-zinc-400"
                style={{
                  fontSize: "clamp(0.375rem, 0.0009rem + 1.5962vi, 1.4375rem)",
                }}
              />
            </div>
          </div>
          {/* returns & orders */}
          <div className="w-[20%] h-[65%] ml-[2%]">
            <span className="block font-sans text-clamp3 text-white tracking-wide mt-[2%]">
              Returns
            </span>

            <span className="block font-sans text-clamp4 font-bold text-white tracking-wide -mt-[3%]">
              & Orders
            </span>
          </div>
          {/* cart */}
          <Link to="/checkout">
            <div className="flex w-[90%] py-[5%] justify-center items-center">
              {/* Display the total quantity of items in the cart */}
              <span className="text-orange-400 font-sans font-bold text-clamp4 -mr-[30%] -mt-[15%]">
                {state.cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>

              <img
                src="/images/cart-icon.png"
                alt="cart-icon"
                className="w-[43%]"
              />

              <span className="text-white font-sans font-bold text-clamp2 mt-[15%]">
                Cart
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavigationOne;
