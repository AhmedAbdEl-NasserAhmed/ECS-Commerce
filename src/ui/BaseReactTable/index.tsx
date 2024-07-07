import { Box } from "@mui/material";
import BaseReactTable from "./BaseReactTable";

function BaseTable({ data, columns, enablePagination = true }) {
  return (
    <Box sx={{ overflow: "scroll", width: "100%" }}>
      <BaseReactTable
        {...{
          data,
          columns,
          enablePagination,
        }}
      />
      <hr />
    </Box>
  );
}

export default BaseTable;
