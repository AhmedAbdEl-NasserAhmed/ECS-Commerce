import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import { useState } from "react";
import { FaImages } from "react-icons/fa";
import Image from "next/image";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  width: 450,
  height: 400,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  p: 4,
};

interface Props {
  selectedImagePaths: string;
}

export default function ShowUploadedImageProduct({
  selectedImagePaths,
}: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box component="div">
      <Button className="text-[2.5rem]" onClick={handleOpen}>
        <FaImages />
      </Button>
      <Modal
        className="md:hidden"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box component="div" className="flex justify-center items-center">
              <Image objectFit="contain" src={""} fill alt="product image" />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
