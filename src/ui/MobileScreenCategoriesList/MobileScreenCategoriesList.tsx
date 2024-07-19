"use client";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/lib/features/api/categoriesApi";

function MobileScreenCategoriesList({ setOpens }) {
  const { locale } = useParams();

  const { replace } = useRouter();

  const { data, isLoading } = useGetAllCategoriesQuery("categories");

  const handleClick = (id: string) => {
    replace(`/${locale}/user/productsList/${id}`);
  };

  if (isLoading) return;

  return (
    <div>
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: "white", color: "black" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Categories
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "5px",
          }}
        >
          <ul className=" flex flex-col gap-12 items-center justify-center  ">
            {data?.data.map((category) => (
              <li key={category["_id"]}>
                <button
                  onClick={() => {
                    handleClick(category["_id"]);
                    setOpens(false);
                  }}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MobileScreenCategoriesList;
