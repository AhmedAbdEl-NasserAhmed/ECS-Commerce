import { styled } from "@mui/material";
import { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import { HiOutlinePlusCircle } from "react-icons/hi";

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

function UploadButton() {
  return (
    <Button
      sx={{
        fontSize: "4rem",
        color: "gray",
        transition: "background-color 0.5s ease", // Smooth transition for background change
        "&:hover": {
          backgroundColor: "transparent", // Background color when hovering
        },
      }}
      component="label"
    >
      <HiOutlinePlusCircle />
      <VisuallyHiddenInput
        multiple
        accept="image/png, image/jpeg"
        type="file"
      />
    </Button>
  );

  // return (
  //   <button type="button">
  //     <VisuallyHiddenInput
  //
  //       // onChange={handleImagePath}
  //       type="file"
  //     />
  //     hello
  //   </button>
  // );
}

export default UploadButton;
