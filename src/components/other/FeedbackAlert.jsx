import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

const FeedbackAlert = ({ open, setOpen }) => {
  const vertical = "bottom";
  const horizontal = "left";

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      message="Tests Passed! 🎉"
      key={vertical + horizontal}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    />
  );
};

export default FeedbackAlert;
