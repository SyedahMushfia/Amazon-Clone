import { sidebarData } from "./sidebarData";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StarRating from "./StarRating";
import PriceRangeSlider from "./PriceRangeSlider";

interface SidebarProps {
  id: string | undefined;
}

function Sidebar(props: SidebarProps) {
  // State for toggling 'Read more' and 'Read less' for different categories.
  const [seeMorePopular, setIsSeeMorePopular] = useState(true);
  const [seeMoreBrands, setIsSeeMoreBrands] = useState(true);
  const [seeMoreSeller, setIsSeeMoreSeller] = useState(true);

  return (
    <>
      {Object.keys(sidebarData).map((categoryKey) => {
        // Check if the current categoryKey matches the passed id prop.
        if (categoryKey === props.id) {
          return (
            <div key={categoryKey} className="font-sans">
              {Object.keys(sidebarData[categoryKey]).map((subCategoryKey) => {
                switch (subCategoryKey) {
                  case "Popular Shopping Ideas":
                    return (
                      <>
                        <div key={subCategoryKey}>
                          <h3 className="font-bold text-clamp12 tracking-wide mb-[2%]">
                            {subCategoryKey}
                          </h3>
                          {/* Conditional rendering for 'Read more' and 'Read less'. */}
                          {sidebarData[categoryKey][subCategoryKey].length >
                          4 ? (
                            seeMorePopular ? (
                              <ul className="text-clamp13 tracking-normal mb-[5%] leading-5">
                                {sidebarData[categoryKey][subCategoryKey]
                                  .slice(0, 4) // Display first 4 items if seeMorePopular is true.
                                  .map((subCategoryValues) => (
                                    <li key={subCategoryValues}>
                                      {subCategoryValues}
                                    </li>
                                  ))}
                                <div className="flex items-center mb-[5%] -ml-[2%]">
                                  <KeyboardArrowDownIcon
                                    style={{
                                      fontSize:
                                        "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
                                    }}
                                  />
                                  <p
                                    onClick={() => {
                                      setIsSeeMorePopular(!seeMorePopular);
                                    }}
                                    className="text-cyan-700 hover:cursor-pointer hover:text-amber-500"
                                  >
                                    Read more
                                  </p>
                                </div>
                              </ul>
                            ) : (
                              <ul className="text-clamp13 mb-[5%] leading-5">
                                {/* Display all items if seeMorePopular becomes false. */}
                                {sidebarData[categoryKey][subCategoryKey].map(
                                  (subCategoryValues) => (
                                    <li key={subCategoryValues}>
                                      {subCategoryValues}
                                    </li>
                                  )
                                )}
                                <div className="flex items-center mb-[5%] -ml-[2%]">
                                  <KeyboardArrowUpIcon
                                    style={{
                                      fontSize:
                                        "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
                                    }}
                                  />
                                  <p
                                    onClick={() => {
                                      setIsSeeMorePopular(!seeMorePopular);
                                    }}
                                    className="text-cyan-700 hover:cursor-pointer hover:text-amber-500"
                                  >
                                    Read less
                                  </p>
                                </div>
                              </ul>
                            )
                          ) : (
                            // Display all items if the length is 4 or less.
                            <ul className="text-clamp13 mb-[5%] leading-5">
                              {sidebarData[categoryKey][subCategoryKey].map(
                                (subCategoryValues) => (
                                  <li key={subCategoryValues}>
                                    {subCategoryValues}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                        <div className="border-t-[0.5px] border-gray-300 mb-[4%]">
                          {/*Line Break*/}
                        </div>
                      </>
                    );
                  case "Department":
                    return (
                      <div key={subCategoryKey}>
                        <h3 className="font-bold text-clamp12 tracking-wide mb-[2%]">
                          {subCategoryKey}
                        </h3>
                        <ul className="text-clamp13 mb-[5%] leading-5">
                          {sidebarData[categoryKey][subCategoryKey].map(
                            (subCategoryValues) => (
                              <li key={subCategoryValues}>
                                {subCategoryValues}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    );
                  case "Customer Review":
                    return (
                      <div key={subCategoryKey}>
                        <h3 className="font-bold text-clamp12 tracking-wide mb-[2%]">
                          {subCategoryKey}
                        </h3>
                        <div className="flex items-center mb-[5%]">
                          <div className="-mt-[2%] -ml-[1%]">
                            <StarRating rating={4} />
                          </div>
                          <span className="text-clamp3 hover:cursor-pointer hover:text-amber-500">
                            & Up
                          </span>
                        </div>
                      </div>
                    );
                  case "Brands":
                    return (
                      <div key={subCategoryKey}>
                        <h3 className="font-bold text-clamp12 tracking-wide mb-[2%]">
                          {subCategoryKey}
                        </h3>
                        {sidebarData[categoryKey][subCategoryKey].length > 7 &&
                        seeMoreBrands ? (
                          <ul className="text-clamp13 -ml-[1.5%] leading-5">
                            {sidebarData[categoryKey][subCategoryKey]
                              .slice(0, 7)
                              .map((subCategoryValues) => (
                                <li
                                  key={subCategoryValues}
                                  className="flex items-center"
                                >
                                  <input
                                    type="checkbox"
                                    id={subCategoryValues}
                                    name={subCategoryValues}
                                    className="w-[10%] h-4"
                                  />
                                  <label htmlFor={subCategoryValues}>
                                    {subCategoryValues}
                                  </label>
                                </li>
                              ))}
                            <div className="flex items-center mb-[5%]">
                              <KeyboardArrowDownIcon
                                style={{
                                  fontSize:
                                    "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
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
                          <ul className="text-clamp13 -ml-[1.5%] leading-5">
                            {sidebarData[categoryKey][subCategoryKey].map(
                              (subCategoryValues) => (
                                <li
                                  key={subCategoryValues}
                                  className="flex items-center"
                                >
                                  <input
                                    type="checkbox"
                                    id={subCategoryValues}
                                    name={subCategoryValues}
                                    className="w-[10%] h-4"
                                  />
                                  <label htmlFor={subCategoryValues}>
                                    {subCategoryValues}
                                  </label>
                                </li>
                              )
                            )}
                            <div className="flex items-center mb-[5%]">
                              <KeyboardArrowUpIcon
                                style={{
                                  fontSize:
                                    "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
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
                  case "Price":
                    return (
                      <div key={subCategoryKey}>
                        <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                          {subCategoryKey}
                        </h3>
                        <div className="mb-[5%]">
                          <PriceRangeSlider />
                        </div>
                      </div>
                    );
                  case "Deals & Discounts":
                    return (
                      <div key={subCategoryKey}>
                        <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                          {subCategoryKey}
                        </h3>
                        <ul className="text-clamp13 leading-5 mb-[4%]">
                          {sidebarData[categoryKey][subCategoryKey].map(
                            (subCategoryValues) => (
                              <li key={subCategoryValues}>
                                {subCategoryValues}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    );
                  case "Condition":
                    return (
                      <div key={subCategoryKey}>
                        <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                          {subCategoryKey}
                        </h3>
                        <ul className="text-clamp13 -ml-[1.5%] leading-5 mb-[4%]">
                          {sidebarData[categoryKey][subCategoryKey].map(
                            (subCategoryValues) => (
                              <li
                                key={subCategoryValues}
                                className="flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  id={subCategoryValues}
                                  name={subCategoryValues}
                                  className="w-[10%] h-4"
                                />
                                <label htmlFor={subCategoryValues}>
                                  {subCategoryValues}
                                </label>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    );
                  case "New Releases":
                    return (
                      <div key={subCategoryKey}>
                        <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                          {subCategoryKey}
                        </h3>
                        <ul className="text-clamp13 leading-5 mb-[4%]">
                          {sidebarData[categoryKey][subCategoryKey].map(
                            (subCategoryValues) => (
                              <li key={subCategoryValues}>
                                {subCategoryValues}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    );
                  case "Seller":
                    return (
                      <div key={subCategoryKey}>
                        <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                          {subCategoryKey}
                        </h3>
                        {sidebarData[categoryKey][subCategoryKey].length > 2 &&
                        seeMoreSeller ? (
                          <ul className="text-clamp13 -ml-[1.5%] leading-5">
                            {sidebarData[categoryKey][subCategoryKey]
                              .slice(0, 2)
                              .map((subCategoryValues) => (
                                <li
                                  key={subCategoryValues}
                                  className="flex items-center"
                                >
                                  <input
                                    type="checkbox"
                                    id={subCategoryValues}
                                    name={subCategoryValues}
                                    className="w-[10%] h-4"
                                  />
                                  <label htmlFor={subCategoryValues}>
                                    {subCategoryValues}
                                  </label>
                                </li>
                              ))}
                            <div className="flex items-center">
                              <KeyboardArrowDownIcon
                                style={{
                                  fontSize:
                                    "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
                                }}
                              />
                              <p
                                onClick={() => {
                                  setIsSeeMoreSeller(!seeMoreSeller);
                                }}
                                className="text-cyan-700 hover:cursor-pointer hover:text-amber-500"
                              >
                                See more
                              </p>
                            </div>
                          </ul>
                        ) : (
                          <ul className="text-clamp13 -ml-[1.5%] leading-5">
                            {sidebarData[categoryKey][subCategoryKey].map(
                              (subCategoryValues) => (
                                <li
                                  key={subCategoryValues}
                                  className="flex items-center"
                                >
                                  <input
                                    type="checkbox"
                                    id={subCategoryValues}
                                    name={subCategoryValues}
                                    className="w-[10%] h-4"
                                  />
                                  <label htmlFor={subCategoryValues}>
                                    {subCategoryValues}
                                  </label>
                                </li>
                              )
                            )}
                            <div className="flex items-center">
                              <KeyboardArrowUpIcon
                                style={{
                                  fontSize:
                                    "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
                                }}
                              />
                              <p
                                onClick={() => {
                                  setIsSeeMoreSeller(!seeMoreSeller);
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
              })}
            </div>
          );
        }
        return null; //Return null if categoryKey does not match id prop.
      })}
    </>
  );
}

export default Sidebar;
