import { Box, Button } from "@mui/material";

import styles from "./DeleteWindow.module.scss";

interface Props {
  message: string;
  setShowModal?: () => void;
}

function DeleteWindow({ message, setShowModal }: Props) {
  return (
    <Box component="div" className={styles["delete-item"]}>
      <Box className="text-4xl font-bold ">{message}</Box>
      <Box component="div" className="flex gap-8 justify-center w-full ">
        <Button
          onClick={setShowModal}
          sx={{
            fontSize: "1rem",
            backgroundColor: "rgb(75 85 99)",
            "&:hover": {
              backgroundColor: "rgb(55 65 81)",
            },
          }}
          variant="contained"
          size="large"
        >
          Close
        </Button>
        <Button
          onClick={setShowModal}
          sx={{
            fontSize: "1rem",
            backgroundColor: "rgb(186, 9, 9)",
            "&:hover": {
              backgroundColor: "rgb(160, 6, 6)",
            },
          }}
          variant="contained"
          size="large"
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default DeleteWindow;
