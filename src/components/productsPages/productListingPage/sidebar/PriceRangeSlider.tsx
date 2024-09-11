import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";

function valuetext(value: number) {
  return `$${value}`;
}

interface PriceRangeSliderProps {
  min: string;
  max: string;
}

function PriceRangeSlider(props: PriceRangeSliderProps) {
  const [value, setValue] = useState<number[]>([
    Number(props.min),
    Number(props.max),
  ]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
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

        <button className="text-clamp10 border-[2px] border-gray-300 rounded-[18%] drop-shadow-lg py-[1%] px-[4%]">
          Go
        </button>
      </div>
    </Box>
  );
}

export default PriceRangeSlider;
