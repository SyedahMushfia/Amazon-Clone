import { useState, useEffect } from "react";

const carouselImages = [
  "/images/father's_day_gifts.jpg",
  "/images/gaming_products.jpg",
  "/images/kitchen-products.png",
  "/images/toys.jpg",
  "/images/beauty_products.jpg",
  "/images/books.jpg",
];

function Carousel() {
  const [currentImage, setCurrentImage] = useState(0);

  // State to stop the auto slide after one rotation
  const [hasAutoSlideCompleted, setHasAutoSlideCompleted] = useState(false);

  useEffect(() => {
    if (hasAutoSlideCompleted) return;

    const autoSlide = setInterval(() => {
      setCurrentImage((prevIndex) => {
        const nextIndex =
          prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1;

        if (nextIndex === 0) setHasAutoSlideCompleted(true);

        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(autoSlide);
  }, [carouselImages.length, hasAutoSlideCompleted]);

  const handleNext = () => {
    setCurrentImage(
      currentImage === carouselImages.length - 1 ? 0 : currentImage + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImage(
      currentImage === 0 ? carouselImages.length - 1 : currentImage - 1
    );
  };

  return (
    <div className="relative">
      <div className="flex justify-between relative z-[5]">
        <div
          className="w-[6%] h-[20vw] py-[8%] active:border-2 border-white rounded-[2.5%]"
          onClick={handlePrevious}
        >
          <img
            src="/images/previous-arrow-icon.png"
            alt="previous-arrow-icon"
            className="w-[30%] ml-[30%]"
          />
          <div className="h-[19.75vw] absolute top-[0.5%] w-[5.75%] active:border-[3px] border-cyan-700 rounded-[2.5%]"></div>
        </div>
        <div
          className="w-[6%] h-[20vw] float-right  left-[93.75vw] py-[8%] active:border-2 border-white rounded-[2.5%]"
          onClick={handleNext}
        >
          <img
            src="/images/next-arrow-icon.png"
            alt="next-arrow-icon"
            className="w-[32%] ml-[40%]"
          />
          <div className="h-[19.75vw] absolute top-[0.5%] left-[92.85vw] w-[5.7%] active:border-[3px] border-cyan-700 rounded-[2.5%]"></div>
        </div>
      </div>
      <img
        src={carouselImages[currentImage]}
        alt="carousel-images"
        className="w-full gradient-mask-b-50 absolute inset-0"
      />
    </div>
  );
}

export default Carousel;
