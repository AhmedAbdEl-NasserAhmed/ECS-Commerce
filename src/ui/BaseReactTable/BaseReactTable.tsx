import { useState } from "react";
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import BaseReactTableFilter from "./BaseReactTableFilter";
import styles from "./BaseReactTable.module.scss";
import { useTranslations } from "next-intl";

function BaseReactTable({
  data,
  columns,
  enablePagination,
}: {
  data: any;
  columns: any;
  enablePagination: boolean;
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const t = useTranslations("Index");

  const isValidData = data && data?.length > 0;

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  });

  const getTableHeaderColumnWidth = () => {
    if (columns.at(-1).id === "actions") {
      return `calc(100% / ${columns.length - 1})`;
    }
    return `calc(100% / ${columns.length})`;
  };

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: getTableHeaderColumnWidth(),
                    }}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                      {header.column.getCanFilter() && isValidData
                        ? // <div className={styles["filter-inputs"]}>
                          //   <BaseReactTableFilter
                          //     column={header.column}
                          //     table={table}
                          //   />
                          // </div>
                          null
                        : null}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {isValidData ? (
            table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length}>{t("No data available")}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="h-2" />
      {isValidData && enablePagination && (
        <div className={styles.pagination}>
          <div className={styles["pagination__controllers"]}>
            <button
              className="border rounded p-1"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>

          <span className="flex items-center gap-1">
            <div>{t("Page")} </div>
            <strong>
              {table.getState().pagination.pageIndex + 1} {t("of")}{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | {t("Go to page")}:&nbsp;
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page =
                  +e.target.value <= +table.getPageCount().toLocaleString() - 1
                    ? Number(e.target.value) - 1
                    : +table.getPageCount().toLocaleString() - 1;
                table.setPageIndex(page);
              }}
              className={`border p-1 rounded w-16 ${styles["pagination__controllers--page-input"]}`}
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {t("Show")} {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
        {table.getRowCount().toLocaleString()} Rows
      </div> */}
      {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </div>
  );
}

export default BaseReactTable;
