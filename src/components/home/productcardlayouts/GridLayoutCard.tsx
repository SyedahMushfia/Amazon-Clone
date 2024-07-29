import { Link } from "react-router-dom";

type ImageGridProps = {
  imageArray: { image: string; name?: string }[];
};

// This function creates a layout for a grid of images in the product card.
function GridLayoutCard({ imageArray }: ImageGridProps) {
  // Divide the array of 4 images into two rows
  const splitIndex =
    imageArray && imageArray.length === 4
      ? Math.ceil(imageArray.length / 2)
      : 0;
  const firstRow = imageArray.slice(0, splitIndex);

  const secondRow = imageArray.slice(splitIndex);

  return (
    <div className=" mt-[5%] mb-[7%] h-[23vw] ">
      <div className=" w-full h-[36%] mb-[18%] flex gap-[6%]">
        {/* This generates a row of images based on the 'firstRow' array. */}
        {firstRow.map(
          (imageData: { image: string; name?: string }, index: number) => (
            <Link to={`/productListing/${imageData.name}`}>
              <div
                className="bg-green-300  relative"
                key={`firstRow_${imageData.name}`}
              >
                <img
                  src={imageData.image}
                  alt={imageData.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-[100%] font-sans text-clamp7">
                  {imageData.name}
                </span>
              </div>
            </Link>
          )
        )}
      </div>
      <div className=" w-full h-[36%] mb-[18%] flex gap-[6%]">
        {/* This generates a row of images based on the 'secondRow' array. */}
        {secondRow.map(
          (imageData: { image: string; name?: string }, index: number) => (
            <Link to={`/productListing/${imageData.name}`}>
              <div
                className="bg-green-300 relative"
                key={`secondRow_${imageData.name}`}
              >
                <img
                  src={imageData.image}
                  alt={imageData.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-[100%] font-sans text-clamp7">
                  {imageData.name}
                </span>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default GridLayoutCard;
