import BaseReactTable from "./BaseReactTable";

function BaseTable({ data, columns }) {
  return (
    <>
      <BaseReactTable
        {...{
          data,
          columns,
        }}
      />
      <hr />
    </>
  );
}

export default BaseTable;
