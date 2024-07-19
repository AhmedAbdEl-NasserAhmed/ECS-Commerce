interface IGridContainerProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
  gap?: number;
}

const GridContainer: React.FC<IGridContainerProps> = ({
  children,
  className,
  columns = 4,
  gap = 2.4,
}) => {
  const lgColumnsClass = columns ? `lg:grid-cols-${columns}` : `lg:grid-cols-4`;
  const gapClass = gap ? `gap-[${gap}rem]` : `gap-[2.4rem]`;

  return (
    <div
      className={`my-12 w-full grid grid-cols-1 md:grid-cols-2 ${lgColumnsClass} ${gapClass} ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default GridContainer;
