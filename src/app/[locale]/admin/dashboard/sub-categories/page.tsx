"use client";

import { subCategoriesTableHeaders } from "@/constants/subCategoriesTableHeaders";
import { useGetAllSubCategoriesQuery } from "@/lib/features/api/subCategoriesApi";
import Menus from "@/ui/Menus/Menus";
import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

import BaseTable from "@/ui/BaseReactTable";

function SubCategories() {
  const { data, isFetching } = useGetAllSubCategoriesQuery("sub-categories");

  const _data = {
    status: "success",
    length: 19,
    data: [
      {
        _id: "6687e7cd618aac4fc6a9e648",
        name: "Men Running shorts",
        description: "Men RUnning short",
        category: {
          _id: "6687a776c35a3e048c0dbf75",
          name: "Running Shorts",
          description: "Running Shorts and Comfortable",
          slug: "running_shorts",
        },
        slug: "men_running_shorts",
      },
      {
        _id: "6687e7bf618aac4fc6a9e646",
        name: "Black Running Short",
        description: "Black RUnning short",
        category: {
          _id: "6687a776c35a3e048c0dbf75",
          name: "Running Shorts",
          description: "Running Shorts and Comfortable",
          slug: "running_shorts",
        },
        slug: "black_running_short",
      },
      {
        _id: "6687e76628225a455b878be3",
        name: "another new sub category",
        description: "new new new",
        category: {
          _id: "6687e74b28225a455b878bdd",
          name: "new category",
          description: "new new new new",
          slug: "new_category",
        },
        slug: "another_new_sub_category",
      },
      {
        _id: "6687e75b28225a455b878be1",
        name: "new sub category",
        description: "my new newn ew",
        category: {
          _id: "6687e74b28225a455b878bdd",
          name: "new category",
          description: "new new new new",
          slug: "new_category",
        },
        slug: "new_sub_category",
      },
      {
        _id: "6687b5b1de1572d4a1a49f6b",
        name: "Long Dressq",
        description: "dadaadajdajjdajdda",
        category: null,
        slug: "long_dressq",
      },
      {
        _id: "66872faf1a5b41a2a3404036",
        name: "subcategory#1",
        description: "this is new sub category #1",
        category: null,
        slug: "subcategory1",
      },
      {
        _id: "6685647ac05ac647019ad077",
        name: "nassernasser",
        description: "Nasser Nasser",
        category: null,
        slug: "nassernasser",
      },
      {
        _id: "668563a9c05ac647019ad073",
        name: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
        description: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
        category: null,
        slug: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
      },
      {
        _id: "668562fcc05ac647019ad06e",
        name: "qqqqqqqqqqqqqqqqqqqq",
        description: "sssssssssssss",
        category: null,
        slug: "qqqqqqqqqqqqqqqqqqqq",
      },
      {
        _id: "66855a9cc05ac647019ad064",
        name: "nasser5645456",
        description: "123123123",
        category: null,
        slug: "nasser5645456",
      },
      {
        _id: "6685590cc05ac647019ad05a",
        name: "sdadsadsadsa",
        description: "dsadsadsadasdsa",
        category: null,
        slug: "sdadsadsadsa",
      },
      {
        _id: "66855891c05ac647019ad056",
        name: "nasserrrr",
        description: "123",
        category: null,
        slug: "nasserrrr",
      },
      {
        _id: "668557f2c05ac647019ad04c",
        name: "aaaaa",
        description: "ssss",
        category: null,
        slug: "aaaaa",
      },
      {
        _id: "668557a4c05ac647019ad045",
        name: "nasser",
        description: "123456",
        category: null,
        slug: "nasser",
      },
      {
        _id: "66855756c05ac647019ad03f",
        name: "helloagain",
        description: "4546545",
        category: null,
        slug: "helloagain",
      },
      {
        _id: "6685572ac05ac647019ad03a",
        name: "loongsleeves",
        description: "Good T-shirt",
        category: null,
        slug: "loongsleeves",
      },
      {
        _id: "66849a094cb17921bf44c185",
        name: "Long Dresses",
        description: "Long classic dresses",
        category: null,
        slug: "long_dresses",
      },
      {
        _id: "668499c8896378d0e5a98e4e",
        name: "men shoes",
        description: "men shoes with different sizes",
        category: null,
        slug: "men_shoes",
      },
      {
        _id: "6681eee79397b4412be678d5",
        name: "NEW Woman Shoes",
        description: "NEW NEW woman shirt for different brands",
        slug: "new_woman_shoes",
        category: null,
      },
      {
        _id: "6687e7cd618aac4fc6a9e648",
        name: "Men Running shorts",
        description: "Men RUnning short",
        category: {
          _id: "6687a776c35a3e048c0dbf75",
          name: "Running Shorts",
          description: "Running Shorts and Comfortable",
          slug: "running_shorts",
        },
        slug: "men_running_shorts",
      },
      {
        _id: "6687e7bf618aac4fc6a9e646",
        name: "Black Running Short",
        description: "Black RUnning short",
        category: {
          _id: "6687a776c35a3e048c0dbf75",
          name: "Running Shorts",
          description: "Running Shorts and Comfortable",
          slug: "running_shorts",
        },
        slug: "black_running_short",
      },
      {
        _id: "6687e76628225a455b878be3",
        name: "another new sub category",
        description: "new new new",
        category: {
          _id: "6687e74b28225a455b878bdd",
          name: "new category",
          description: "new new new new",
          slug: "new_category",
        },
        slug: "another_new_sub_category",
      },
      {
        _id: "6687e75b28225a455b878be1",
        name: "new sub category",
        description: "my new newn ew",
        category: {
          _id: "6687e74b28225a455b878bdd",
          name: "new category",
          description: "new new new new",
          slug: "new_category",
        },
        slug: "new_sub_category",
      },
      {
        _id: "6687b5b1de1572d4a1a49f6b",
        name: "Long Dressq",
        description: "dadaadajdajjdajdda",
        category: null,
        slug: "long_dressq",
      },
      {
        _id: "66872faf1a5b41a2a3404036",
        name: "subcategory#1",
        description: "this is new sub category #1",
        category: null,
        slug: "subcategory1",
      },
      {
        _id: "6685647ac05ac647019ad077",
        name: "nassernasser",
        description: "Nasser Nasser",
        category: null,
        slug: "nassernasser",
      },
      {
        _id: "668563a9c05ac647019ad073",
        name: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
        description: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
        category: null,
        slug: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
      },
      {
        _id: "668562fcc05ac647019ad06e",
        name: "qqqqqqqqqqqqqqqqqqqq",
        description: "sssssssssssss",
        category: null,
        slug: "qqqqqqqqqqqqqqqqqqqq",
      },
      {
        _id: "66855a9cc05ac647019ad064",
        name: "nasser5645456",
        description: "123123123",
        category: null,
        slug: "nasser5645456",
      },
      {
        _id: "6685590cc05ac647019ad05a",
        name: "sdadsadsadsa",
        description: "dsadsadsadasdsa",
        category: null,
        slug: "sdadsadsadsa",
      },
      {
        _id: "66855891c05ac647019ad056",
        name: "nasserrrr",
        description: "123",
        category: null,
        slug: "nasserrrr",
      },
      {
        _id: "668557f2c05ac647019ad04c",
        name: "aaaaa",
        description: "ssss",
        category: null,
        slug: "aaaaa",
      },
      {
        _id: "668557a4c05ac647019ad045",
        name: "nasser",
        description: "123456",
        category: null,
        slug: "nasser",
      },
      {
        _id: "66855756c05ac647019ad03f",
        name: "helloagain",
        description: "4546545",
        category: null,
        slug: "helloagain",
      },
      {
        _id: "6685572ac05ac647019ad03a",
        name: "loongsleeves",
        description: "Good T-shirt",
        category: null,
        slug: "loongsleeves",
      },
      {
        _id: "66849a094cb17921bf44c185",
        name: "Long Dresses",
        description: "Long classic dresses",
        category: null,
        slug: "long_dresses",
      },
      {
        _id: "668499c8896378d0e5a98e4e",
        name: "men shoes",
        description: "men shoes with different sizes",
        category: null,
        slug: "men_shoes",
      },
      {
        _id: "6681eee79397b4412be678d5",
        name: "NEW Woman Shoes",
        description: "NEW NEW woman shirt for different brands",
        slug: "new_woman_shoes",
        category: null,
      },
      {
        _id: "6687e7cd618aac4fc6a9e648",
        name: "Men Running shorts",
        description: "Men RUnning short",
        category: {
          _id: "6687a776c35a3e048c0dbf75",
          name: "Running Shorts",
          description: "Running Shorts and Comfortable",
          slug: "running_shorts",
        },
        slug: "men_running_shorts",
      },
      {
        _id: "6687e7bf618aac4fc6a9e646",
        name: "Black Running Short",
        description: "Black RUnning short",
        category: {
          _id: "6687a776c35a3e048c0dbf75",
          name: "Running Shorts",
          description: "Running Shorts and Comfortable",
          slug: "running_shorts",
        },
        slug: "black_running_short",
      },
      {
        _id: "6687e76628225a455b878be3",
        name: "another new sub category",
        description: "new new new",
        category: {
          _id: "6687e74b28225a455b878bdd",
          name: "new category",
          description: "new new new new",
          slug: "new_category",
        },
        slug: "another_new_sub_category",
      },
      {
        _id: "6687e75b28225a455b878be1",
        name: "new sub category",
        description: "my new newn ew",
        category: {
          _id: "6687e74b28225a455b878bdd",
          name: "new category",
          description: "new new new new",
          slug: "new_category",
        },
        slug: "new_sub_category",
      },
      {
        _id: "6687b5b1de1572d4a1a49f6b",
        name: "Long Dressq",
        description: "dadaadajdajjdajdda",
        category: null,
        slug: "long_dressq",
      },
      {
        _id: "66872faf1a5b41a2a3404036",
        name: "subcategory#1",
        description: "this is new sub category #1",
        category: null,
        slug: "subcategory1",
      },
      {
        _id: "6685647ac05ac647019ad077",
        name: "nassernasser",
        description: "Nasser Nasser",
        category: null,
        slug: "nassernasser",
      },
      {
        _id: "668563a9c05ac647019ad073",
        name: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
        description: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
        category: null,
        slug: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
      },
      {
        _id: "668562fcc05ac647019ad06e",
        name: "qqqqqqqqqqqqqqqqqqqq",
        description: "sssssssssssss",
        category: null,
        slug: "qqqqqqqqqqqqqqqqqqqq",
      },
      {
        _id: "66855a9cc05ac647019ad064",
        name: "nasser5645456",
        description: "123123123",
        category: null,
        slug: "nasser5645456",
      },
      {
        _id: "6685590cc05ac647019ad05a",
        name: "sdadsadsadsa",
        description: "dsadsadsadasdsa",
        category: null,
        slug: "sdadsadsadsa",
      },
      {
        _id: "66855891c05ac647019ad056",
        name: "nasserrrr",
        description: "123",
        category: null,
        slug: "nasserrrr",
      },
      {
        _id: "668557f2c05ac647019ad04c",
        name: "aaaaa",
        description: "ssss",
        category: null,
        slug: "aaaaa",
      },
      {
        _id: "668557a4c05ac647019ad045",
        name: "nasser",
        description: "123456",
        category: null,
        slug: "nasser",
      },
      {
        _id: "66855756c05ac647019ad03f",
        name: "helloagain",
        description: "4546545",
        category: null,
        slug: "helloagain",
      },
      {
        _id: "6685572ac05ac647019ad03a",
        name: "loongsleeves",
        description: "Good T-shirt",
        category: null,
        slug: "loongsleeves",
      },
      {
        _id: "66849a094cb17921bf44c185",
        name: "Long Dresses",
        description: "Long classic dresses",
        category: null,
        slug: "long_dresses",
      },
      {
        _id: "668499c8896378d0e5a98e4e",
        name: "men shoes",
        description: "men shoes with different sizes",
        category: null,
        slug: "men_shoes",
      },
      {
        _id: "6681eee79397b4412be678d5",
        name: "NEW Woman Shoes",
        description: "NEW NEW woman shirt for different brands",
        slug: "new_woman_shoes",
        category: null,
      },
    ],
  };

  return (
    <Box className=" flex flex-col gap-8 px-[4rem] py-[1.2rem] bg-[#FDFDFD] ">
      <Box className="h-[10vh] flex justify-between items-center">
        <Box className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold  text-gray-600">
            Sub Categories List
          </h2>
          <Box className="flex items-center gap-4 text-[1.4rem]">
            <Link className="text-blue-400" href="/">
              Home
            </Link>
            <span>
              <HiChevronRight />
            </span>
            <h4>Sub Categories</h4>
          </Box>
        </Box>
      </Box>
      <Box className="relative grow flex flex-col gap-8 bg-white rounded-2xl border-2 p-10 border-slate-100 shadow-md">
        <Box className="mb-4">
          <h2 className="text-3xl font-semibold mb-5">Sub Categories</h2>
          <span className=" absolute left-0 block h-[1px] w-full bg-gray-200">
            &nbsp;
          </span>
        </Box>
        <Menus>
          {isFetching ? (
            <Spinner />
          ) : (
            <BaseTable data={_data?.data} columns={subCategoriesTableHeaders} />
          )}
        </Menus>
      </Box>
    </Box>
  );
}

export default SubCategories;
