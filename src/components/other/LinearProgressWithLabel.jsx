import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel({ value, wrongAnswer }) {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (wrongAnswer) {
      // Set showError to true when there's a wrong answer
      setShowError(true);

      // Set a timer to turn off the error color after 5 seconds
      const timer = setTimeout(() => {
        setShowError(false);
      }, 1000);

      // Clean up the timer when the component unmounts or `isWrongAnswer` changes
      return () => clearTimeout(timer);
    }
  }, [wrongAnswer]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          color={`${
            showError ? "error" : value === 100 ? "success" : "inherit"
          }`}
          variant="determinate"
          value={value}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "inherit" }}>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ progress, wrongAnswer }) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} wrongAnswer={wrongAnswer} />
    </Box>
  );
}
