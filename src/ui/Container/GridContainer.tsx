interface IGridContainerProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
  gap?: number;
}

const GridContainer: React.FC<IGridContainerProps> = (props) => {
  return (
    <div
      className={`my-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${
        props.columns || 4
      } gap-[${props.gap || 2.4}rem] ${props.className || ""}`}
    >
      {props.children}
    </div>
  );
};

export default GridContainer;
