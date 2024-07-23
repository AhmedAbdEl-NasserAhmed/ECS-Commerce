const ProductActionItem = (props) => {
  const isAction = !!props.onClick;
  const isActionClasses = isAction ? `hover:bg-[#ed0534] hover:text-white` : "";
  return (
    <li onClick={props.onClick}>
      <span
        className={`flex items-center justify-center text-[1.7rem] bg-white ${isActionClasses} transition-all duration-300  w-[4rem] h-[4rem] rounded-full ${props.className}`}
      >
        {props.content}
      </span>
    </li>
  );
};

export default ProductActionItem;
