import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StarRating from "../../StarRating";
import PriceRangeSlider from "./PriceRangeSlider";
import BrandsFilter from "./BrandsFilter";
import { SidebarData } from "../../../../interfaces";

interface SidebarProps {
  id: string;
  sidebarData: SidebarData | undefined;

  isStarInteractive: boolean;
}

function Sidebar(props: SidebarProps) {
  // State for toggling 'Read more' and 'Read less' for different categories.
  const [seeMorePopular, setIsSeeMorePopular] = useState(true);
  const [seeMoreSeller, setIsSeeMoreSeller] = useState(true);

  return (
    <>
      <div>
        {/* Check if the sidebar data is available */}
        {props.sidebarData?.id ? (
          <div>
            {props.sidebarData.data.map((category, index) => {
              return (
                <div key={`${props.sidebarData?.id}-${index}`}>
                  <ul>
                    {Object.entries(category).map(([key, values]) => {
                      switch (key) {
                        case "Popular Shopping Ideas":
                          return (
                            <div
                              key={`section-${key}-${props.sidebarData?.id}`}
                            >
                              <h3 className="font-bold text-clamp12 tracking-wide mb-[2%]">
                                {key}
                              </h3>
                              {/* Show partial list and 'Read more' if more than 4 items */}

                              {Array.isArray(values) && values.length > 4 ? (
                                seeMorePopular ? (
                                  <ul className="text-clamp10 tracking-normal mb-[5%] leading-5">
                                    {values.slice(0, 4).map((item, index) => (
                                      <li
                                        key={`popular-${item}-${index}-${key}`}
                                      >
                                        {item}
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
                                        onClick={() =>
                                          setIsSeeMorePopular(!seeMorePopular)
                                        }
                                        className="text-cyan-700 hover:cursor-pointer hover:text-amber-500"
                                      >
                                        Read more
                                      </p>
                                    </div>
                                  </ul>
                                ) : (
                                  <ul className="text-clamp10 mb-[5%] leading-5">
                                    {/* Show full list and 'Read less' */}
                                    {values.map((item, index) => (
                                      <li
                                        key={`popular-full-${item}-${index}-${key}`}
                                      >
                                        {item}
                                      </li>
                                    ))}
                                    <div className="flex items-center mb-[5%] -ml-[2%]">
                                      <KeyboardArrowUpIcon
                                        style={{
                                          fontSize:
                                            "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
                                        }}
                                      />
                                      <p
                                        onClick={() =>
                                          setIsSeeMorePopular(!seeMorePopular)
                                        }
                                        className="text-cyan-700 hover:cursor-pointer hover:text-amber-500"
                                      >
                                        Read less
                                      </p>
                                    </div>
                                  </ul>
                                )
                              ) : (
                                <ul className="text-clamp10 mb-[5%] leading-5">
                                  {/* Render all items if less than or equal to 4 */}
                                  {Array.isArray(values) &&
                                    values.map((item, index) => (
                                      <li
                                        key={`popular-default-${item}-${index}-${key}`}
                                      >
                                        {item}
                                      </li>
                                    ))}
                                </ul>
                              )}
                              <div className="border-t-[0.5px] border-gray-300 mb-[4%]">
                                {/* Line Break */}
                              </div>
                            </div>
                          );
                        case "Department":
                          return (
                            <div key={key}>
                              <h3 className="font-bold text-clamp12 tracking-wide mb-[2%]">
                                {key}
                              </h3>
                              <ul className="text-clamp10 mb-[5%] leading-5">
                                {Array.isArray(values) &&
                                  values.map((item, index) => (
                                    <li key={`${item}-${index}`}>{item}</li>
                                  ))}
                              </ul>
                            </div>
                          );
                        case "Customer Review":
                          return (
                            <div key={key}>
                              <h3 className="font-bold text-clamp12 tracking-wide mb-[2%]">
                                {key}
                              </h3>

                              <div className="-ml-[1%]">
                                {typeof values === "number" && (
                                  <StarRating
                                    rating={values}
                                    isStarInteractive={true}
                                    fontSize="clamp(0.75rem, 0.5079rem + 1.0329vw, 1.4375rem)"
                                    id={props.id}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        case "Brands":
                          return (
                            <div key={key}>
                              <h3 className="font-bold text-clamp12 tracking-wide mb-[2%]">
                                {key}
                              </h3>

                              {Array.isArray(values) && (
                                <BrandsFilter id={props.id} brands={values} />
                              )}
                            </div>
                          );
                        case "Price":
                          return (
                            <div key={key}>
                              <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                                {key}
                              </h3>
                              <div className="mb-[5%]">
                                {Array.isArray(values) && (
                                  <PriceRangeSlider
                                    id={props.id}
                                    min={values[0]}
                                    max={values[1]}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        case "Deals & Discounts":
                          return (
                            <div key={key}>
                              <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                                {key}
                              </h3>
                              <ul className="text-clamp10 leading-5 mb-[4%]">
                                {Array.isArray(values) &&
                                  values.map((item, index) => (
                                    <li key={`${item}-${index}`}>{item}</li>
                                  ))}
                              </ul>
                            </div>
                          );
                        case "Condition":
                          return (
                            <div key={key}>
                              <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                                {key}
                              </h3>
                              <ul className="text-clamp10 -ml-[1.5%] leading-5 mb-[4%]">
                                {Array.isArray(values) &&
                                  values.map((item, index) => (
                                    <li
                                      key={`${item}-${index}`}
                                      className="flex items-center"
                                    >
                                      <input
                                        type="checkbox"
                                        id={item}
                                        name={item}
                                        className="w-[10%] h-4"
                                      />
                                      <label htmlFor={item}>{item}</label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          );
                        case "New Releases":
                          return (
                            <div key={key}>
                              <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                                {key}
                              </h3>
                              <ul className="text-clamp10 leading-5 mb-[4%]">
                                {Array.isArray(values) &&
                                  values.map((item, index) => (
                                    <li key={`${item}-${index}`}>{item}</li>
                                  ))}
                              </ul>
                            </div>
                          );
                        case "Seller":
                          return (
                            <div key={key}>
                              <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                                {key}
                              </h3>
                              {Array.isArray(values) &&
                              values.length > 2 &&
                              seeMoreSeller ? (
                                <ul className="text-clamp10 -ml-[1.5%] leading-5">
                                  {values.slice(0, 2).map((item, index) => (
                                    <li
                                      key={`Sliced-array-${item}-${index}`}
                                      className="flex items-center"
                                    >
                                      <input
                                        type="checkbox"
                                        id={item}
                                        name={item}
                                        className="w-[10%] h-4"
                                      />
                                      <label htmlFor={item}>{item}</label>
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
                                <ul className="text-clamp10 -ml-[1.5%] leading-5">
                                  {Array.isArray(values) &&
                                    values.map((item, index) => (
                                      <li
                                        key={`Full-array-${item}-${index}`}
                                        className="flex items-center"
                                      >
                                        <input
                                          type="checkbox"
                                          id={item}
                                          name={item}
                                          className="w-[10%] h-4"
                                        />
                                        <label htmlFor={item}>{item}</label>
                                      </li>
                                    ))}
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
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
