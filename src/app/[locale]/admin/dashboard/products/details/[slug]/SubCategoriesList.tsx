import SubCategoriesItem from "./SubCategoriesItem";

function SubCategoriesList({ subCategoriesIds }) {
  return (
    <ul className="flex items-center gap-4">
      {subCategoriesIds?.map((subCategoryId: string) => {
        return <SubCategoriesItem key={subCategoryId} id={subCategoryId} />;
      })}
    </ul>
  );
}

export default SubCategoriesList;
