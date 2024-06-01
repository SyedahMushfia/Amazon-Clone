import GridLayoutCard from "./productcardlayouts/GridLayoutCard";
import SingleImgCard from "./productcardlayouts/SingleImgCard";
import MultipleImgCard from "./productcardlayouts/MultipleImgCard";
import { ProductProps } from "../../interfaces";
import {
  ImageInfoProps,
  useImageStylingContext,
} from "../../context/ImageStylingContext";
import { isEqual } from "lodash";

function Product({ title, imageInfo, link }: ProductProps) {
  const images = useImageStylingContext();

  let imageArray: ImageInfoProps[keyof ImageInfoProps] = [];

  //Get the array from the images object & compare it with the imageInfo prop.
  for (const imageCategory in images) {
    if (isEqual(images[imageCategory], imageInfo)) {
      imageArray = images[imageCategory];
      break;
    }
  }

  return (
    <>
      <div className="bg-white w-full flex-[1_1_23%] h-auto z-10 mb-[1.5%] px-[1.75%] py-[1.75%]">
        <div className=" w-full min-h-[6%] font-sans font-extrabold tracking-wide text-clamp5">
          {title}
        </div>
        {/* There are 3 conditional rendering logic. */}

        {/* For the 2x2 image grid. */}
        {imageInfo.length === 4 && <GridLayoutCard imageArray={imageArray} />}

        {/* For single image. */}
        {imageInfo.length === 1 && <SingleImgCard imageArray={imageArray} />}

        {/* For multiple images.*/}
        {imageInfo.length > 4 && <MultipleImgCard imageArray={imageArray} />}
        <div className=" h-[5%] font-sans text-cyan-600 text-clamp6 tracking-wide">
          {link}
        </div>
      </div>
    </>
  );
}

export default Product;
