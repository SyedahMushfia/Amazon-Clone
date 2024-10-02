import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState, useEffect } from "react";
import { useFilterContext } from "../../context/FilterContext";

interface StarRatingProps {
  rating: number; // The rating value to display
  totalStars?: number; // Optional prop for the total number of stars
  fontSize: string; // The size of the star icons
  isStarInteractive: boolean; // Flag to make stars clickable
  id: string;
}

function StarRating(props: StarRatingProps) {
  const rating = props.rating; // Extract initial rating from props
  const totalStars = 5;
  const stars = [];

  const { state, dispatch } = useFilterContext();

  const [selectedRating, setSelectedRating] = useState<number>(rating);

  const [showClearButton, setShowClearButton] = useState(false); // State to show/hide "Clear" button
  // If stars are interactive, allow click to set selected rating
  if (props.isStarInteractive) {
    const handleClick = (index: number) => {
      setSelectedRating(index);

      dispatch({
        type: "SET_RATING",
        payload: index,
        id: props.id,
      });
      setShowClearButton(true);
    };

    // Generate star icons and add click handlers
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <div key={i} onClick={() => handleClick(i)}>
          {typeof selectedRating === "number" && i <= selectedRating ? (
            <StarIcon
              style={{ fontSize: props.fontSize }}
              className="text-amber-500 hover:cursor-pointer -mr-[3%]"
            />
          ) : (
            <StarBorderIcon
              style={{ fontSize: props.fontSize }}
              className="text-amber-500 hover:cursor-pointer -mr-[3%]"
            />
          )}
        </div>
      );
    }
  }

  // Render stars without interaction for UI purposes
  if (!props.isStarInteractive) {
    // To generate star icons based on rating
    for (let i = 0; i < totalStars; i++) {
      let star: React.ReactElement;

      // Conditionally render full, half, or empty star icons based on the rating value
      if (typeof rating === "number" && rating - i > 0 && rating - i < 1) {
        star = (
          <StarHalfIcon
            key={i}
            style={{ fontSize: props.fontSize }}
            className="text-amber-500 hover:cursor-pointer -mr-[3%]"
          />
        );
      } else if (typeof rating === "number" && i < rating) {
        star = (
          <StarIcon
            key={i}
            style={{ fontSize: props.fontSize }}
            className="text-amber-500 hover:cursor-pointer -mr-[3%]"
          />
        );
      } else {
        star = (
          <StarBorderIcon
            key={i}
            style={{ fontSize: props.fontSize }}
            className="text-amber-500 hover:cursor-pointer -mr-[3%]"
          />
        );
      }

      stars.push(star); // Add star to the stars array
    }
  }

  // Handler to clear the selected rating and reset it
  const handleClearClick = () => {
    const resetValue = props.rating;
    setSelectedRating(resetValue);

    dispatch({
      type: "CLEAR_RATING",
      id: props.id,
    });

    setShowClearButton(false);
  };

  return (
    <>
      <div>
        {/* Show "Clear" button only if there's a selected rating */}
        {props.isStarInteractive && showClearButton && (
          <div className="flex items-center -ml-[1.5%]">
            <KeyboardArrowLeftIcon />
            <p
              onClick={handleClearClick}
              className="text-clamp10 cursor-pointer -ml-[2%] mt-[0.5%]"
            >
              Clear
            </p>
          </div>
        )}
      </div>
      {/* Render static star display */}
      {!props.isStarInteractive && <div className="flex">{stars}</div>}

      {/* Render interactive stars for filtering */}
      {props.isStarInteractive && (
        <div className="flex items-center justify-start mb-[5%]">
          <div className="flex">{stars}</div>
          <span className="text-clamp3 hover:cursor-pointer hover:text-amber-500 -mb-[2%]">
            & Up
          </span>
        </div>
      )}
    </>
  );
}

export default StarRating;
