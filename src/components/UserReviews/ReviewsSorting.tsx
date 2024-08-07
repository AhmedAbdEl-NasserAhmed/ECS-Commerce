import { useTranslations } from "next-intl";

function ReviewsSorting({ handleSortChange }) {
  const userTranslation = useTranslations("user");

  return (
    <div className="absolute top-0 end-0">
      <select
        name="sort"
        className="mt-5 lg:mt-0 py-2 px-4 rounded-2xl text-lg font-medium bg-white ring-1 ring-gray-400 w-full"
        onChange={handleSortChange}
      >
        <option value="">{userTranslation("Sort By")}</option>
        <option value="-createdAt">{userTranslation("Newest")}</option>
        <option value="createdAt">{userTranslation("Oldest")}</option>
      </select>
    </div>
  );
}

export default ReviewsSorting;
