interface IconColorProps {
  colors: string[];
}

function RenderColourOptions(props: IconColorProps) {
  return (
    <div className="flex">
      {props.colors.map((color, index) => (
        <div
          key={index}
          className={`w-5 h-5 rounded-full mr-2 mt-[1%] mb-[2%] border-gray-300 border-[1px] ${
            index === 0 ? "ring-[0.5px] ring-black" : ""
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export default RenderColourOptions;
