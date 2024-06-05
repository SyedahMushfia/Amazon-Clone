function ScrollToTop() {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return (
    <div
      onClick={backToTop}
      className="flex justify-center items-center bg-slate-700 text-white py-[1%] hover:cursor-pointer hover:bg-slate-600"
    >
      <span className="font-sans text-clamp10 tracking-wide">Back to top</span>
    </div>
  );
}

export default ScrollToTop;
