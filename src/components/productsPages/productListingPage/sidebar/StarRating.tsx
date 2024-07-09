import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
}

function StarRating(props: StarRatingProps) {
  const rating = props.rating;
  const totalStars = 5;
  const stars = [];

  // To generate star icons based on rating
  for (let i = 0; i < totalStars; i++) {
    let star: React.ReactElement;

    if (rating - i > 0 && rating - i < 1) {
      star = (
        <StarHalfIcon
          key={i}
          style={{
            fontSize: "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
          }}
          className="text-amber-500 hover:cursor-pointer"
        />
      );
    } else if (i < rating) {
      star = (
        <StarIcon
          key={i}
          style={{
            fontSize: "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
          }}
          className="text-amber-500 hover:cursor-pointer"
        />
      );
    } else {
      star = (
        <StarBorderIcon
          key={i}
          style={{
            fontSize: "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
          }}
          className="text-amber-500 hover:cursor-pointer"
        />
      );
    }

    stars.push(star);
  }

  return <div>{stars}</div>;
}

export default StarRating;
