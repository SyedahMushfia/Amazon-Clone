import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
} from "../../../../utils";

interface BrandsFilterProps {
  id: string;
  brands: string[]; // Array of available brand names
  onBrandFilterChange: (selectedBrands: string[]) => void; // Callback function to handle changes in selected brands
}

function BrandsFilter(props: BrandsFilterProps) {
  // State to control the visibility of "see more" or "see less" toggle for the brand list
  const [seeMoreBrands, setIsSeeMoreBrands] = useState(true);

  // State to keep track of the selected brands for filtering
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    return getFromLocalStorage(`selectedBrands-${props.id}`) || [];
  });

  // const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  console.log(`Recieved ${selectedBrands} from localStorage`);

  // Handle changes when a checkbox is checked or unchecked
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the checkbox is checked, add the brand to the selectedBrands array
    // Otherwise, remove it from the array
    const updatedSelectedBrands = e.target.checked
      ? [...selectedBrands, e.target.value]
      : selectedBrands.filter((item) => item !== e.target.value);

    // Update local selectedBrands state
    setSelectedBrands(updatedSelectedBrands);
    saveToLocalStorage(
      `updatedSelectedBrands-${props.id}`,
      updatedSelectedBrands
    );
    console.log(`Saved ${updatedSelectedBrands} to localStorage`);
    // Pass updated selected brands to the sidebar's handleBrandFilterChange function as an argument
    props.onBrandFilterChange(updatedSelectedBrands);
  };

  return (
    <div>
      <div>
        {/* Show "Clear" button only if there are selected brands, which allows clearing all selected filters */}
        {selectedBrands.length > 0 && (
          <div className="flex items-center -ml-[1.5%]">
            <KeyboardArrowLeftIcon />
            <p
              onClick={() => {
                setSelectedBrands([]); // Clear local selected brands state
                props.onBrandFilterChange([]); // Notify parent component to clear selected filters
                removeFromLocalStorage(`updatedSelectedBrands-${props.id}`);
              }}
              className="text-clamp10 cursor-pointer -ml-[2%] mt-[0.5%]"
            >
              Clear
            </p>
          </div>
        )}
      </div>
      {/* If there are more than 7 brands, initially show only the first 7 */}
      {props.brands.length > 7 && seeMoreBrands ? (
        <ul className="text-clamp10 -ml-[1.5%] leading-5">
          {props.brands.slice(0, 7).map((item, index) => (
            <li
              key={`Sliced-array-${item}-${index}`}
              className="flex items-center"
            >
              <input
                type="checkbox"
                id={props.brands[index]}
                name={props.brands[index]}
                value={props.brands[index]}
                className="w-[10%] h-4 cursor-pointer"
                onChange={handleOnChange} // Handle checkbox state change
                checked={selectedBrands.includes(props.brands[index])} // Keep checkbox checked if brand is selected
              />
              <label htmlFor={props.brands[index]} className="cursor-pointer">
                {props.brands[index]}
              </label>
            </li>
          ))}
          {/* Show "See more" button with an icon when there are more brands */}
          <div className="flex items-center mb-[5%]">
            <KeyboardArrowDownIcon
              style={{
                fontSize: "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
              }}
            />
            <p
              onClick={() => {
                setIsSeeMoreBrands(!seeMoreBrands);
              }}
              className="text-cyan-700 hover:cursor-pointer hover:text-amber-500"
            >
              See more
            </p>
          </div>
        </ul>
      ) : (
        <ul className="text-clamp10 -ml-[1.5%] leading-5">
          {/* If "see more" is clicked or if there are fewer than 7 brands, display the full list */}
          {props.brands.map((item, index) => (
            <li
              key={`Full-array-${item}-${index}`}
              className="flex items-center"
            >
              <input
                type="checkbox"
                id={props.brands[index]}
                name={props.brands[index]}
                value={props.brands[index]}
                className="w-[10%] h-4 cursor-pointer"
                onChange={handleOnChange}
                checked={selectedBrands.includes(props.brands[index])}
              />
              <label htmlFor={props.brands[index]} className="cursor-pointer">
                {props.brands[index]}
              </label>
            </li>
          ))}
          {/* Show "See less" button when the full list of brands is displayed */}
          <div className="flex items-center mb-[5%]">
            <KeyboardArrowUpIcon
              style={{
                fontSize: "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
              }}
            />
            <p
              onClick={() => {
                setIsSeeMoreBrands(!seeMoreBrands);
              }}
              className="text-cyan-700 hover:cursor-pointer hover:text-amber-500"
            >
              See less
            </p>
          </div>
        </ul>
      )}
    </div>
  );
}

export default BrandsFilter;
