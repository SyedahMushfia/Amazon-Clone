import { db } from "../../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StarRating from "../../StarRating";
import PriceRangeSlider from "./PriceRangeSlider";

interface IdProp {
  id: string | undefined;
}

// Interface for sidebar data structure
interface SidebarDataDetails {
  [key: string]: string[];
}

// Interface for sidebar collection containing id and data
interface SidebarData {
  id: string;
  data: SidebarDataDetails[];
}

function Sidebar(props: IdProp) {
  // State for toggling 'Read more' and 'Read less' for different categories.
  const [seeMorePopular, setIsSeeMorePopular] = useState(true);
  const [seeMoreBrands, setIsSeeMoreBrands] = useState(true);
  const [seeMoreSeller, setIsSeeMoreSeller] = useState(true);

  // State for storing fetched sidebar data
  const [sidebarData, setSidebarData] = useState<SidebarData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference to the "products" collection in Firestore
        const productsRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsRef);
        const allSidebarData: SidebarData[] = [];

        // Loop through each product category and fetch its "sidebardata"
        for (const productDoc of productsSnapshot.docs) {
          const category = productDoc.id;
          const sidebardataRef = collection(
            db,
            "products",
            category,
            "sidebardata"
          );
          const sidebardataSnapshot = await getDocs(sidebardataRef);

          // Map through each doc in "sidebardata" and extract data
          const data: SidebarDataDetails[] = sidebardataSnapshot.docs.map(
            (doc) => {
              return doc.data() as SidebarDataDetails;
              // return {
              //   id: doc.id,
              //   items: docData.items || [], // Ensure items is an array, even if it's missing
              // };
            }
          );

          // Push the data to sidebar data array
          allSidebarData.push({ id: category, data });
        }

        // Set the state with fetched sidebar data
        setSidebarData(allSidebarData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Fetch the sidebar data on component mount
    fetchData();
  }, []);

  return (
    <>
      <div>
        {/* Loop through sidebar data and render category if it matches the url param */}
        {sidebarData.map((category) => {
          if (category.id === props.id) {
            return (
              <div key={category.id}>
                <ul>
                  {category.data.map((doc, index) => (
                    <li key={`${category.id}-${index}`} className="font-sans">
                      {Object.entries(doc).map(([key, values]) => {
                        switch (key) {
                          case "Popular Shopping Ideas":
                            return (
                              <div key={`section-${key}-${category.id}`}>
                                <h3 className="font-bold text-clamp12 tracking-wide mb-[2%]">
                                  {key}
                                </h3>
                                {/* Show partial list and 'Read more' if more than 4 items */}

                                {values.length > 4 ? (
                                  seeMorePopular ? (
                                    <ul className="text-clamp10 tracking-normal mb-[5%] leading-5">
                                      {values.slice(0, 4).map((item, index) => (
                                        <li key={`popular-${item}-${index}`}>
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
                                          key={`popular-full-${item}-${index}`}
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
                                    {values.map((item, index) => (
                                      <li
                                        key={`popular-default-${item}-${index}`}
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
                                  {values.map((item, index) => (
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
                                <div className="flex items-center mb-[5%]">
                                  <div className="-mt-[2%] -ml-[1%]">
                                    <StarRating
                                      rating={values}
                                      fontSize="clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)"
                                    />
                                  </div>
                                  <span className="text-clamp3 hover:cursor-pointer hover:text-amber-500 -ml-[6%] -mt-[2%]">
                                    & Up
                                  </span>
                                </div>
                              </div>
                            );
                          case "Brands":
                            return (
                              <div key={key}>
                                <h3 className="font-bold text-clamp12 tracking-wide mb-[2%]">
                                  {key}
                                </h3>
                                {values.length > 7 && seeMoreBrands ? (
                                  <ul className="text-clamp10 -ml-[1.5%] leading-5">
                                    {values.slice(0, 7).map((item, index) => (
                                      <li
                                        key={`Sliced-array-${item}-${index}`}
                                        className="flex items-center"
                                      >
                                        <input
                                          type="checkbox"
                                          id={values[index]}
                                          name={values[index]}
                                          className="w-[10%] h-4"
                                        />
                                        <label htmlFor={values[index]}>
                                          {values[index]}
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
                                  <ul className="text-clamp10 -ml-[1.5%] leading-5">
                                    {values.map((item, index) => (
                                      <li
                                        key={`Full-array-${item}-${index}`}
                                        className="flex items-center"
                                      >
                                        <input
                                          type="checkbox"
                                          id={values[index]}
                                          name={values[index]}
                                          className="w-[10%] h-4"
                                        />
                                        <label htmlFor={values[index]}>
                                          {values[index]}
                                        </label>
                                      </li>
                                    ))}
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
                              <div key={key}>
                                <h3 className="font-bold text-clamp12 tracking-wide mb-[1%]">
                                  {key}
                                </h3>
                                <div className="mb-[5%]">
                                  <PriceRangeSlider
                                    min={values[0]}
                                    max={values[1]}
                                  />
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
                                  {values.map((item, index) => (
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
                                  {values.map((item, index) => (
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
                                  {values.map((item, index) => (
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
                                {values.length > 2 && seeMoreSeller ? (
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
                                    {values.map((item, index) => (
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
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default Sidebar;
