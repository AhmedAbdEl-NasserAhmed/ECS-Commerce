import Image from "next/image";
import styles from "./BaseTable.module.scss";
import { Box } from "@mui/material";

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
        {content.map((product, index) => {
          return (
            <tr key={index}>
              {tableHeaders.map((header, index) => {
                return (
                  <td className="relative" key={index}>
                    {header.type === "image" ? (
                      <Box
                        component="div"
                        className="flex justify-center items-center"
                      >
                        <Image
                          objectFit="contain"
                          width={65}
                          height={65}
                          src={product["productImage"]}
                          alt="product Image"
                        />
                      </Box>
                    ) : (
                      product[header.serverKey]
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default BaseTable;
