interface FormattedPriceProps {
  price: number | string;
}

function FormattedPrice(props: FormattedPriceProps) {
  // Convert price to string if it's a number
  const priceString =
    typeof props.price === "number" ? props.price.toString() : props.price;
  // Split the price into whole number and fractional parts
  const [wholeNumber, fractional] = priceString.split(".");

  return (
    <>
      <span className="text-clamp16 ">{wholeNumber}</span>
      {/* Display fractional part if it's not "00" */}
      {fractional === "00" ? null : (
        <sup>
          <span className="text-clamp6 align-super">{fractional}</span>
        </sup>
      )}
    </>
  );
}

export default FormattedPrice;
