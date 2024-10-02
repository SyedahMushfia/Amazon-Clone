import { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Data, ProductDetails } from "../../../interfaces";
import { useFilterContext } from "../../../context/FilterContext";

interface DropdownButtonProps {
  onSort: (sortedProducts: string) => void;
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

  const { dispatch } = useFilterContext();

  // Store the selected sorting option, default to "Featured"
  const [selectedOption, setSelectedOption] = useState<string>("Featured");

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

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    toggleDropdown(); // Close dropdown after selecting

    dispatch({ type: "SET_SORT_ORDER", payload: option, id: props.id });
    props.onSort(option);
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
                  }   active:bg-emerald-50 active:border-[3px] active:border-cyan-800`}
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
