function ReviewsSorting({ handleSortChange }) {
  return (
    <div className="absolute top-0 right-0">
      <select
        name="sort"
        className="mt-5 lg:mt-0 py-2 px-4 rounded-2xl text-lg font-medium bg-white ring-1 ring-gray-400 w-full"
        onChange={handleSortChange}
      >
        <option value="">Sort By</option>
        <option value="-createdAt">Newest</option>
        <option value="createdAt">Oldest</option>
      </select>
    </div>
  );
}

export default ReviewsSorting;
