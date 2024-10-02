import Carousel from "./Carousel";
import Product from "./Product";
import { images } from "./homeImages";

function Home() {
  return (
    <div>
      <Carousel />
      <div className="bg-slate-200 flex w-full px-[1.5%] gap-[1.5%] flex-wrap">
        <Product
          title="Gaming accessories"
          imageInfo={images.gamingAccessoriesImages}
          link="See more"
        />
        <Product
          title="Shop deals in Fashion"
          imageInfo={images.fashion}
          link="See all deals"
        />
        <Product
          title="Refresh your space"
          imageInfo={images.decorItems}
          link="See more"
        />
        <Product
          title="Deals in PCs"
          imageInfo={images.dealsPCs}
          link="Shop now"
        />
        <Product
          title="Deals on gifts for Dad"
          imageInfo={images.giftsForDad}
          link="Shop all"
        />
        <Product
          title="Level up your makeup"
          imageInfo={images.beautyProducts}
          link="See more"
        />
        <Product
          title="Best Deals in Laptops"
          imageInfo={images.laptops}
          link="Shop now"
        />
        <Product
          title="Refresh your space"
          imageInfo={images.refreshYourSpace}
          link="See more"
        />
      </div>
      <div className="bg-slate-200 w-full px-[1.5%]">
        <Product
          title="Best sellers in Sports"
          imageInfo={images.sportsProducts}
        />
        <Product
          title="Most Watched Movies & Shows"
          imageInfo={images.movies}
        />
      </div>
    </div>
  );
}

export default Home;
