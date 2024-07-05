"use client";

import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import styles from "./BaseTable.module.scss";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import GlobalFilter from "./GlobalFilter/GlobalFilter";

function BaseTable({ rawData, columnsData }) {
  const data = useMemo(() => rawData, [rawData]);

  const columns = useMemo(() => columnsData, [columnsData]);

  const {
    state,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table className={styles["table"]} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={data[index]["_id"]} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
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
    </>
  );
}

export default BaseTable;
