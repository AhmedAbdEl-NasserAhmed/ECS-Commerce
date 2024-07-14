interface IBaseContainerProps {
  children: React.ReactNode;
  className?: string;
}

const BaseContainer: React.FC<IBaseContainerProps> = (props) => {
  return (
    <div className={`mx-auto px-4 ${props.className || ""}`}>
      {props.children}
    </div>
  );
};

export default BaseContainer;
