import { useGetSubCategoryByIdQuery } from "@/lib/features/api/subCategoriesApi";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import Spinner from "@/ui/Spinner/Spinner";

function SubCategoriesItem({ id }) {
  const { data, isLoading } = useGetSubCategoryByIdQuery(id, { skip: !id });

  if (isLoading || !data) return <MiniSpinner />;

  console.log("DATA", data);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-400">
        # {data?.data?.name}
      </h2>
    </div>
  );
}

export default SubCategoriesItem;
