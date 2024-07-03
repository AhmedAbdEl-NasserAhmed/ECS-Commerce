import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";

function loading() {
  return (
    <Box
      className="min-h-screen  bg-gradient-to-r  from-mainColor to-cyan-500"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner />
    </Box>
  );
}

export default loading;
