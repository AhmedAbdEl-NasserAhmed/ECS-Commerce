"use client";

import Image from "next/image";
import styles from "./BaseTable.module.scss";
import { Box } from "@mui/material";
import ProductTableMenuOptions from "@/components/AdminProduct/productTableMenuOptions";

function BaseTable({ tableHeaders, content }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={index}>{header.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <>
          {content.map((product) => {
            return (
              <tr key={product.id}>
                {tableHeaders.map((header, index) => {
                  return (
                    <td className="relative" key={index}>
                      {header.type === "image" ? (
                        <Box
                          component="div"
                          className="md:flex justify-center items-center "
                        >
                          <Image
                            objectFit="cover"
                            width={55}
                            height={55}
                            src={product["productImage"]}
                            alt="product Image"
                          />
                        </Box>
                      ) : (
                        product[header.serverKey]
                      )}
                      {header.name === "Actions" && (
                        <ProductTableMenuOptions product={product} />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </>
      </tbody>
    </table>
  );
}

export default BaseTable;
