import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

interface StarRatingProps {
  rating: number | string[]; // The rating value to display
  totalStars?: number; // Optional prop for the total number of stars
  fontSize: string; // The size of the star icons
}

function StarRating(props: StarRatingProps) {
  const rating = props.rating; // Extract rating from props
  const totalStars = 5;
  const stars = [];

  // To generate star icons based on rating
  for (let i = 0; i < totalStars; i++) {
    let star: React.ReactElement;

    // Conditionally render full, half, or empty star icons
    if (typeof rating === 'number' && rating - i > 0 && rating - i < 1) {
      star = (
        <StarHalfIcon
          key={i}
          style={{ fontSize: props.fontSize }}
          className="text-amber-500 hover:cursor-pointer -mr-[3%]"
        />
      );
    } else if (typeof rating === 'number' && i < rating) {
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

  return <div className="flex">{stars}</div>;
}

export default StarRating;
