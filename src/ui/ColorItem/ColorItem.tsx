const ColorItem = (props) => {
  return (
    <div
      className={`relative w-[2rem] h-[2rem] rounded-full -rotate-45 ${props.className}`}
    >
      <span
        className="absolute bg-white top-0 w-full h-1/2 rounded-t-[1rem]"
        style={{
          background: `${props.color}`,
        }}
      ></span>
      <span className="absolute bg-white bottom-0 w-full h-1/2 rounded-b-[1rem]"></span>
    </div>
  );
};

export default ColorItem;
