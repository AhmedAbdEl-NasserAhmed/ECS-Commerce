const ProductActionItem = (props) => {
  return (
    <li onClick={props.onClick}>
      <span className="flex items-center justify-center text-[1.7rem] bg-white hover:bg-[#ed0534] transition-all duration-300 hover:text-white w-[4rem] h-[4rem] rounded-full">
        {props.icon}
      </span>
    </li>
  );
};

export default ProductActionItem;
