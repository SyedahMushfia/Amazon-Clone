function SignIn() {
  return (
    <>
      <div className="bg-white font-sans pt-[3%] pb-[1.5%]">
        <div className=" flex flex-col justify-center items-center border-[1px] border-gray-300 rounded-[5px] pt-[2.75%] pb-[1.25%]">
          <span className="text-clamp8">See personalized recommendations</span>

          <div className="my-[0.25%] bg-gradient-to-t from-amber-500 to-amber-200 px-[7.5%] flex items-center py-[0.25%] border-2 rounded-[4px] border-amber-400">
            <span className="text-clamp8 font-bold">Sign in</span>
          </div>
          <span className="text-clamp9 tracking-wide">
            New customer? <span className="text-cyan-700">Start here.</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default SignIn;
