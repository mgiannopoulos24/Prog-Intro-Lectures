import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

const FeedbackAlert = ({ open, setOpen }) => {
  const [state, setState] = React.useState({
    vertical: "bottom",
    horizontal: "left",
  });

  const { vertical, horizontal } = state;

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
