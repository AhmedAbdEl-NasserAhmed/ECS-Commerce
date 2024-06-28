import { Box } from "@mui/material";
import UploadButton from "../uploadButton";

function AddProductImage() {
  return (
    <Box
      component="div"
      className="flex items-center justify-center"
      sx={{
        border: "1px",
        borderStyle: "dashed",
        fontSize: "1.85rem", // Equivalent to text-4xl
        height: "200px",
        borderRadius: "5px",
        backgroundColor: "#ffffff", // Equivalent to bg-red-500
        transition: "background-color 0.5s ease", // Smooth transition for background change
        "&:hover": {
          backgroundColor: "#f1f1f1", // Background color when hovering
        },
      }}
    >
      <div>
        <UploadButton />
      </div>
    </Box>
  );
}

export default AddProductImage;
