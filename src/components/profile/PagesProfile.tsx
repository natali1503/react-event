import { Box } from "@mui/material";
import React from "react";

interface IPPagesProfile {
  children: React.ReactNode;
  index: number;
  value: number;
}

export default function PagesProfile(props: IPPagesProfile) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
