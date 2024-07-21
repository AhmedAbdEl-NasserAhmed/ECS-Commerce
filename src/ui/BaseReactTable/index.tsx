import { Box } from "@mui/material";
import BaseReactTable from "./BaseReactTable";

function BaseTable({
  data,
  columns,
  paginationControllers = null,
  isLoading = false,
}) {
  return (
    <Box sx={{ overflow: "scroll", width: "100%" }}>
      <BaseReactTable
        {...{
          data,
          columns,
          paginationControllers,
          isLoading,
        }}
      />
      <hr />
    </Box>
  );
}

export default BaseTable;
