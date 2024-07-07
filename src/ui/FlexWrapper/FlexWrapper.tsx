const FlexWrapper = (props) => {
  return (
    <div className="mx-auto max-w-12xl">
      <div
        className={`flex flex-wrap md:flex-nowrap gap-3 justify-between ${props.className}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default FlexWrapper;
