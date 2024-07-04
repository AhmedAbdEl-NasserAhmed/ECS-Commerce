import { Box } from "@mui/material";
import ImagePreview from "./ImagePreview";
import ImageInput from "./ImageInput";
import { Controller } from "react-hook-form";
import { createKey } from "next/dist/shared/lib/router/router";

function ProductImageItem(props) {
  if (!props.imageInputName) return;

  return (
    <Box
      className="relative flex items-center justify-center"
      sx={{
        border: "1px",
        borderStyle: "dashed",
        fontSize: "4rem",
        height: "250px",
        width: "100%",
        borderRadius: "5px",
        transition: "background-color 0.5s ease",
        "&:hover": {
          backgroundColor: "#f1f1f1",
        },
        ...props.sx,
      }}
    >
      {props.imageUrl ? (
        <ImagePreview
          disabled={props.disabled}
          imageUrl={props.imageUrl}
          onRemove={props.onRemoveImage}
          imageInputName={`images.${props.imageInputName}`}
        />
      ) : (
        <Controller
          name={`images.${props.imageInputName}`}
          control={props.control}
          render={({ field }) => {
            return (
              <ImageInput
                disabled={props.disabled}
                onChange={field.onChange}
                name={field.name}
                value={field.value}
              />
            );
          }}
        />
      )}
    </Box>
  );
}

export default ProductImageItem;
