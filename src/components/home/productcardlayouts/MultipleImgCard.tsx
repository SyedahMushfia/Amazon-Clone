import { useState } from "react";

type ImageGridProps = {
  imageArray: { image: string }[];
};

// This function creates a carousel layout for multiple images in the product card.
function MultipleImgCard({ imageArray }: ImageGridProps) {
  // State to track the index of the current image being displayed
  const [currentImages, setCurrentImages] = useState(0);

  const handleNext = () => {
    setCurrentImages((prevIndex) => {
      // Increase the index by 6 to display the next set of images.
      const nextIndex = prevIndex + 6;
      // Stop carousel navigation when reaching the end of the available images.
      return nextIndex >= imageArray.length ? prevIndex : nextIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentImages((prevIndex) => {
      // Decrease the index by 6 to display the previous set of images.
      const previousIndex = prevIndex - 6;
      // Stop carousel navigation at the beginning of the available images, preventing unnecessary navigation past the beginning of the image array.
      return previousIndex < 0 ? 0 : previousIndex;
    });
  };

  return (
    <>
      <div className=" h-[16vw] overflow-hidden">
        <div className=" flex w-[200%] h-full gap-[0.5%]">
          {/* To render only a portion of the images from imageArray on the screen. */}
          {imageArray
            .slice(currentImages, currentImages + 7)
            .map((imageInfo: { image: string }, index: number) => (
              <div key={index}>
                <img src={imageInfo.image} />
              </div>
            ))}
        </div>
        <div className="flex justify-between h-[50%] relative">
          <div
            className="bg-white w-[4%] h-full py-[3%] absolute bottom-[147%]  rounded-r-[5%] opacity-0 transition-[opacity] duration-[2000ms] ease-in-out hover:opacity-100 active:border-cyan-700 border-2"
            onClick={handlePrevious}
          >
            <img
              src="/images/back.png"
              alt="back-icon"
              className="w-[29%] ml-[25%]"
            />
          </div>
          <div
            className="bg-white w-[4%] h-full py-[3%] absolute left-[96%] bottom-[147%] rounded-l-[5%] opacity-0 transition-[opacity] duration-[2000ms] ease-in-out hover:opacity-100 active:border-cyan-700 border-2"
            onClick={handleNext}
          >
            <img
              src="/images/next.png"
              alt="next-icon"
              className="w-[29%] ml-[37%]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MultipleImgCard;
