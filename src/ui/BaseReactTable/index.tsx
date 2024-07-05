import { Box } from "@mui/material";
import BaseReactTable from "./BaseReactTable";

function BaseTable({ data, columns }) {
  return (
    <Box sx={{ overflow: "scroll", width: "100%" }}>
      <BaseReactTable
        {...{
          data,
          columns,
        }}
      />
      <hr />
    </Box>
  );
}

export default BaseTable;
