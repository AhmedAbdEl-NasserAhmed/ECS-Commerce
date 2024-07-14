interface IGridContainerProps {
  children: React.ReactNode;
  className?: string;
}

const GridContainer: React.FC<IGridContainerProps> = (props) => {
  return (
    <div
      className={`my-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2.4rem] ${
        props.className || ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default GridContainer;
