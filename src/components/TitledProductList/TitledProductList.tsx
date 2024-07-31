import BaseContainer from "@/ui/Container/BaseContainer";
import ProductList from "@/ui/ProductsList/ProductsList";
import Spinner from "@/ui/Spinner/Spinner";

interface ITitledProductList {
  title?: string;
  description?: string;
  products: any[];
  isLoading: boolean;
  baseContainerClass?: string;
  isFetching?: boolean;
  columns?: number;
}

const TitledProductList: React.FC<ITitledProductList> = (props) => {
  if (props.isFetching)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <BaseContainer className={`${props.baseContainerClass} py-20`}>
      <div className="text-center ">
        {props.title && (
          <h1 className="text-6xl font-semibold uppercase text-heading-color1 pb-4">
            {props.title}
          </h1>
        )}
        {props.description && (
          <p className="font-normal	text-paragraph-color1 text-[1.6rem]">
            {props.description}
          </p>
        )}
      </div>
      <div className="pt-8">
        <ProductList
          products={props.products}
          isLoading={props.isLoading}
          columns={props.columns}
        />
      </div>
    </BaseContainer>
  );
};

export default TitledProductList;
