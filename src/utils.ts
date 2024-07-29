// Function to calculate the discounted price based on list price and discount percentage
export const calculateDiscountedPrice = (
  listPrice: number,
  discount: number
): string => {
  const discountedPrice = (listPrice - listPrice * (discount / 100)).toFixed(2); // Calculate the discounted price and format it to 2 decimal places
  return discountedPrice;
};

// Function to format sales count in a compact notation if it exceeds 1000
export const formatSalesCount = (num: number) => {
  if (num >= 1000) {
    const formattedSalesCount = new Intl.NumberFormat("en-US", {
      notation: "compact",
    }).format(num);
    return `${formattedSalesCount}+`; // Append a '+' sign to indicate more than the formatted value
  } else return num; // Return the number as is if it's less than 1000
};

// Function to calculate the delivery date by adding 20 days to the current date
export const calculateDeliveryDate = () => {
  const currentDate = new Date(); // Get the current date
  currentDate.setDate(currentDate.getDate() + 20); // Add 20 days to the current date

  return currentDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
