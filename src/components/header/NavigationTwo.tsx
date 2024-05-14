import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function NavigationTwo() {
  return (
    <>
      <div className="bg-slate-800 h-[3vw]">
        <ul className="flex font-sans text-white   py-[0.5%] text-clamp4 tracking-wide font-medium">
          <MenuOutlinedIcon
            className="ml-[1.5%] -mt-[0.15%]"
            style={{
              fontSize: "clamp(0.5rem, 0.1259rem + 1.5962vi, 1.5625rem)",
            }}
          />
          <div className="gap-4 flex">
            <li className="font-bold">All</li>
            <li>Today's Deals</li>
            <li>Customer Service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default NavigationTwo;
