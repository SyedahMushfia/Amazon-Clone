import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { useFilterContext } from "../../../../context/FilterContext";

function valuetext(value: number) {
  return `$${value}`;
}

interface PriceRangeSliderProps {
  id: string;
  min: string;
  max: string;
}

function PriceRangeSlider(props: PriceRangeSliderProps) {
  const { dispatch } = useFilterContext();

  const [value, setValue] = useState<number[]>([
    Number(props.min),
    Number(props.max),
  ]);

  // Track final value for "Go" button state
  const [finalValue, setFinalValue] = useState<number[]>([
    Number(props.min),
    Number(props.max),
  ]);

  // Show or hide reset button based on localStorage or default to false
  const [showResetButton, setShowResetButton] = useState(false);

  // Handle slider value change and save it locally
  const handleChange = (event: Event, newValue: number | number[]) => {
    const updatedValue = newValue as number[];
    setValue(updatedValue);
  };

  const handleGoClick = () => {
    setFinalValue(value);

    dispatch({
      type: "SET_PRICE_RANGE",
      payload: [value[0], value[1]],
      id: props.id,
    });

    setShowResetButton(true);
  };

  const handleResetClick = () => {
    const resetValue = [Number(props.min), Number(props.max)];

    setValue(resetValue);
    setFinalValue(resetValue);

    dispatch({
      type: "SET_PRICE_RANGE",
      payload: [resetValue[0], resetValue[1]],
      id: props.id,
    });

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
