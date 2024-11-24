import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import "./styles/CustomCardLab.css";
import { iconMap } from "./iconMap";

const CustomCardLab = ({ icon, title, desc, solution }) => {
  const iconSrc = iconMap[icon] || icon;

  return (
    <Card className="custom-card-lab">
      <div className="custom-card-lab-header">
        <div className="icon-above-title-lab">
          {iconSrc && <img src={iconSrc} alt="icon" />}
        </div>
        <Typography
          variant="h4"
          component="div"
          className="custom-card-lab-title"
        >
          {title}
        </Typography>
      </div>
      <div className="upper-section-lab">
        <a
          href={desc}
          target="_blank"
          rel="noopener noreferrer"
          className="custom-button-lab"
        >
          Εκφώνηση εργαστηρίου
        </a>
      </div>
      <div className="lower-section-lab">
        <a
          href={solution}
          target="_blank"
          rel="noopener noreferrer"
          className="custom-button-lab"
        >
          Λύση εργαστηρίου
        </a>
      </div>
    </Card>
  );
};

export default CustomCardLab;
