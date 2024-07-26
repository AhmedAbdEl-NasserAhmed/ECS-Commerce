"use client"

import { useEffect, useRef, useState } from "react";
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
import {
  IPaginationControllersActions,
  IPaginationControllersState,
} from "@/hooks/useBaseTablePagination/interfaces";
import Spinner from "../Spinner/Spinner";

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_ROW_HEIGHT = 50;

function BaseReactTable({
  data,
  columns,
  paginationControllers,
  isLoading,
}: {
  data: any;
  columns: any;
  paginationControllers?: IPaginationControllersState &
    IPaginationControllersActions;
  isLoading?: boolean;
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: paginationControllers?.pageSize || DEFAULT_PAGE_SIZE,
  });

  const [tableLoaderHeight, setTableLoaderHeight] = useState<number>(0);

  const t = useTranslations("Index");

  const isValidData = data && data?.length > 0;

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: paginationControllers?.totalPages,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  function getTableBodyHeight() {
    setTableLoaderHeight(data?.length * DEFAULT_ROW_HEIGHT);
  }

  useEffect(() => {
    getTableBodyHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getTableHeaderColumnWidth = () => {
    if (columns.at(-1).id === "actions") {
      return `calc(100% / ${columns.length - 1})`;
    }
    return `calc(100% / ${columns.length})`;
  };

  useEffect(() => {
    if (paginationControllers?.pageSize) {
      setPagination((s) => ({
        ...s,
        pageSize: paginationControllers?.pageSize || DEFAULT_PAGE_SIZE,
      }));
    }
  }, [paginationControllers?.pageSize]);

  if (!data) return <Spinner />;

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className={`${styles.table}`}>
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
        <tbody
          className="relative"
          style={{
            height: `${tableLoaderHeight}px`,
          }}
        >
          {isLoading && (
            <div className="bg-white/50 absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col gap-2">
              <Spinner />
              <p>Fetching data...</p>
            </div>
          )}
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
      {isValidData && paginationControllers?.enablePagination && (
        <div className={styles.pagination}>
          <div className={styles["pagination__controllers"]}>
            <button
              className="border rounded p-1"
              onClick={() => {
                table.firstPage();
                paginationControllers?.onFirstHandler();
              }}
              disabled={!paginationControllers?.canGoPrevPage}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => {
                table.previousPage();
                paginationControllers?.onPrevHandler();
              }}
              disabled={!paginationControllers.canGoPrevPage}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => {
                table.nextPage();
                paginationControllers?.onNextHandler();
              }}
              disabled={!paginationControllers.canGoNextPage}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => {
                table.lastPage();
                paginationControllers?.onLastHandler();
              }}
              disabled={!paginationControllers.canGoNextPage}
            >
              {">>"}
            </button>
          </div>

          <span className="flex items-center gap-1">
            <div>{t("Page")} </div>
            <strong>
              {paginationControllers?.page + 1} {t("of")}{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <select
            value={paginationControllers?.pageSize}
            onChange={(e) => {
              paginationControllers?.onChangeNumberOfPages(+e.target.value);
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
    </div>
  );
}

export default BaseReactTable;
