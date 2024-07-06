import Subtotal from "./Subtotal";

function CheckoutPage() {
  return (
    <>
      <div className="flex bg-slate-200">
        <div className="flex flex-col flex-[1_1_70%]  mx-[1.5%] mt-[1.5%]">
          <div className="bg-white  px-[1.75%] pt-[2%] mb-[2.25%]">
            <div className="bg-white ">
              <h1 className="font-sans text-[29px]">Shopping Cart</h1>
              <span className="flex justify-end font-sans text-[14.5px] text-slate-600 tracking-wide">
                Price
              </span>
              <div className="border-slate-300 border-t-[0.5px]">
                {/*Line Break */}
              </div>
            </div>
          </div>
          <div className="bg-white">Saved Items</div>
          <div className="font-sans text-[12px] tracking-wide my-[2%]">
            <span className="inline-block">
              The price and availability of items at Amazon.com are subject to
              change. The Cart is a temporary place to store a list of your
              items and reflects each item's most recent price.{" "}
              <span className="text-cyan-800">Learn more</span>
            </span>
            <span>
              Do you have a gift card or promotional code? We'll ask you to
              enter your claim code when it's time to pay.
            </span>
          </div>
        </div>
        <Subtotal value={0} />
      </div>
    </>
  );
}

export default CheckoutPage;
