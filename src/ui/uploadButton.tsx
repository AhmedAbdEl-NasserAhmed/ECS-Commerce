import { styled } from "@mui/material";
import { ChangeEvent } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface Props {
  handleImagePath: (e: ChangeEvent<HTMLInputElement>) => void;
}

function UploadButton({ handleImagePath }: Props) {
  return (
    <VisuallyHiddenInput
      multiple
      accept="image/png, image/jpeg"
      onChange={handleImagePath}
      type="file"
    />
  );
}

export default UploadButton;
