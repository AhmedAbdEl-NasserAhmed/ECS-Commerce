import { Box } from "@mui/material";
import UploadButton from "../uploadButton";
import { HiOutlinePlusCircle } from "react-icons/hi";

function AddProductImage() {
  return (
    <UploadButton>
      <Box
        component="div"
        className="flex items-center justify-center"
        sx={{
          cursor: "pointer",
          border: "1px",
          borderStyle: "dashed",
          fontSize: "4rem", // Equivalent to text-4xl
          height: "250px",
          width: "100%",
          borderRadius: "5px",
          backgroundColor: "#ffffff", // Equivalent to bg-red-500
          transition: "background-color 0.5s ease", // Smooth transition for background change
          "&:hover": {
            backgroundColor: "#f1f1f1", // Background color when hovering
          },
        }}
      >
        <HiOutlinePlusCircle />
      </Box>
    </UploadButton>
  );
}

export default AddProductImage;
