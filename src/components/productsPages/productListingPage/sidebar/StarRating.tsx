import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
}

function StarRating(props: StarRatingProps) {
  const rating = props.rating;
  const totalStars = 5;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((star, index) => {
        return (
          <div className="-mt-[3%] -ml-[2%] text-amber-500 hover:cursor-pointer">
            {index < rating ? (
              <StarIcon
                style={{
                  fontSize: "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
                }}
              />
            ) : (
              <StarBorderIcon
                style={{
                  fontSize: "clamp(0.5625rem, 0.1884rem + 1.5962vi, 1.625rem)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StarRating;
