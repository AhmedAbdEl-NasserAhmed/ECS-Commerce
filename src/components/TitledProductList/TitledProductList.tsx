import BaseContainer from "@/ui/Container/BaseContainer";
import ProductList from "@/ui/ProductsList/ProductsList";

interface ITitledProductList {
  title?: string;
  description?: string;
  products: any[];
  isLoading: boolean;
  baseContainerClass?: string;
}

const TitledProductList: React.FC<ITitledProductList> = (props) => {
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
        <ProductList products={props.products} isLoading={props.isLoading} />
      </div>
    </BaseContainer>
  );
};

export default TitledProductList;
