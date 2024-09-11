import React from "react";
import { Typography } from "@mui/material";

const AnswerSec = ({ chat }) => {
  return (
    <div>
      {chat.map((msg, index) => (
        <Typography
          key={index}
          align={msg.type === "user" ? "right" : "left"}
          color={msg.type === "user" ? "primary" : "secondary"}
          style={{ margin: "5px 0" }}
        >
          {msg.text}
        </Typography>
      ))}
    </div>
  );
};

export default AnswerSec;
