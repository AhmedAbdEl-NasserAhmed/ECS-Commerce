"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function SearchBar() {
  const router = useRouter();

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/list?name=${name}`);
    }
  }

  return (
    <form
      className="flex text-xl items-center justify-between gap-4 bg-gray-100 p-4 rounded-md grow"
      onSubmit={handleSearch}
    >
      <input
        name="name"
        className="grow bg-transparent outline-none"
        placeholder="Search"
      />
      <button className="cursor-pointer">
        <Image src="/search.png" width={16} height={16} alt="Search-logo" />
      </button>
    </form>
  );
}

export default SearchBar;
