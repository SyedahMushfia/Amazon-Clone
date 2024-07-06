import { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Array of options for the sortby dropdown button
const options = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Avg. Customer Review",
  "Newest Arrivals",
  "Best Sellers",
];

function DropdownButton() {
  // State to check whether the dropdown button is open/closed.
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div ref={dropdownButtonRef}>
      {/* Render the button when dropdown is closed */}
      {!isOpen && (
        <button
          onClick={toggleDropdown}
          className="text-clamp14 w-[8.5vw]  rounded-[7px] hover:bg-gray-200 focus:ring-2 focus:ring-cyan-200 mb-[2%] -ml-[8%] pl-[4%] bg-gray-100 drop-shadow border-[1px] border-gray-300"
        >
          Sort by: <span className="">Featured</span>
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
        <div className="w-[13.25vw] h-[27.85vh] py-[4%] bg-white border-[1px] border-gray-400 rounded-[8px] drop-shadow mt-[88%] -ml-[8%]">
          {options.map((item, index) => {
            return (
              <ul key={index}>
                <li
                  className={`h-[4.25vh] px-[8.5%] text-clamp13 ${
                    index === 0
                      ? "bg-emerald-50 border-[1px] border-cyan-800"
                      : "bg-white"
                  } hover:cursor-pointer hover:bg-gray-200 hover:border-[1px] hover: border-gray-400 active:bg-emerald-50 active:border-[1px] active:border-cyan-800`}
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
