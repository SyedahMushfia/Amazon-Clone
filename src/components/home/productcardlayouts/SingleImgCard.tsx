type ImageGridProps = {
  imageArray: { image: string; name?: string }[];
};

// This function creates a layout for a single image in the product card.
function SimgleImgCard({ imageArray }: ImageGridProps) {
  return (
    <div className="mt-[6%] mb-[7%] h-[22.35vw]">
      <img
        src={imageArray[0].image}
        alt={imageArray[0].name}
        className="w-full h-full object-cover"
      />
      {/* conditional logic to render <p> if imageArray[0].name is truthy. */}
      {imageArray[0].name && <p>{imageArray[0].name}</p>}
    </div>
  );
}

export default SimgleImgCard;
