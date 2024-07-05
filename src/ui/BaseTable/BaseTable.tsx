"use client";

import { useMemo } from "react";
import { useTable } from "react-table";
import styles from "./BaseTable.module.scss";

function BaseTable({ rawData, columnsData }) {
  const data = useMemo(() => rawData, [rawData]);

  const columns = useMemo(() => columnsData, [columnsData]);

  const tableInstace = useTable({
    data,
    columns,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstace;

  console.log("headerGroups", headerGroups);

  return (
    <table className={styles["table"]} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={data[index]["_id"]} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th key={column.id} {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr key={data[index]["_id"]} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td key={cell.value} {...cell.getCellProps()}>
                    {cell.render("Cell")}
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
