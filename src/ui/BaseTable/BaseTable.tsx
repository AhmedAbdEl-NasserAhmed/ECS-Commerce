"use client";

import { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

import styles from "./BaseTable.module.scss";
import GlobalFilter from "./GlobalFilter/GlobalFilter";
import { Button } from "@mui/material";

function BaseTable({ rawData, columnsData }) {
  const data = useMemo(() => rawData, [rawData]);

  const columns = useMemo(() => columnsData, [columnsData]);

  const {
    state,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canNextPage,
    canPreviosPage,
    nextPage,
    previousPage,
    pageOptions,
    prepareRow,
  } = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

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
          {page.map((row, index) => {
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
      <div className="flex items-center justify-between  ">
        <span className="font-bold text-md">
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <div className="flex items-center gap-5">
          {canPreviosPage && (
            <Button
              onClick={() => previousPage()}
              disabled={!canPreviosPage}
              sx={{
                padding: "0.7rem",
                fontSize: "1rem",
                backgroundColor: "#10234a",
                "&:hover": {
                  backgroundColor: "#0b1b3a",
                },
              }}
              type="submit"
              variant="contained"
              size="large"
            >
              Previous
            </Button>
          )}
          {canNextPage && (
            <Button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              sx={{
                padding: "0.7rem",
                fontSize: "1rem",
                backgroundColor: "#10234a",
                "&:hover": {
                  backgroundColor: "#0b1b3a",
                },
              }}
              type="submit"
              variant="contained"
              size="large"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default BaseTable;
