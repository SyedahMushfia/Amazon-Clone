import { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Data, ProductDetails } from "../../../interfaces";
import { getFromLocalStorage, saveToLocalStorage } from "../../../utils";

interface DropdownButtonProps {
  products: ProductDetails[];
  onSort: (sortedProducts: ProductDetails[]) => void;
  id: string;
}

// Array of options for the sortby dropdown button
const options = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Avg. Customer Review",
  "Newest Arrivals",
  "Best Sellers",
];

function DropdownButton(props: DropdownButtonProps) {
  // State to check whether the dropdown button is open/closed.
  const [isOpen, setIsOpen] = useState(false);

  // Store the selected sorting option, default to "Featured"
  const [selectedOption, setSelectedOption] = useState<string>("Featured");

  // Retrieve the last selected sorting option from localStorage
  useEffect(() => {
    const savedOption = localStorage.getItem(`selectedOption-${props.id}`);
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, []);

  // Reference to the button element
  const dropdownButtonRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    // To toggle the dropdown state
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Close the dropdown button if the click is outside the button element
    if (
      dropdownButtonRef.current &&
      !dropdownButtonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // To add event listener for outside clicks when the dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Sort products based on selected option
  const sortProducts = (option: string) => {
    let sortedProducts = [...props.products];
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
        sortedProducts = [...props.products];
        break;
    }
    saveToLocalStorage(`sortedProducts-${props.id}`, sortedProducts);
    // Pass sorted products back to parent component
    props.onSort(sortedProducts);
  };

  // Handle option selection and sort products
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    toggleDropdown(); // Close dropdown after selecting
    sortProducts(option); // Apply sorting

    localStorage.setItem(`selectedOption-${props.id}`, option);
  };

  return (
    <div ref={dropdownButtonRef}>
      {/* Render the button when dropdown is closed */}
      {!isOpen && (
        <button
          onClick={toggleDropdown}
          className="text-clamp14  rounded-[7px] hover:bg-gray-200 focus:ring-2 focus:ring-cyan-300 active:ring-cyan-300 mb-[2%] -ml-[8%] pl-[4%] bg-gray-100 drop-shadow border-[1px] border-gray-300"
        >
          Sort by: <span className="">{selectedOption}</span>
          <KeyboardArrowDownIcon
            className="text-gray-600"
            style={{
              fontSize: "20px",
            }}
          />
        </button>
      )}

      {/* Render the dropdown menu when the dropdown is open */}
      {isOpen && (
        <div className="w-[13.5vw] h-[27.85vh] py-[4%] bg-white border-[1px] border-gray-400 rounded-[8px] drop-shadow mt-[88%] -ml-[8%]">
          {options.map((item, index) => {
            return (
              <ul key={index}>
                <li
                  onClick={() => handleOptionClick(item)}
                  className={`h-[4.25vh] px-[8.5%] text-clamp13 ${
                    index === 0
                      ? "bg-emerald-50 border-[1px] border-cyan-800"
                      : "bg-white"
                  } hover:cursor-pointer hover:bg-gray-200 hover:border-[1px] hover: border-gray-400 active:bg-emerald-50 active:border-[3px] active:border-cyan-800`}
                >
                  {item}
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
