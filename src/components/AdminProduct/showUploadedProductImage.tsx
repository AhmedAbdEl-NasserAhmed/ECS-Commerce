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
  width: 650,
  height: 500,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  p: 4,
};

interface Props {
  selectedImagePaths: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  setPickedImagePaths: (src) => void;
}

export default function ShowUploadedImageProduct({
  selectedImagePaths,
  currentIndex,
  setCurrentIndex,
  setPickedImagePaths,
}: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
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
            <Box className=" w-full relative h-[40vh]  ">
              <Box className="w-full h-full  ">
                {selectedImagePaths.map((image, index) => {
                  return (
                    <Box
                      className={` absolute w-full h-full ${
                        index === currentIndex ? "slider-img" : ""
                      } transition-all ease-in-out duration-500 opacity-0 `}
                      key={index}
                    >
                      <Image
                        key={index}
                        className="object-contain"
                        src={image}
                        fill
                        sizes="100%"
                        alt="product image"
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <div className="flex justify-center h-[6vh]  gap-8 mt-12">
              {selectedImagePaths.map((image, index) => (
                <Box
                  onClick={() => setCurrentIndex(index)}
                  className={`${
                    index === currentIndex ? "border-2 border-gray-600" : ""
                  } relative  flex w-max cursor-pointer border-2 border-cyan-500 z-10`}
                  key={index}
                >
                  <Image
                    className="object-cover"
                    src={image}
                    width={40}
                    height={0}
                    alt="product image"
                  />
                  <span
                    className={`absolute opacity-40 ${
                      currentIndex === index ? "clear-opacity" : ""
                    } bg-slate-600 left-0 bottom-0 h-full w-full`}
                  ></span>
                  <span
                    onClick={() => {
                      setPickedImagePaths((data: string[]) =>
                        data.filter((e) => e !== image)
                      );
                    }}
                    className="absolute text-center flex justify-center items-center  w-5 h-5 text-white left-5 top-[5rem] rounded-full text-sm  z-20 bg-red-600"
                  >
                    X
                  </span>
                </Box>
              ))}
            </div>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
