import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function FooterNav() {
  return (
    <>
      <div className="flex justify-evenly bg-slate-800 text-white font-sans py-[3%]">
        <div>
          <ul className="leading-loose">
            <li>
              <strong className="text-clamp11">Get to Know Us</strong>
            </li>
            <div className="text-slate-200 text-clamp10 tracking-wide">
              <li>Careers</li>
              <li>Blog</li>
              <li>About Amazon</li>
              <li>Investor Relations</li>
              <li>Amazon Devices</li>
              <li>Amazon Science</li>
            </div>
          </ul>
        </div>
        <div>
          <ul className="leading-loose">
            <li>
              <strong className="text-clamp11">Make Money with Us</strong>
            </li>
            <div className="text-slate-200 text-clamp10 tracking-wide">
              <li>Sell products on Amazon</li>
              <li>Sell on Amazon Business</li>
              <li>Sell apps on Amazon</li>
              <li>Become an Affiliate</li>
              <li>Advertise Your Products</li>
              <li>Self-Publish with Us</li>
              <li>Host an Amazon Hub</li>
              <li>› See More Make Money with Us</li>
            </div>
          </ul>
        </div>
        <div>
          <ul className="leading-loose">
            <li>
              <strong className="text-clamp11">Amazon Payment Products</strong>
            </li>
            <div className="text-slate-200 text-clamp10 tracking-wide">
              <li>Amazon Business Card</li>
              <li>Shop with Points</li>
              <li>Reload Your Balance</li>
              <li>Amazon Currency Converter</li>
            </div>
          </ul>
        </div>
        <div>
          <ul className="leading-loose">
            <li>
              <strong className="text-clamp11">Let Us Help You</strong>
            </li>
            <div className="text-slate-200 text-clamp10 tracking-wide">
              <li>Amazon and COVID-19</li>
              <li>Your Account</li>
              <li>Your Orders</li>
              <li>Shipping Rates & Policies</li>
              <li>Returns & Replacements</li>
              <li>Manage Your Content and Devices</li>
              <li>Amazon Assistant</li>
              <li>Help</li>
            </div>
          </ul>
        </div>
      </div>
      {/* Line break */}
      <div className="border-slate-700 border-t-[0.5px]"></div>
      {/* Logo, Language, Currency & Country */}
      <div className="bg-slate-800 flex pt-[2%] pb-[3.5%]">
        <div className="w-[6%] ml-[27%] mr-[6%] pt-[1%]">
          <img src="/images/Amazon-logo.png" alt="amazon-logo" />
        </div>
        <div className="flex gap-[1%] w-[35%]">
          <div className="text-slate-300 text-clamp10 w-[27%] py-[1.25%] px-[2%] border-[1px] border-slate-400 rounded-[4px] flex items-center">
            <LanguageOutlinedIcon
              style={{
                fontSize: "clamp(0.375rem, 0.1329rem + 1.0329vi, 1.0625rem)",
              }}
            />
            <span className="pl-[8%] pr-[24%]">English</span>

            <div className="flex flex-col">
              <ArrowDropUpIcon
                className=" text-slate-600 -mb-[58%]"
                style={{
                  fontSize: "clamp(0.375rem, 0.1329rem + 1.0329vi, 1.0625rem)",
                }}
              />
              <ArrowDropDownIcon
                className="text-slate-600 "
                style={{
                  fontSize: "clamp(0.375rem, 0.1329rem + 1.0329vi, 1.0625rem)",
                }}
              />
            </div>
          </div>
          <div className="text-slate-300 text-clamp10 w-[33%] pl-[2%] border-[1px] border-slate-400 rounded-[4px] flex justify-start items-center">
            <span className="pr-[6%]">
              <strong>$</strong>
            </span>
            <span>USD - U.S.Dollar</span>
          </div>
          <div className="text-slate-300 text-clamp10 w-[31%] pl-[2%] border-[1px] border-slate-400 rounded-[4px] flex justify-start items-center">
            <div className="w-[12%] border-[1px] border-slate-400 mr-[6%]">
              <img
                src="/images/flag-footer-icon.png"
                alt="flag"
                className="w-full object-cover"
              />
            </div>
            <span>United States</span>
          </div>
        </div>
      </div>
      {/* Copyright, Terms & Conditions, Privacy Policy */}
      <div className="bg-[#131A22] font-sans text-white text-clamp8 pt-[1%] pb-[2.5%]">
        <ul className="flex  gap-[1.5%] ml-[26%]">
          <li>Conditions of Use</li>
          <li>Privacy Notice</li>
          <li>Consumer Health Data Privacy Disclosure</li>
          <li>Your Ads Privacy Choices</li>
          <div className="w-[3.25%] -ml-[0.5%] pt-[0.25%]">
            <img src="/images/privacy-icon.png" alt="privacy-icon" />
          </div>
        </ul>
        <span className="ml-[38.5%]">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </span>
      </div>
    </>
  );
}

export default FooterNav;
