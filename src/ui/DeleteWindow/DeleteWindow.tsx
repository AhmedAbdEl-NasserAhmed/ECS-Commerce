import { Box, Button } from "@mui/material";

import styles from "./DeleteWindow.module.scss";
import MiniSpinner from "../MiniSpinner/MiniSpinner";

interface Props {
  message: string;
  setShowModal?: () => void;
  onClick?: any;
  disabled?: boolean;
}

function DeleteWindow({ disabled, message, setShowModal, onClick }: Props) {
  return (
    <Box className={styles["delete-item"]}>
      <Box className="text-4xl font-bold ">{message}</Box>
      <Box className="flex gap-8 justify-center w-full ">
        <Button
          disabled={disabled}
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
          {disabled ? <MiniSpinner /> : "Close"}
        </Button>
        <Button
          disabled={disabled}
          onClick={() => {
            setShowModal();
            onClick();
          }}
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
          {disabled ? <MiniSpinner /> : "Delete"}
        </Button>
      </Box>
    </Box>
  );
}

export default DeleteWindow;
