import { useGetSubCategoryByIdQuery } from "@/lib/features/api/subCategoriesApi";
import MiniSpinner from "@/ui/MiniSpinner/MiniSpinner";
import Spinner from "@/ui/Spinner/Spinner";
import { useParams } from "next/navigation";

function SubCategoriesItem({ id }) {
  const { data, isLoading } = useGetSubCategoryByIdQuery(id, { skip: !id });

  const { locale } = useParams();

  if (isLoading || !data) return <MiniSpinner />;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-400">
        # {data?.data?.name?.[locale as string]}
      </h2>
    </div>
  );
}

export default SubCategoriesItem;
