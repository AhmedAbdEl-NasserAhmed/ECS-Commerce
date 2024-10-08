import ProductTableMenuOptions from "@/components/AdminProduct/productTableMenuOptions";
import { formatCurrency } from "@/lib/helpers";
import Spinner from "@/ui/Spinner/Spinner";
import Image from "next/image";

export const productTableHeaders = (
  locale,
  translate,
  isLoadingImages,
  setIsloadingImages
) => {
  return [
    {
      id: "name",
      header: () => translate("Product Name"),
      accessorKey: "name",

      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return original.name?.[locale];
      },
    },

    {
      id: "quantity",
      header: () => translate("Product Quantity"),
      accessorKey: "quantity",
      // size: 100,
    },
    {
      id: "price",
      header: () => translate("Product Price"),
      accessorKey: "price",
      size: 100,
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return formatCurrency(original.price, locale);
      },
    },
    {
      id: "discount",
      header: () => translate("Product Discount %"),
      accessorKey: "discount",
      size: 100,
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        const style = original.discount === 0 ? "red" : "green";
        return <div style={{ color: style }}>{original.discount + "%"}</div>;
      },
    },
    {
      id: "saleProduct",
      header: () => translate("Product Sale Price"),
      accessorKey: "saleProduct",
      size: 100,
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        const style = original.discount === 0 ? "" : "green";

        return (
          <div style={{ color: style }}>
            {formatCurrency(original.saleProduct, locale)}
          </div>
        );
      },
    },
    {
      id: "size",
      header: () => translate("Product Size"),
      accessorKey: "size",
      size: 100,
      cell: ({
        cell: {
          row: { original },
        },
      }) => {
        return original.size.value;
      },
    },
    {
      id: "colors",
      header: () => translate("Product Colors"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => (
        <div style={{ gap: "10px" }} className="flex justify-center">
          {original.colors.map((color) => (
            <span
              key={color.label}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: color.color,
              }}
            >
              &nbsp;
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "images",
      header: () => translate("Product Image"),
      cell: ({
        cell: {
          row: { original },
        },
      }) => (
        <div style={{ gap: "20px" }} className="flex justify-center ">
          {isLoadingImages && (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          )}
          <Image
            className="rounded-xl"
            onLoad={() => setIsloadingImages(false)}
            key={original?.images[0]?.id}
            src={original?.images[0]?.url}
            alt={`Product Image ${original?.images[0]?.id || ""}`}
            height={55}
            width={55}
          />
        </div>
      ),
    },

    {
      id: "actions",
      header: () => "Actions",
      cell: ({
        cell: {
          row: { original },
        },
      }) => <ProductTableMenuOptions product={original} />,
    },
  ];
};
