import BaseContainer from "@/ui/Container/BaseContainer";
import ProductList from "@/ui/ProductsList/ProductsList";

interface ITitledProductList {
  title: string;
  description: string;
  products: any[];
  isLoading: boolean;
}

const TitledProductList: React.FC<ITitledProductList> = (props) => {
  return (
    <BaseContainer className="py-40">
      <div className="text-center pb-12">
        <h1 className="text-6xl font-semibold uppercase text-heading-color1 pb-4">
          {props.title}
        </h1>
        <p className="font-normal	text-paragraph-color1 text-[1.6rem]">
          {props.description}
        </p>
      </div>
      <ProductList products={props.products} isLoading={props.isLoading} />
    </BaseContainer>
  );
};

export default TitledProductList;
