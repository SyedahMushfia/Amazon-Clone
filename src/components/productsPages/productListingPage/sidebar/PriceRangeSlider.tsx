import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../../../../utils";

function valuetext(value: number) {
  return `$${value}`;
}

interface PriceRangeSliderProps {
  id: string;
  min: string;
  max: string;
  onPriceChange: (min: number, max: number) => void;
}

function PriceRangeSlider(props: PriceRangeSliderProps) {
  // Initialize slider value from localStorage or set to default min/max
  const [value, setValue] = useState<number[]>(() => {
    return (
      getFromLocalStorage(`value-${props.id}`) || [
        Number(props.min),
        Number(props.max),
      ]
    );
  });

  // Track final value for "Go" button state
  const [finalValue, setFinalValue] = useState<number[]>(() => {
    return (
      getFromLocalStorage(`finalValue-${props.id}`) || [
        Number(props.min),
        Number(props.max),
      ]
    );
  });

  // Show or hide reset button based on localStorage or default to false
  const [showResetButton, setShowResetButton] = useState(() => {
    return getFromLocalStorage(`resetValue-${props.id}`) || "false";
  });

  // Handle slider value change and save it locally
  const handleChange = (event: Event, newValue: number | number[]) => {
    const updatedValue = newValue as number[];
    setValue(updatedValue);
    saveToLocalStorage(`updatedValue-${props.id}`, updatedValue);
  };

  // Handle "Go" button click to apply final value and update parent
  const handleGoClick = () => {
    setFinalValue(value);
    saveToLocalStorage(`value-${props.id}`, value);

    props.onPriceChange(value[0], value[1]);
    setShowResetButton(true);
    saveToLocalStorage(`showResetButton-${props.id}`, showResetButton);
  };

  // Handle reset button click to revert price range slider to default min/max
  const handleResetClick = () => {
    const resetValue = [Number(props.min), Number(props.max)];

    setValue(resetValue);
    setFinalValue(resetValue);

    saveToLocalStorage(`resetValue-${props.id}`, resetValue);

    props.onPriceChange(resetValue[0], resetValue[1]);
    setShowResetButton(false); // Hide reset button after resetting slider values
  };

  return (
    <Box sx={{ width: 150 }}>
      <div className="font-bold text-clamp10 mb-[8%]">
        {valuetext(value[0])} - {valuetext(value[1])}+
      </div>
      <div className="w-[200%] flex">
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
          getAriaValueText={valuetext}
          min={Number(props.min)}
          max={Number(props.max)}
          className="ml-[4%] mr-[7%]"
          sx={{
            color: "#017278",
            height: 4,
            width: 160,
            "& .MuiSlider-thumb": {
              width: 28,
              height: 28,
              backgroundColor: "#fff",
              border: "8px solid #017278",
            },
          }}
        />

        <button
          onClick={handleGoClick}
          className="text-clamp10 border-[2px] border-gray-300 rounded-[18%] drop-shadow-lg py-[1%] px-[4%]"
        >
          Go
        </button>
      </div>
      <div>
        {showResetButton && (
          <div
            onClick={handleResetClick}
            className="text-clamp10 mt-[3%] text-cyan-900 cursor-pointer"
          >
            Reset price range
          </div>
        )}
      </div>
    </Box>
  );
}

export default PriceRangeSlider;
