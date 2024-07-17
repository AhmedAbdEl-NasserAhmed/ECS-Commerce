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
  if (!props?.products?.length)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-3xl font-semibold">No Products Available</p>
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
      <div className="pt-12">
        <ProductList products={props.products} isLoading={props.isLoading} />
      </div>
    </BaseContainer>
  );
};

export default TitledProductList;
